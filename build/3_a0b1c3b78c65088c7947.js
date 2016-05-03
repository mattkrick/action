webpackJsonp([3,5],{

/***/ "./universal/modules/meeting/containers/SigninSuccess/SigninSuccess.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dec, _class, _class2, _temp;

	var _react = __webpack_require__("../node_modules/react/react.js");

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__("../node_modules/react-redux/lib/index.js");

	var _reactRouterRedux = __webpack_require__("../node_modules/react-router-redux/lib/index.js");

	var _meeting = __webpack_require__("./universal/modules/meeting/ducks/meeting.js");

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SIGNIN_ACTION_CREATE_MEETING = 'createmeeting';

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    meeting: state.getIn(['meeting', 'instance'])
	  };
	};
	// @connectData(fetchData)
	var SigninSuccess = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = (_temp = _class2 = function (_Component) {
	  _inherits(SigninSuccess, _Component);

	  function SigninSuccess() {
	    _classCallCheck(this, SigninSuccess);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SigninSuccess).apply(this, arguments));
	  }

	  _createClass(SigninSuccess, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // TODO if meeting exists in client cache, do something (go to it? check credentials?)
	      var _props = this.props;
	      var dispatch = _props.dispatch;
	      var params = _props.params;
	      var meeting = _props.meeting; // eslint-disable-line no-unused-vars

	      var _ref = params || {};

	      var action = _ref.action;

	      switch (action) {
	        case SIGNIN_ACTION_CREATE_MEETING:
	          dispatch((0, _meeting.createMeetingAndRedirect)());
	          break;
	        default:
	          dispatch((0, _reactRouterRedux.push)('/404'));
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Engaging warp drive...'
	      );
	    }
	  }]);

	  return SigninSuccess;
	}(_react.Component), _class2.propTypes = {
	  meeting: _react.PropTypes.object,
	  params: _react.PropTypes.object,
	  dispatch: _react.PropTypes.func
	}, _temp)) || _class);
	exports.default = SigninSuccess;
	module.e = exports['default'];

/***/ }

});