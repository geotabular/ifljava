'use strict';

/* Controllers */

var iflJavaControllers = angular.module('iflJavaControllers',[]);

iflJavaControllers
.controller('AllNewsCtrl',['$scope', '$http','addNewsFeed','readXmlFeed','purgeCookieUrls', 
    function($scope, $http, addNewsFeed, readXmlFeed, purgeCookieUrls){
    var readers = {
        'json' : $http.get,
        'xml' : readXmlFeed.parseFeed
    };
    $http.get("config/feed-config.json").success(function(data){
       var pendingFeeds = data.feeds.length;
       var tries = 0;
       $.each(data.feeds, function(index, feedConfig){
          addNewsFeed($scope, readers, feedConfig);
          pendingFeeds -= 1; 
       });
       var interval = setInterval(function(){
           var abort = false;
           if(pendingFeeds==0){
               purgeCookieUrls($scope.allNewsList);
               abort = true;
           }
           if(tries==10){
               console.warn('all feeds failed to load, aborting cookie purge.');
               abort = true;  
           }
           if(abort){
               clearInterval(interval);
           }
           tries += 1;
       }, 3000);
    });
}]);

