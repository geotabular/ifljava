'use strict'
var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('filterExclusions', ['jsonPath', function(jsonPath){
    return function(rawNewsList, options){
        return rawNewsList.filter(function(child){               
            return options.exclusions.filter(function(exclusion){
                var childProp = jsonPath(child, exclusion.path);
                return childProp !== exclusion.value;
            }).length > 0;
        });
     };
}]);