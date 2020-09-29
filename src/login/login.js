import angular from 'angular';
const login =angular.module('myLogin',[]);
login.controller('loginCtr',['$scope',function(scope){
    scope.name="登入界面";
    scope.msg="张三"

}])