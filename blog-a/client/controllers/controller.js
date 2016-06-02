/**
 * controllers用于控制，包含业务逻辑控制代码
 *
 */
angular.module('mean.controllers',[])

//依赖注入的写法，防止压缩代码时出问题
.controller('inputTestController',['$scope','$rootScope','inputTestService',function($scope,$rootScope,inputTestService) {
    $scope.name = inputTestService.str;
    $scope.test = function(){
       inputTestService.test();
    }
}])

.controller('listController',['$scope','$routeParams','$location','listService','$http',function($scope,$routeParams,$location,listService,$http) {
    $scope.goBack = function(){
        $location.path('/blog');
    }

    $scope.create = function() {
        var list = new listService({
            name:this.name,
            title:this.title,
            info:this.info
        });
        list.$save(function(response){
            $location.path('/blog');
            //$location.path('list/'+response._id);
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        });
    }

    $scope.findAll = function(){
        $scope.lists = listService.query();
    }

    $scope.findOne = function(){
        $scope.list = listService.get({
            listId:$routeParams.listId
        });
    }

    $scope.update = function(){
        $scope.list.$update(function(){
            $location.path('/blog');
            //$location.path('list/'+$scope.list._id);
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        })
    }

    //详情删除
    $scope.deleteByDetail = function(){
        $scope.list.$remove(function(){
            $location.path('/blog');
        });
    }

    //列表删除
    $scope.delete = function(list){
        // 确认
        $("#sureBtn").on("click",function(){
            list.$remove(function(){
                 for(var i in $scope.lists){
                     if($scope.lists[i] === list){
                         $scope.lists.splice(i,1);
                         $('#myModal').modal('hide');
                     }
                 }
            });
            $("#sureBtn").off("click");
        });
    }
}])

.controller('listAngularController',['$scope','$http','listAngularService',function($scope,$http,listAngularService) { //listAngular列表

    $scope.findAllTest = function(){
        /*$http.get('data.json').success(function(data) {
            $scope.lists = data;
        }).error(function(data,header,config,status){
            //处理响应失败
        });*/

        /*var postData = {uname:"15078381887",village_num:"0003006",page:"1"};
        var reqUrl = "http://10.20.101.115/appInterface.php?m=sns&s=myCollectGoods&version=3.0";

        $http.post(reqUrl,{params:postData},{'Content-Type':'application/x-www-form-urlencoded'}).success(function(data) {
            $scope.lists = data;
        }).error(function(data,header,config,status){
            //处理响应失败
        });*/

       /* $http.post("/api/getListTest2").success(function(data) {
            $scope.lists = data.lists;
            $scope.pageInfo = data.pageInfo;
            console.info(data.pageInfo);
        }).error(function(data,header,config,status){
            //处理响应失败
            alert("处理响应失败");
        });*/



        var GetAllUsers = function () {

            var url = '/api/getListAngular/'+$scope.paginationConf.currentPage+'/'+$scope.paginationConf.itemsPerPage;

            var postData = {
                page: $scope.paginationConf.currentPage, //当前页
                pageSize: $scope.paginationConf.itemsPerPage  //每页条数
            }
            listAngularService.getAllUsersList(url,postData,function(data){
                //然后绑定到$scope
                $scope.lists = data.lists;
                $scope.pageInfo = data.pageInfo;
                $scope.paginationConf.totalItems = data.pageInfo.total;
            });
        }

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 5
        };

        /***************************************************************
         当页码和页面记录数发生变化时监控后台查询
         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllUsers);
    }
}])

.controller('listAjaxController',['$scope',function($scope){  //Ajax列表
    var url = '/api/list/listAjax';
    $.ajax({
        url:url,
        type:'get',
        dataType:'json',
        success:function(data){
             var $tr = "";
             for(var i = 0;i < data.length;i++){
                 $tr += "<tr>"+
                 "<th scope='row'>"+(i+1)+"</th>"+
                 "<td>"+data[i].name+"</td>"+
                 "<td>"+data[i].title+"</td>"+
                 "<td>"+data[i].info+"</td>"+
                 "<td></td></tr>";
             }
             $("#tableDom").append($tr);
        },
        error:function(){
            alert("错误");
        }
    });
}])

.controller('addAjaxController',['$scope',function($scope){  //Ajax添加
    //此方法需要序列化表单 $(".newsletterForm").serialize()
    /*$('.newsletterForm').on('submit',function(evt){
        evt.preventDefault();
        var url = $(this).attr('action');
        var $container = $(this).closest('.formContainer');
        $.ajax({
            url:url,
            type:'POST',
            data:$(".newsletterForm").serialize(),
            success:function(data){
                var status = data.status;
                if (status) {
                    alert("添加成功");
                    $form[0].reset();
                } else {
                    alert("添加失败");
                }
            },
            error:function(){
                alert("系统繁忙");
            }
        });
    });*/
    //表单专门提交
    $('.newsletterForm').ajaxForm({
        beforeSerialize: function() {
            //console.log('beforeSerialize')
        },
        beforeSubmit: function() {
            //console.log('beforeSubmit')
        },
        success: function(data, status, xhr, $form) {
            var status = data.status;
            if (status) {
                alert("添加成功");
                $form[0].reset();
            } else {
                alert("添加失败");
            }
        },
        err: function() {
            alert("系统繁忙");
        }
    });
}])
