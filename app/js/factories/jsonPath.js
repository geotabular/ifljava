'use strict'
var iflJavaControllers = angular.module('iflJavaControllers');
iflJavaControllers.factory('jsonPath', [function(){
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
}]);