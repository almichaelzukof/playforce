"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeInjurySeverity = void 0;

var _constants = require("../constants");

const makeInjurySeverity = () => [{
  text: 'Injury Severity',
  bold: true,
  marginLeft: 367,
  marginBottom: _constants.verticalMargin
}, {
  marginBottom: _constants.verticalMargin,
  marginLeft: 190,
  table: {
    body: [[{
      text: 'Severity Rating',
      bold: true
    }, {
      text: 'Potential level of injury',
      bold: true
    }], ['Little/none', 'Little or no injury'], ['Minor', 'Minor injury (e.g. bruising or laceration)'], ['Moderate', 'Moderate injury requiring medical intervention'], ['Serious', 'Serious injury likely to require hospitalisation'], ['Permanent', 'Serious injury likely to result in permanent disability or fatality']]
  }
}];

exports.makeInjurySeverity = makeInjurySeverity;