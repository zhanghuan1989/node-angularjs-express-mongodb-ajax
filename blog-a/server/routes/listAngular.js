var express = require('express');
var router = express.Router();
var core = require('../config/core');

var list = require('../controllers/listAngular');


module.exports = function(app) {

  app.post('/api/getListAngular/:page/:pageSize',list.getListAngular);
  /*
  core.translateAdminDir('/')会增加一个blog和router.route('/list/test')，
   这个拼接起来，则和页面中配置的路径/blog/list/test保持一致啦
   */
  var path = core.translateAdminDir('/');
  app.use(path, router);
};

