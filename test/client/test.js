'use strict';

var expect = require('chai').expect;
var welcome = require('../../app/js/welcome');

describe('welcome module', function() {
  it('welcome you to the movieDB', function() {
    expect(welcome()).to.eql('hello world, from javascript');
  });
});
