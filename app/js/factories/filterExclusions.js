'use strict'
var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('filterExclusions', ['jsonPath', function(jsonPath){
    return function(rawNewsList, options){
        return rawNewsList.filter(function(child){
            return options.exclusions.filter(function(exclusion){
                var childProp = jsonPath(child, exclusion.path);
                if(exclusion.value){
                  return childProp !== exclusion.value;
                }
                if(exclusion.includes){
                  return exclusion.filter(function(include){
                    return child.title.includes(include);
                  }).length != 0;
                }

            }).length > 0;
        });
     };
}]);
