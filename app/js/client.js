'use strict';

require('angular/angular');
var moviesApp = angular.module('moviesApp', []);

require('./movies/controllers/movies_controller')(moviesApp);
