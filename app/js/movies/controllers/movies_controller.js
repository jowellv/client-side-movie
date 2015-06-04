'use strict';

module.exports = function(app) {
  app.controller('moviesController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {
    var Movie = resource('movies');
    $scope.errors = [];
    $scope.movies = [];


    $scope.getAll = function() {
      Movie.getAll(function(err, data) {
        if(err) return $scope.errors.push({msg: 'error retrieving movies'});
        $scope.movies = data;
      });
    };

    $scope.createNewMovie = function(movie) {
      var newMovie = copy(movie);
      movie.name = '';
      movie.genre = '';
      $scope.movies.push(newMovie);
      Movie.create(newMovie, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save movie ' + newMovie.name});
        $scope.movies.splice($scope.movies.indexOf(newMovie), 1, data);
      });
    };

    $scope.removeMovie = function(movie) {
      $scope.movies.splice($scope.movies.indexOf(movie), 1);
      Movie.remove(movie, function(err) {
        if(err) $scope.errors.push({msg:'could not remove movie ' + movie.name});
      });
    };

    $scope.saveMovie = function(movie) {
      movie.editing = false;
      Movie.save(movie, function(err, data) {
        if(err) $scope.errors.push({msg:'could not edit movie ' + movie.name});
      });
    };

    $scope.toggleEdit = function(movie) {
      if(movie.editing) {
        movie.name = movie.nameBackup;
        movie.nameBackup = undefined;
        movie.genre = movie.genreBackup;
        movie.genreBackup = undefined;
        movie.editing = false;
      } else {
        movie.nameBackup = movie.name;
        movie.genreBackup = movie.genre;
        movie.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

  }]);
};
