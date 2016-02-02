'use strict'

var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('createPublishedDate', ['jsonPath','getCookieDate','createCookieDate', 
    function(jsonPath, getCookieDate, createCookieDate){
        return function(newsItem, options){
            if(options.publishedDate){
                var multiplier = options.publishedDate.multiplier ? options.publishedDate.multiplier : 1;
                var dateRaw = jsonPath(newsItem, options.publishedDate.path);
                var dateObject = !isNaN(dateRaw) ? dateRaw * multiplier : dateRaw;
                var date;
                var firstSeen = "";
                if(dateObject && dateObject!=="" && moment(dateObject).isValid()){ 
                    date = new Date(dateObject);
                } else {
                    var url = jsonPath(newsItem, options.urlPath);
                    var cookieDate = getCookieDate(url);
                    date = cookieDate ? date = new Date(parseInt(cookieDate)) : new Date(createCookieDate(url, 365)); 
                    firstSeen = "Unknown, first seen ";
                }
                return {date : date.toLocaleDateString(), time: date.toLocaleTimeString(), dateObject: date, prefix: firstSeen};
            }
        }
    }
]);