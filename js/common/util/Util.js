/**
 * Created by git on 16/8/3.
 * @flow
 */

'use strict';

var React = require('react');
var {
    PixelRatio,
    Dimensions
    } = require('react-native');

var Util = {
    urlAppendQeury(url: string, query: Object): string{
        if(query){
            var queryString = Object.keys(query).map(function(key){
                return encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
            }).join("&");
            if(url.indexOf('?') === -1){
                queryString ='?' + queryString;
            } else{
                queryString = '&' + queryString;
            }
            return url + queryString;
        }
        return url;
    },
    queryToJson: function( query ) {
        var result = {};
        if ( query.lastIndexOf( "?" ) === 0 ) {
            query = query.substr( 1 );
        }
        query.split( "&" ).forEach( function( part ) {
            var item = part.split( "=" );
            result[ item[ 0 ] ] = decodeURIComponent( item[ 1 ] );
        } );
        return result;
    },
    jsonToQuery: function( json ) {
        return "?" +
            Object.keys( json ).map( function( key ) {
                return encodeURIComponent( key ) + "=" +
                    encodeURIComponent( json[ key ] );
            } ).join( "&" );
    },
    //邮箱，手机号码，电话号码正则表达式
    EMAIL_REX:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    MOBILE_PHONE_REX:/^(((13[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
    PHONE_REX:/^([0-9]{3,4}-)?[0-9]{7,8}$/,

    //获取1像素大小
    pixel: 1 / PixelRatio.get(),
    //获取屏幕的大小
    windowSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
};

module.exports =  Util;