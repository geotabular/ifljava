'use strict';

/* App Module */
var iflJavaApp = angular.module('iflJavaApp', ['ngRoute', 'iflJavaControllers']);

iflJavaApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/all',{
        templateUrl: 'partials/all-news-list.html',
        controller: 'AllNewsCtrl'
    }).
    otherwise({
        redirectTo:'/all'
    });
}]);