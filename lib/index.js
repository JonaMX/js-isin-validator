'use strict';

const R         = require('ramda');
const countries = require('../data/countries.json');

const getAsciiCode = R.invoker(0, 'charCodeAt');
const isinRegex    = /^([a-zA-Z]{2})((?![a-zA-Z]{10}\b)[a-zA-Z0-9]{9})([0-9])$/;

const calcIsinCheckDigit = isin => {
  const [code] = R.splitAt(-1, isin);
  // Convert any alphabetic letters to their numeric equivalents
  const digest = R.compose(
    R.join(''),
    R.map( d =>
      R.compose(
        R.ifElse(
          R.flip(R.gt)(57),
          R.flip(R.subtract)(55),
          R.always(d)
        ),
        getAsciiCode
      )(d)
    )
  )(code);

  // Beginning with the least significant digit (on the right), multiply every other digit by 2.
  const digitsTimesTwo = R.compose(
    R.join(''),
    R.addIndex(R.map)((val, idx) => R.ifElse(
      R.compose(R.not, R.modulo(R.__, 2)),
      R.always(R.compose(R.multiply(2),parseInt)(val)),
      R.always(val)
    )(idx)),
    R.reverse
  )(digest);
  // Add up the resulting digits, calling the result SUM.
  const sum = R.compose(R.sum, R.map(parseInt))(digitsTimesTwo);
  // Find the smallest number ending with a zero that is greater than or equal to SUM, and call it VALUE.
  // Subtract SUM from VALUE, giving the check digit.
  return (10 - (sum % 10)) % 10;
};

const isIsinValid = isin => {
  if (!R.test(isinRegex)(isin)) { return false; }

  const countryCode = R.take(2, isin);
  if (!R.find(R.propEq(countryCode, 'code'))(countries)) { return false; }

  const checkDigit = R.compose(parseInt, R.takeLast(1))(isin);
  return R.compose(R.equals(checkDigit), calcIsinCheckDigit)(isin);
};

module.exports = {
  countries,
  isinRegex,
  calcIsinCheckDigit : R.compose(calcIsinCheckDigit, R.toUpper),
  isIsinValid        : R.compose(isIsinValid, R.toUpper)
};
