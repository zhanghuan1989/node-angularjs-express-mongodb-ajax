'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    request = require('request'),
    core = require('../config/core');
/**
 * 利用angular访问接口展示数据流程如下：
 * 首先页面中链接写的路由必须是angular中配置的路由，
 * 其次页面中data-ng-controller="xxController" data-ng-init="abc();"
 * 然后angular的xxController中，abc查询数据的方法$http的路径必须和express路由中的路径保持一致
 * express的对应路由方法查询成功后调用res.json()返回json数据到angular的$http的success中，赋值页面的$scope.listData = data;
 */
exports.getListAngular = function(req, res,next) {
    console.info(req.params);
    var condition = {};
    User.count(condition, function(err, total) {
        var query = User.find(condition).populate('users');
        var pageSize = req.params.pageSize || 5;
        //分页
        var pageInfo = core.createPage(req, total, pageSize);
        console.info(pageInfo.start+"=="+pageInfo.pageSize);
        query.skip(parseInt(pageInfo.start));
        query.limit(parseInt(pageInfo.pageSize));
        query.sort({created: -1});
        query.exec(function(err,results) {
            //console.info(results);
            if(err){
                return res.render('error', {
                    message: '请求数据错误',
                    title: '错误'
                });
            }
            else{
                //console.info(results);
                var obj = {"lists":results,"pageInfo":pageInfo};
                res.json(obj);
            }
        });
    });
};
