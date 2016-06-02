'use strict';
var mongoose = require('mongoose'),
    List = mongoose.model('List'),
    request = require('request'),
    core = require('../config/core');

//Ajax列表
exports.listAjax = function(req, res) {
    var condition = {};
    var query = List.find(condition).populate('lists');
    query.exec(function(err,results) {
        if(err){
            return res.render('error', {
                message: '请求数据错误',
                title: '错误'
            });
        }
        else{
            res.json(results);
        }
    });
};

//Ajax添加
exports.addAjax = function(req, res) {
    var obj = req.body;
    console.info(obj);
    var list = new List(obj);
    list.save(function(err, result) {
        //ajax请求，req.xhr为true xhr是xml http请求的简称，ajax依赖于xhr
        if (req.xhr) {
            return res.json({
                status: !err
            })
        }
        if (err) {
            return res.render('error', {
                message: '添加失败'
            });
        }
        var obj = {};
        obj.status = true;
        res.json(obj);
    });
};