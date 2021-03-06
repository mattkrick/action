import r from '../../../database/rethinkDriver';
import { GraphQLString } from 'graphql';
import { CachedUser } from './cachedUserSchema';
import { AuthenticationClient } from 'auth0';
import { auth0 } from '../../../../universal/utils/clientOptions';
import { triggerNewUserEmail } from './helpers';
import { createUserProfile } from '../UserProfile/helpers';

// TODO this stuff is no good, we need the good server stuff so we don't 401
const auth0Client = new AuthenticationClient({
  domain: auth0.account,
  clientId: auth0.clientId
});

export default {
  updateUserWithIdToken: {
    type: CachedUser,
    args: {
      idToken: {
        type: GraphQLString,
        description: 'The ID Token from auth0, a base64 JWT'
      }
    },
    async resolve(source, {idToken}) {
      const userInfo = await auth0Client.tokens.getInfo(idToken);
      // TODO add the userId to the JWT to eliminate call to DB?
      // JWT.sub is the userId, not id, maybe it'll do
      // TODO loginsCount and blockedFor are not a part of this API response
      // const user = await getUserByUserId(userInfo.user_id); // eslint-disable-line camelcase
      // const id = user && user.id;
      const newUserObj = {
        cachedAt: new Date(),
        // TODO set expiry here
        cacheExpiresAt: new Date(),
        // from auth0
        createdAt: userInfo.created_at,
        updatedAt: userInfo.updated_at,
        userId: userInfo.user_id,
        email: userInfo.email,
        emailVerified: userInfo.email_verified,
        picture: userInfo.picture,
        name: userInfo.name,
        nickname: userInfo.nickname,
        identities: userInfo.identities,
        loginsCount: userInfo.logins_count,
        blockedFor: userInfo.blocked_for
      };
      const changes = await r.table('CachedUser').insert(newUserObj, {
        conflict: 'update',
        returnChanges: true
      });
      // Did we update an existing cached profile?
      if (changes.replaced > 0) {
        return newUserObj;
      }
      // Let's make a new user profile object and link it to the CachedUser:
      const userProfileId = await createUserProfile();
      await r.table('CachedUser')
        .get(changes.generated_keys[0])
        .update({ userProfileId });
      newUserObj.userProfileId = userProfileId;

      await triggerNewUserEmail(newUserObj);

      return newUserObj;
    }
  }
};
