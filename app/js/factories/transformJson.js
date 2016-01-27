'use strict'
var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('transformJson', ['jsonPath', 'createPublishedDate', function(jsonPath, createPublishedDate){
    return function(newsList, options){
        return newsList.map(function(child){
            return {
                title: jsonPath(child, options.titlePath, true),
                url: jsonPath(child, options.urlPath),
                urlEncoded: encodeURIComponent(jsonPath(child, options.urlPath)),
                summary: jsonPath(child, options.summaryPath, true),
                rank: newsList.indexOf(child) + (options.rankIndex / 10),
                provider: options.provider,
                providerUrl: options.providerUrl,
                favIconUrl: options.favIconUrl,
                publishedDate: createPublishedDate(child, options)
            }; 
        });
    };
}]);