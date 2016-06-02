angular.module('mean.routes',[])

.config(['$routeProvider',function($routeProvider){ //$routeProvider定义路由行为
        $routeProvider.
            when('/',{  //首页列表
                templateUrl:'list.ejs'
            }).
            when('/list/listAngular',{
                templateUrl:'listAngular.ejs',  //angular接口列表
                controller:'listAngularController'
            }).
            when('/list/addAjax',{  //Ajax添加
                templateUrl:'addAjax.ejs',
                controller:'addAjaxController'
            }).
            when('/list/listAjax',{
                templateUrl:'listAjax.ejs',  //Ajax接口列表
                controller:'listAjaxController'
            }).
            when('/list',{ //列表，删除
                templateUrl:'list.ejs'
            }).
            when('/list/create',{  //添加
                templateUrl:'add.ejs'
            }).
            when('/list/:listId',{  //详情
                templateUrl:'one.ejs'
            }).
            when('/list/:listId/edit',{  //编辑
                templateUrl:'edit.ejs'
            }).
            otherwise({
                redirectTo:'/'
            });
}])
