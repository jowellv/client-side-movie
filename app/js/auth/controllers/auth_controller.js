'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope','$location', 'auth', function($scope, $location, auth) {

    if (auth.isSignedIn()) $location.path('/movies');
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      if (user.password_confirmation && user.password === user.password_confirmation) {
        auth.create(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }

          $location.path('/movies');
        });
      } else if (user.password !== user.password_confirmation){
        $scope.errors.push({msg: 'passwords do not match!!!'});
        user.password = '';
        user.password_confirmation = '';
        return $location.path('/create_user');
      } else {
        auth.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create user'});
          }

          $location.path('/movies');
        });
      }
    };
  }]);
};
