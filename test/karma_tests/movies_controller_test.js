'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('movie controller' ,function() {
  var $cConstructor; //Controllerconstructor
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('moviesApp')); //set this to the angular app

  beforeEach(angular.mock.inject(function($rootScope, $controller) { // not gonna be minified don't need array
    $scope = $rootScope.$new();
    $cConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    var moviesController = $cConstructor('moviesController', {$scope: $scope});
    expect(typeof moviesController).toBe('object');
    expect(Array.isArray($scope.movies)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.moviesController = $cConstructor('moviesController', {$scope:$scope});
    }));

    afterEach(function() {
      // this fails the test if you fail to call the
      // $http API with one of your expected URLs
      $httpBackend.verifyNoOutstandingExpectation();
      // this fails the test if any methods were not
     // flushed to the $http API
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });
    it('should make a get request on index', function() {
      // expect - will fail if not performed, see afterEach below
      // you can also use whenGet if you want it to provide
      // the network call but expect it not to fail without it
      $httpBackend.expectGET('/api/movies').respond(200, [{_id: '1', name: 'test movie'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.movies[0].name).toBe('test movie');
      expect($scope.movies[0]._id).toBe('1');
    });

    it('should correctly handle errors' ,function() {
      $httpBackend.expectGET('/api/movies').respond(500, {msg: 'server error'});

      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving movies');
    });

    it('should be able to save a new movie', function() {
      var newMovie = {name: 'test movie', genre: 'comedy'};
      $httpBackend.expectPOST('/api/movies').respond(200, {_id: '2', name: 'test movie'});
      $scope.createNewMovie(newMovie);
      $httpBackend.flush();
      expect($scope.movies[0]._id).toBe('2');
      expect($scope.movies[0].name).toBe('test movie');
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a movie', function() {
      var movie = {_id:'3', name:'test movie', genre:'comedy'};
      $scope.movies.push(movie);
      $httpBackend.expectDELETE('/api/movies/3').respond(200, {msg: 'success'});
      expect($scope.movies.indexOf(movie)).not.toBe(-1);
      $scope.removeMovie(movie);
      expect($scope.movies.indexOf(movie)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a movie on server error', function() {
      var movie = {_id:'4', name:'test movie', genre:'comedy'};
      $scope.movies.push(movie);
      $httpBackend.expectDELETE('/api/movies/4').respond(500, {msg: 'QQ'});
      expect($scope.movies.indexOf(movie)).not.toBe(-1);
      $scope.removeMovie(movie);
      expect($scope.movies.indexOf(movie)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not remove movie test movie');
    });

    it('should edit a movie', function() {
      var edit = {_id:'5', name: 'edited name', genre: 'comedy'};
      var movie = {_id:'5', name:'edit me movie', genre:'war'};
      $scope.movies.push(movie);
      $httpBackend.expectPUT('/api/movies/'+ edit._id, edit).respond(200, {msg: 'edited'});
      expect($scope.movies.indexOf(movie)).not.toBe(-1);
      $scope.saveMovie(edit);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

  });
});
