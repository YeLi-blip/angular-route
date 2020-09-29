import angular from "angular";
import 'angular-route';
import "./cart/cart.js"
import "./login/login.js"
const app=angular.module("myApp",['ngRoute','myCart','myLogin']);

app.config(['$routeProvider',function(routeProvider){
    routeProvider.when(
        '/',{template:require('./login/login.html'),
    controller:'loginCtr'//  //temp是视图层 controller 是控制器
})   
    .when(
        '/cart/:info',{template:require('./cart/cart.html'),
        controller:'cartCtr'})
    .otherwise({template:require('./404/error.html')});
}])