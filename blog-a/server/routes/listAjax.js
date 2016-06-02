var express = require('express');
var router = express.Router();
var core = require('../config/core');

var list = require('../controllers/listAjax');


module.exports = function(app) {

  app.get('/api/list/listAjax',list.listAjax); //Ajax列表

  app.post('/api/list/addAjax',list.addAjax); //Ajax添加

};

