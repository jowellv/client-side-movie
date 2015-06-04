'use strict';
require('../../app/js/client');

describe('copy service', function () {
  beforeEach(angular.mock.module('moviesApp'));

  it('should copy an object', angular.mock.inject(function (copy) {
    var testObj = {test: 'value'};
    var copiedObj = copy(testObj);
    testObj = null;
    expect(copiedObj.test).toBe('value');
    expect(testObj).toBe(null);
  }));

});
