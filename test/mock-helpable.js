'use strict';

var _ = require('lodash');

var _create = function(){
    var mock = {
        helpers: {}
    };

    mock.registerHelper = function(name, helper){
        if( helper ){
            mock.helpers[name] = helper;
        }else{
            _.extend(mock.helpers, name);
        }
    };

    mock.helper = function(name){
        return mock.helpers[name];
    };

    return mock;
};

module.exports.create = _create;
