'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _constants = require('../../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Duration = function Duration(_ref) {
  var durationText = _ref.durationText;
  return _react2.default.createElement(
    'div',
    { className: _constants.classes.DURATION },
    durationText
  );
};

Duration.propTypes = {
  durationText: _propTypes2.default.string.isRequired
};

exports.default = (0, _recompose.compose)((0, _recompose.branch)(function (props) {
  return props.durationText;
}, (0, _recompose.renderComponent)(Duration)))((0, _recompose.renderNothing)(null));