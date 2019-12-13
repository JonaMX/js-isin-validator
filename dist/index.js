'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var R = require('ramda');

var countries = require('../data/countries');

var getAsciiCode = R.invoker(0, 'charCodeAt');
var isinRegex = /^([A-Z]{2})((?![A-Z]{10}\b)[A-Z0-9]{9})([0-9])$/;

var calcIsinCheckDigit = function calcIsinCheckDigit(isin) {
  var _R$splitAt = R.splitAt(-1, isin),
      _R$splitAt2 = _slicedToArray(_R$splitAt, 2),
      code = _R$splitAt2[0],
      checkDigit = _R$splitAt2[1];

  var _R$splitAt3 = R.splitAt(2, code),
      _R$splitAt4 = _slicedToArray(_R$splitAt3, 2),
      countryCode = _R$splitAt4[0],
      securityId = _R$splitAt4[1]; // Convert any alphabetic letters to their numeric equivalents


  var digest = R.compose(R.join(''), R.map(function (d) {
    return R.compose(R.ifElse(R.flip(R.gt)(57), R.flip(R.subtract)(55), R.always(d)), getAsciiCode)(d);
  }))(code); // Beginning with the least significant digit (on the right), multiply every other digit by 2.

  var digitsTimesTwo = R.compose(R.join(''), R.addIndex(R.map)(function (val, idx) {
    return R.ifElse(R.compose(R.not, R.modulo(R.__, 2)), R.always(R.compose(R.multiply(2), parseInt)(val)), R.always(val))(idx);
  }), R.reverse)(digest); // Add up the resulting digits, calling the result SUM.

  var sum = R.compose(R.sum, R.map(parseInt))(digitsTimesTwo); // Find the smallest number ending with a zero that is greater than or equal to SUM, and call it VALUE.
  // Subtract SUM from VALUE, giving the check digit.

  return (10 - sum % 10) % 10;
};

var isIsinValid = function isIsinValid(isin) {
  if (!R.test(isinRegex)(isin)) {
    return false;
  }

  var countryCode = R.take(2, isin);

  if (!R.find(R.propEq('code', countryCode))(countries)) {
    return false;
  }

  var checkDigit = R.compose(parseInt, R.takeLast(1))(isin);
  return R.compose(R.equals(checkDigit), calcIsinCheckDigit)(isin);
};

