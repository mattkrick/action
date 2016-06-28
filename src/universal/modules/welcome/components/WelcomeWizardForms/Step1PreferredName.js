import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Field from 'universal/components/Field/Field';
import ProgressDots from '../ProgressDots/ProgressDots';
import WelcomeContent from '../WelcomeContent/WelcomeContent';
import WelcomeHeader from '../WelcomeHeader/WelcomeHeader';
import WelcomeHeading from '../WelcomeHeading/WelcomeHeading';
import WelcomeLayout from '../WelcomeLayout/WelcomeLayout';

const Step1PreferredName = props => {
  const {handleSubmit, preferredName} = props;
  return (
    <WelcomeLayout>
      <WelcomeHeader heading={<span>Hello!</span>} />
      <WelcomeContent>
        <ProgressDots
          numDots={2}
          numCompleted={0}
          currentDot={1}
        />
        <div>{/* Div for that flexy flex */}
          <WelcomeHeading copy={<span>Please type in your name:</span>} />
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <Field
              autoFocus
              buttonDisabled={!preferredName}
              buttonIcon="check-circle"
              hasButton
              hasShortcutHint
              isLarger
              name="preferredName"
              placeholder="Albert Einstein"
              shortcutHint="Press enter"
              type="text"
            />
          </form>
        </div>
      </WelcomeContent>
    </WelcomeLayout>
  );
};

Step1PreferredName.propTypes = {
  handleSubmit: PropTypes.func,
  preferredName: PropTypes.string,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: 'welcomeWizard',
  destroyOnUnmount: false,
  // TODO: add validations
})(Step1PreferredName);