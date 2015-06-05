'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');


var moviesApp = angular.module('moviesApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('./services/copy')(moviesApp);
require('./services/rest_resource')(moviesApp);
require('./auth/services/auth')(moviesApp);


//controllers
require('./movies/controllers/movies_controller')(moviesApp);
require('./auth/controllers/auth_controller')(moviesApp);


//directives
require('./movies/directives/movie_form_directive')(moviesApp);
require('./auth/directives/logout_directive')(moviesApp);


moviesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/movies', {
      templateUrl: 'templates/views/movies_view.html',
      controller: 'moviesController'
    })
    .when('/sign_in', {
      templateUrl: 'templates/views/sign_in.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/create_user.html',
      controller: 'authController'
    })
    .when('/', {
      redirectTo: '/movies'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}]);
