'use strict';

const subject = require('../lib/index');

describe('isIsinValid', () => {
  it('fails when given isin is malformed', () => {
    const isin = 'US037833100P';
    expect(subject.isIsinValid(isin)).toBe(false);
  });

  it('fails when given isin has a non-valid country code', () => {
    const isin = 'XX0378331005';
    expect(subject.isIsinValid(isin)).toBe(false);
  });

  it('fails when given isin has a non-valid check digit', () => {
    const isin = 'US0378331004';
    expect(subject.isIsinValid(isin)).toBe(false);
  });

  it('success when given isin is valid', () => {
    const isin = 'US38259P5089';
    expect(subject.isIsinValid(isin)).toBe(true);
  });
});
