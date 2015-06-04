'use strict';

module.exports = function(app) {
  app.directive('movieFormDirective', function() {
    return {
      restrict: 'A',
      replace: true, //replaces entire tag
      templateUrl: '/templates/directives/movie_form.html',
      scope: {
        save: '&',  //save into the scope a reference of a function called createNewMovie
        buttonText: '=',
        labelText: '@',
        movie: '='
      },
      transclude: true
    };
  });
};
