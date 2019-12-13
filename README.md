# ISIN Validator

International Securities Identification Number (ISIN) Validator

[![Build Status](https://travis-ci.org/JonaMX/js-isin-validator.svg?branch=master)](https://travis-ci.org/JonaMX/js-isin-validator)
[![Coverage Status](https://coveralls.io/repos/github/JonaMX/js-isin-validator/badge.svg?branch=master)](https://coveralls.io/github/JonaMX/js-isin-validator?branch=master)

## Install

```
$ npm install js-isin-validator --save
```

Run the specs

```
$ yarn test
```

## Usage

```js

const validator = require('js-isin-validator');

// Use for simple type checking
if (validator.isIsinValid(isin)) {
  // cool
}

// Get check digit
const checkDigit = validator.calcIsinCheckDigit(isin);


// Get the list of the valid countries
const countries = validator.countries;
```
