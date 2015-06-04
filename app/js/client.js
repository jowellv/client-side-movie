'use strict';

require('angular/angular');
var moviesApp = angular.module('moviesApp', []);

//services
require('./services/copy')(moviesApp);
require('./services/rest_resource')(moviesApp);

//controllers
require('./movies/controllers/movies_controller')(moviesApp);

//directives
require('./movies/directives/movie_form_directive')(moviesApp);
