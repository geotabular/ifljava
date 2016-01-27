'use strict'

var iflJavaControllers = angular.module('iflJavaControllers');

iflJavaControllers.factory('createCookieDate', [function(){
    return function(url, exdays){        
        var d = new Date();
        var time = d.getTime(); 
        d.setTime(time + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = '_ifljava_' + encodeURIComponent(url) + "=" + time + "; " + expires;
        return new Date(time);
    }
}])