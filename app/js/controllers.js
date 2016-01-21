'use strict';

/* Controllers */

var iflJavaControllers = angular.module('iflJavaControllers',[]);

iflJavaControllers.controller('AllNewsCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('https://www.reddit.com/r/java/.json').success(function(data){
        $scope.reddit = data;
    });
    $scope.hello = "hello";
}]);
