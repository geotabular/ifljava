'use strict'

var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('purgeCookieUrls', [function(){
    return function(urlList){
        var cookies = document.cookie.split(';');
        var name = '';
        $.each(cookies, function(key, cookie){
            if(cookie.length > 9){
                name = cookie.split('=')[0];
                if(name.startsWith('_ifljava_')){
                    var url = decodeURIComponent(name.substring(9, name.length));
                    var existingCookie = urlList.filter(function(loadedUrl){
                      return loadedUrl.url===url;
                    });
                    if(existingCookie.length == 0){
                        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
                    }
                }
            }
        }); 
    }
}])