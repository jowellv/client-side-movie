'use strict';

module.exports = function(app) {
  app.controller('moviesController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.movies = [];

    $scope.getAll = function() {
      $http.get('/api/movies')
        .success(function(data) {
          console.log('success');
            $scope.movies = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error retrieving movies'});
        });
    };

    $scope.createNewMovie = function() {
      $scope.movies.push($scope.newMovie);  // how does this resolve default values
      $http.post('/api/movies', $scope.newMovie)
        .success(function(data) {           // how this this data get populated. res is not used
          $scope.newMovie = null;
        })
        .error(function(data) {
          console.log(data);
          $scope.movies.pop();
          $scope.errors.push({msg: 'could not create movie'});
        });
    };

    $scope.removeMovie = function(movie) {
      $scope.movies.splice($scope.movies.indexOf(movie), 1);
      $http.delete('/api/movies/' + movie._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg:'could not remove movie' + movie.name});
        });
    };

    $scope.saveMovie = function(movie) {
      movie.editing = false;
      $http.put('/api/movies/' + movie._id, movie)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg:'could not edit movie' + movie.name});
        });
    };

    $scope.oldMovie = function(movie) {
      alert(movie);
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

  }]);
};
