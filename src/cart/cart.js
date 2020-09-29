import angualr from "angular";
const cart = angualr.module("myCart",[]);
cart.controller("cartCtr",['$scope','$routeParams',function(scope,routeParams){
    scope.cartmsg="这是购物车界面"
    scope.price="2000"
    scope.getinfo=routeParams.info
}])