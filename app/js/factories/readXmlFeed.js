'use strict';

var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('readXmlFeed',['$http', function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp(
                '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=25&callback=JSON_CALLBACK&q=' 
                + encodeURIComponent(url));
        }
    }
}]);