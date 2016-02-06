'use strict'
var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('addNewsFeed', ['$http', 'jsonPath', 'filterExclusions', 'transformJson',
function($http, jsonPath, filterExclusions, transformJson){
    return function($scope, readers, options){
        readers[options.type](options.url).success( function(data){
            var rawNewsList = jsonPath(data, options.newsListPath);
            var filteredRawNewsList = options.exclusions ? filterExclusions(rawNewsList, options) : rawNewsList;
            var newsList = transformJson(filteredRawNewsList, options);
            if($scope.allNewsList){
                $scope.allNewsList = $scope.allNewsList.concat(newsList);
            } else {
                $scope.allNewsList = newsList;
            }
            $scope.orderProp = 'rank';
       });    
    };
}])