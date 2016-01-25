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
}]);

