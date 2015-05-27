'use strict';
var welcome = require('./welcome');
document.write(welcome());

var movieList = document.getElementById('movielist');
var request = require('superagent');

  request
  .get('/api/movies')
  .end(function(err, res) {
    if(err) return console.log(err);
    var movies = JSON.parse(res.text);
    movies.forEach(function(movie) {
      var movieEl = document.createElement('li');
      movieEl.innerHTML = movie.name + ' (' + movie.genre + '): ' + movie.desc;
      movieList.appendChild(movieEl);
    });
  });
