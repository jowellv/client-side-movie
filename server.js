'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var moviesRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/dev_db');

app.use(express.static(__dirname + '/build')); //all the files in /build will static server

require('./routes/movies_routes')(moviesRoutes);

app.use('/api', moviesRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up on port ' + (process.env.PORT || 3000));
});
