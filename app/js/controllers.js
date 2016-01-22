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
       console.log(data); 
       $.each(data.feeds, function(index, feedConfig){
          addNewsFeed($scope, readers, feedConfig); 
       });
    });
}])
.factory('addNewsFeed', ['$http','jsonPath', function($http, jsonPath){
    return function($scope, readers, options){
    readers[options.type](options.url).success(
        function(data){
            var rawNewsList = jsonPath(data, options.newsListPath);
            var filteredRawNewsList = options.exclusions ? rawNewsList.filter(function(child){               
                    return options.exclusions.filter(function(exclusion){
                        var childProp = jsonPath(child, exclusion.path);
                        return childProp !== exclusion.value;
                    }).length > 0;
            }) : rawNewsList;
            var newsList = filteredRawNewsList.map(function(child){
                return {
                    title: jsonPath(child, options.titlePath),
                    url: jsonPath(child, options.urlPath),
                    summary: jsonPath(child, options.summaryPath, true),
                    rank: rawNewsList.indexOf(child),
                    provider: options.provider,
                    providerUrl: options.providerUrl,
                    favIconUrl: options.favIconUrl
                } 
            });
            if($scope.allNewsList){
               $scope.allNewsList = $scope.allNewsList.concat(newsList);
            } else {
               $scope.allNewsList = newsList;
            }
            $scope.orderProp = 'rank';
        });    
    };
}]).factory('jsonPath', [function(){
    return function(data, path, decode){
        if(data && path){
            var paths = path.split('.');
            var node = data[paths[0]];
            paths.shift();
            $.each(paths, function(key, value){
                node = node[value];
            });
            if(decode){
                node = $("<div/>").html(node).text();
            }
            return node;
        }
    };
}]).factory('readXmlFeed',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp(
                '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=25&callback=JSON_CALLBACK&q=' 
                + encodeURIComponent(url));
        }
    }
}]);

