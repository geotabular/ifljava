'use strict'

var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('getCookieDate', [function(){
    return function(url){        
        var name = '_ifljava_' + encodeURIComponent(url) + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) 
            return c.substring(name.length,c.length);
        }
    }
}])