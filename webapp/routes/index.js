var express = require('express');
var router = express.Router();

/* GET home page. */

var defaultModelExecutor = require("../models/executor.js");

router.get('/', function(req, res){
  var model = require("../models/index");
  defaultModelExecutor(model, req, res)
})

router.post('/api/query', function(req, res){
  var model = require("../models/query");
  defaultModelExecutor(model, req, res)
})

router.post('/api/render_table', function(req, res){
  res.render('query_results', req.body)
})

router.post('/api/get_distinct', function(req, res){
  var model = require("../models/get_distinct");
  defaultModelExecutor(model, req, res)
})

//router.post('/api/login', function(req, res){
//  var model = require('../models/api/login');
//  defaultModelExecutor(model, req, res)
//})
//
//router.post('/api/register', function(req, res){
//  var model = require('../models/api/register');
//  defaultModelExecutor(model, req, res)
//})

//router.post('/api/people', function(req, res) {
//  var model = require("../models/api/people");
//  defaultModelExecutor(model, req, res)
//});

module.exports = router;