module.exports = {
  countries: countries,
  isinRegex: isinRegex,
  calcIsinCheckDigit: calcIsinCheckDigit,
  isIsinValid: isIsinValid
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsImNvdW50cmllcyIsImdldEFzY2lpQ29kZSIsImludm9rZXIiLCJpc2luUmVnZXgiLCJjYWxjSXNpbkNoZWNrRGlnaXQiLCJpc2luIiwic3BsaXRBdCIsImNvZGUiLCJjaGVja0RpZ2l0IiwiY291bnRyeUNvZGUiLCJzZWN1cml0eUlkIiwiZGlnZXN0IiwiY29tcG9zZSIsImpvaW4iLCJtYXAiLCJkIiwiaWZFbHNlIiwiZmxpcCIsImd0Iiwic3VidHJhY3QiLCJhbHdheXMiLCJkaWdpdHNUaW1lc1R3byIsImFkZEluZGV4IiwidmFsIiwiaWR4Iiwibm90IiwibW9kdWxvIiwiX18iLCJtdWx0aXBseSIsInBhcnNlSW50IiwicmV2ZXJzZSIsInN1bSIsImlzSXNpblZhbGlkIiwidGVzdCIsInRha2UiLCJmaW5kIiwicHJvcEVxIiwidGFrZUxhc3QiLCJlcXVhbHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLENBQUMsR0FBV0MsT0FBTyxDQUFDLE9BQUQsQ0FBekI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsbUJBQUQsQ0FBekI7O0FBRUEsSUFBTUUsWUFBWSxHQUFHSCxDQUFDLENBQUNJLE9BQUYsQ0FBVSxDQUFWLEVBQWEsWUFBYixDQUFyQjtBQUNBLElBQU1DLFNBQVMsR0FBTSxpREFBckI7O0FBRUEsSUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBQyxJQUFJLEVBQUk7QUFBQSxtQkFDQ1AsQ0FBQyxDQUFDUSxPQUFGLENBQVUsQ0FBQyxDQUFYLEVBQWNELElBQWQsQ0FERDtBQUFBO0FBQUEsTUFDMUJFLElBRDBCO0FBQUEsTUFDcEJDLFVBRG9COztBQUFBLG9CQUVDVixDQUFDLENBQUNRLE9BQUYsQ0FBVSxDQUFWLEVBQWFDLElBQWIsQ0FGRDtBQUFBO0FBQUEsTUFFMUJFLFdBRjBCO0FB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QUEsU0FBUyxFQUFUQSxTQURlO0FBRWZHLEVBQUFBLFNBQVMsRUFBVEEsU0FGZTtBQUdmQyxFQUFBQSxrQkFBa0IsRUFBbEJBLGtCQUhlO0FBSWY0QixFQUFBQSxXQUFXLEVBQVhBO0FBSmUsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFIgICAgICAgICA9IHJlcXVpcmUoJ3JhbWRhJyk7XG5jb25zdCBjb3VudHJpZXMgPSByZXF1aXJlKCcuLi9kYXRhL2NvdW50cmllcycpO1xuXG5jb25zdCBnZXRBc2NpaUNvZGUgPSBSLmludm9rZXIoMCwgJ2NoYXJDb2RlQXQnKTtcbmNvbnN0IGlzaW5SZWdleCAgICA9IC9eKFtBLVpdezJ9KSgoPyFbQS1aXXsxMH1cXGIpW0EtWjAtOV17OX0pKFswLTldKSQvO1xuXG5jb25zdCBjYWxjSXNpbkNoZWNrRGlnaXQgPSBpc2luID0+IHtcbiAgY29uc3QgW2NvZGUsIGNoZWNrRGlnaXRdICAgICAgICA9IFIuc3BsaXRBdCgtMSwgaXNpbik7XG4gIGNvbnN0IFtjb3VudHJ5Q29kZSwgc2VjdXJpdHlJZF0gPSBSLnNwbGl0QXQoMiwgY29kZSk7XG4gIC8vIENvbnZlcnQgYW55IGFscGhhYmV0aWMgbGV0dGVycyB0byB0aGVpciBudW1lcmljIGVxdWl2YWxlbnRzXG4gIGNvbnN0IGRpZ2VzdCA9IFIuY29tcG9zZShcbiAgICBSLmpvaW4oJycpLFxuICAgIFIubWFwKCBkID0+XG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWZFbHNlKFxuICAgICAgICAgIFIuZmxpcChSLmd0KSg1NyksXG4gICAgICAgICAgUi5mbGlwKFIuc3VidHJhY3QpKDU1KSxcbiAgICAgICAgICBSLmFsd2F5cyhkKVxuICAgICAgICApLFxuICAgICAgICBnZXRBc2NpaUNvZGVcbiAgICAgICkoZClcbiAgICApXG4gICkoY29kZSk7XG5cbiAgLy8gQmVnaW5uaW5nIHdpdGggdGhlIGxlYXN0IHNpZ25pZmljYW50IGRpZ2l0IChvbiB0aGUgcmlnaHQpLCBtdWx0aXBseSBldmVyeSBvdGhlciBkaWdpdCBieSAyLlxuICBjb25zdCBkaWdpdHNUaW1lc1R3byA9IFIuY29tcG9zZShcbiAgICBSLmpvaW4oJycpLFxuICAgIFIuYWRkSW5kZXgoUi5tYXApKCh2YWwsIGlkeCkgPT4gUi5pZkVsc2UoXG4gICAgICBSLmNvbXBvc2UoUi5ub3QsIFIubW9kdWxvKFIuX18sIDIpKSxcbiAgICAgIFIuYWx3YXlzKFIuY29tcG9zZShSLm11bHRpcGx5KDIpLHBhcnNlSW50KSh2YWwpKSxcbiAgICAgIFIuYWx3YXlzKHZhbClcbiAgICApKGlkeCkpLFxuICAgIFIucmV2ZXJzZVxuICApKGRpZ2VzdCk7XG4gIC8vIEFkZCB1cCB0aGUgcmVzdWx0aW5nIGRpZ2l0cywgY2FsbGluZyB0aGUgcmVzdWx0IFNVTS5cbiAgY29uc3Qgc3VtID0gUi5jb21wb3NlKFIuc3VtLCBSLm1hcChwYXJzZUludCkpKGRpZ2l0c1RpbWVzVHdvKTtcbiAgLy8gRmluZCB0aGUgc21hbGxlc3QgbnVtYmVyIGVuZGluZyB3aXRoIGEgemVybyB0aGF0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBTVU0sIGFuZCBjYWxsIGl0IFZBTFVFLlxuICAvLyBTdWJ0cmFjdCBTVU0gZnJvbSBWQUxVRSwgZ2l2aW5nIHRoZSBjaGVjayBkaWdpdC5cbiAgcmV0dXJuICgxMCAtIChzdW0gJSAxMCkpICUgMTA7XG59O1xuXG5jb25zdCBpc0lzaW5WYWxpZCA9IGlzaW4gPT4ge1xuICBpZiAoIVIudGVzdChpc2luUmVnZXgpKGlzaW4pKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGNvdW50cnlDb2RlID0gUi50YWtlKDIsIGlzaW4pO1xuXG4gIGlmICghUi5maW5kKFIucHJvcEVxKCdjb2RlJywgY291bnRyeUNvZGUpKShjb3VudHJpZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGNoZWNrRGlnaXQgPSBSLmNvbXBvc2UocGFyc2VJbnQsIFIudGFrZUxhc3QoMSkpKGlzaW4pO1xuXG4gIHJldHVybiBSLmNvbXBvc2UoUi5lcXVhbHMoY2hlY2tEaWdpdCksIGNhbGNJc2luQ2hlY2tEaWdpdCkoaXNpbik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY291bnRyaWVzLFxuICBpc2luUmVnZXgsXG4gIGNhbGNJc2luQ2hlY2tEaWdpdCxcbiAgaXNJc2luVmFsaWRcbn07XG4iXX0=
