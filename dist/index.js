'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var R = require('ramda');

var countries = require('../data/countries');

var getAsciiCode = R.invoker(0, 'charCodeAt');
var isinRegex = /^([a-zA-Z]{2})((?![a-zA-Z]{10}\b)[a-zA-Z0-9]{9})([0-9])$/;

var calcIsinCheckDigit = function calcIsinCheckDigit(isin) {
  var _R$splitAt = R.splitAt(-1, isin),
      _R$splitAt2 = _slicedToArray(_R$splitAt, 1),
      code = _R$splitAt2[0]; // Convert any alphabetic letters to their numeric equivalents


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
  calcIsinCheckDigit: R.compose(calcIsinCheckDigit, R.toUpper),
  isIsinValid: R.compose(isIsinValid, R.toUpper)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsImNvdW50cmllcyIsImdldEFzY2lpQ29kZSIsImludm9rZXIiLCJpc2luUmVnZXgiLCJjYWxjSXNpbkNoZWNrRGlnaXQiLCJpc2luIiwic3BsaXRBdCIsImNvZGUiLCJkaWdlc3QiLCJjb21wb3NlIiwiam9pbiIsIm1hcCIsImQiLCJpZkVsc2UiLCJmbGlwIiwiZ3QiLCJzdWJ0cmFjdCIsImFsd2F5cyIsImRpZ2l0c1RpbWVzVHdvIiwiYWRkSW5kZXgiLCJ2YWwiLCJpZHgiLCJub3QiLCJtb2R1bG8iLCJfXyIsIm11bHRpcGx5IiwicGFyc2VJbnQiLCJyZXZlcnNlIiwic3VtIiwiaXNJc2luVmFsaWQiLCJ0ZXN0IiwiY291bnRyeUNvZGUiLCJ0YWtlIiwiZmluZCIsInByb3BFcSIsImNoZWNrRGlnaXQiLCJ0YWtlTGFzdCIsImVxdWFscyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0b1VwcGVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxDQUFDLEdBQVdDLE9BQU8sQ0FBQyxPQUFELENBQXpCOztBQUNBLElBQU1DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQXpCOztBQUVBLElBQU1FLFlBQVksR0FBR0gsQ0FBQyxDQUFDSSxPQUFGLENBQVUsQ0FBVixFQUFhLFlBQWIsQ0FBckI7QUFDQSxJQUFNQyxTQUFTLEdBQU0sMERBQXJCOztBQUVBLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQUMsSUFBSSxFQUFJO0FBQ2pDLG1CQUFlUCxDQUFDLENBQUNRLE9BQUYsQ0FBVSxDQUFDLENBQVgsRUFBY0QsSUFBZCxDQUFmO0FBQUE7QUFBQSxNQUFPRSxJQUFQLGtCQURpQyxDQUVqQzs7O0FBQ0EsTUFBTUMsTUFBTSxHQUFHVixDQUFDLENBQUNXLE9BQUYsQ0FDYlgsQ0FBQyxDQUFDWSxJQUFGLENBQU8sRUFBUCxDQURhLEVBRWJaLENB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QyxDQUFDMEMsT0FBaEMsQ0FITjtBQUlmWCxFQUFBQSxXQUFXLEVBQVUvQixDQUFDLENBQUNXLE9BQUYsQ0FBVW9CLFdBQVYsRUFBdUIvQixDQUFDLENBQUMwQyxPQUF6QjtBQUpOLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSICAgICAgICAgPSByZXF1aXJlKCdyYW1kYScpO1xuY29uc3QgY291bnRyaWVzID0gcmVxdWlyZSgnLi4vZGF0YS9jb3VudHJpZXMnKTtcblxuY29uc3QgZ2V0QXNjaWlDb2RlID0gUi5pbnZva2VyKDAsICdjaGFyQ29kZUF0Jyk7XG5jb25zdCBpc2luUmVnZXggICAgPSAvXihbYS16QS1aXXsyfSkoKD8hW2EtekEtWl17MTB9XFxiKVthLXpBLVowLTldezl9KShbMC05XSkkLztcblxuY29uc3QgY2FsY0lzaW5DaGVja0RpZ2l0ID0gaXNpbiA9PiB7XG4gIGNvbnN0IFtjb2RlXSA9IFIuc3BsaXRBdCgtMSwgaXNpbik7XG4gIC8vIENvbnZlcnQgYW55IGFscGhhYmV0aWMgbGV0dGVycyB0byB0aGVpciBudW1lcmljIGVxdWl2YWxlbnRzXG4gIGNvbnN0IGRpZ2VzdCA9IFIuY29tcG9zZShcbiAgICBSLmpvaW4oJycpLFxuICAgIFIubWFwKCBkID0+XG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWZFbHNlKFxuICAgICAgICAgIFIuZmxpcChSLmd0KSg1NyksXG4gICAgICAgICAgUi5mbGlwKFIuc3VidHJhY3QpKDU1KSxcbiAgICAgICAgICBSLmFsd2F5cyhkKVxuICAgICAgICApLFxuICAgICAgICBnZXRBc2NpaUNvZGVcbiAgICAgICkoZClcbiAgICApXG4gICkoY29kZSk7XG5cbiAgLy8gQmVnaW5uaW5nIHdpdGggdGhlIGxlYXN0IHNpZ25pZmljYW50IGRpZ2l0IChvbiB0aGUgcmlnaHQpLCBtdWx0aXBseSBldmVyeSBvdGhlciBkaWdpdCBieSAyLlxuICBjb25zdCBkaWdpdHNUaW1lc1R3byA9IFIuY29tcG9zZShcbiAgICBSLmpvaW4oJycpLFxuICAgIFIuYWRkSW5kZXgoUi5tYXApKCh2YWwsIGlkeCkgPT4gUi5pZkVsc2UoXG4gICAgICBSLmNvbXBvc2UoUi5ub3QsIFIubW9kdWxvKFIuX18sIDIpKSxcbiAgICAgIFIuYWx3YXlzKFIuY29tcG9zZShSLm11bHRpcGx5KDIpLHBhcnNlSW50KSh2YWwpKSxcbiAgICAgIFIuYWx3YXlzKHZhbClcbiAgICApKGlkeCkpLFxuICAgIFIucmV2ZXJzZVxuICApKGRpZ2VzdCk7XG4gIC8vIEFkZCB1cCB0aGUgcmVzdWx0aW5nIGRpZ2l0cywgY2FsbGluZyB0aGUgcmVzdWx0IFNVTS5cbiAgY29uc3Qgc3VtID0gUi5jb21wb3NlKFIuc3VtLCBSLm1hcChwYXJzZUludCkpKGRpZ2l0c1RpbWVzVHdvKTtcbiAgLy8gRmluZCB0aGUgc21hbGxlc3QgbnVtYmVyIGVuZGluZyB3aXRoIGEgemVybyB0aGF0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBTVU0sIGFuZCBjYWxsIGl0IFZBTFVFLlxuICAvLyBTdWJ0cmFjdCBTVU0gZnJvbSBWQUxVRSwgZ2l2aW5nIHRoZSBjaGVjayBkaWdpdC5cbiAgcmV0dXJuICgxMCAtIChzdW0gJSAxMCkpICUgMTA7XG59O1xuXG5jb25zdCBpc0lzaW5WYWxpZCA9IGlzaW4gPT4ge1xuICBpZiAoIVIudGVzdChpc2luUmVnZXgpKGlzaW4pKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGNvbnN0IGNvdW50cnlDb2RlID0gUi50YWtlKDIsIGlzaW4pO1xuICBpZiAoIVIuZmluZChSLnByb3BFcSgnY29kZScsIGNvdW50cnlDb2RlKSkoY291bnRyaWVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBjb25zdCBjaGVja0RpZ2l0ID0gUi5jb21wb3NlKHBhcnNlSW50LCBSLnRha2VMYXN0KDEpKShpc2luKTtcbiAgcmV0dXJuIFIuY29tcG9zZShSLmVxdWFscyhjaGVja0RpZ2l0KSwgY2FsY0lzaW5DaGVja0RpZ2l0KShpc2luKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3VudHJpZXMsXG4gIGlzaW5SZWdleCxcbiAgY2FsY0lzaW5DaGVja0RpZ2l0IDogUi5jb21wb3NlKGNhbGNJc2luQ2hlY2tEaWdpdCwgUi50b1VwcGVyKSxcbiAgaXNJc2luVmFsaWQgICAgICAgIDogUi5jb21wb3NlKGlzSXNpblZhbGlkLCBSLnRvVXBwZXIpXG59O1xuIl19