'use strict';

/* Controllers */

var iflJavaControllers = angular.module('iflJavaControllers',[]);

iflJavaControllers
.controller('AllNewsCtrl',['$scope', '$http','addNewsFeed','readXmlFeed', function($scope, $http, addNewsFeed, readXmlFeed){
    var readers = {
        'json' : $http.get,
        'xml' : readXmlFeed.parseFeed
    };
    $http.get("config/feed-config.json").success(function(data){
       $.each(data.feeds, function(index, feedConfig){
          addNewsFeed($scope, readers, feedConfig); 
       });
    });
}]).factory('readXmlFeed',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp(
                '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=25&callback=JSON_CALLBACK&q=' 
                + encodeURIComponent(url));
        }
    }
}]);

