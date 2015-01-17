'use strict';

var _ = require('lodash');

var _is = function(o){
    return !!o;
};

var p = function p(_register){
    _register('-is?', _is);
    _register('-and?', function() {
        return Array.prototype.slice.call(arguments, 0, -1)
            .every(_is);
    });
    _register('-or?', function() {
        return Array.prototype.slice.call(arguments, 0, -1)
            .some(_is);
    });
    _register('-not?', function(t) {
        return !t;
    });
    _register('-gt?', function(left, right) {
        return left > right;
    });
    _register('-lt?', function(left, right) {
        return left < right;
    });
    _register('-ge?', function(left, right) {
        return left >= right;
    });
    _register('-le?', function(left, right) {
        return left <= right;
    });
    _register('-ne?', function(left, right) {
        return left !== right;
    });
    _register('-equal?', function(left, right) {
        return left === right;
    });
    _register('-deep-equal?', function(left, right) {
        return _.isEqual(left,right);
    });
    _register('-in?', function(prop, o) {
        return prop in o;
    });
    _register('-of?', function(prop, o) {
        return Object.prototype.hasOwnProperty.call(o, prop);
    });
    _register('-empty?', function(o){
        return _.isEmpty(o);
    });
    _register('-not-empty?', function(o){
        return !_.isEmpty(o);
    });
    _register('-string?', function(o){
        return _.isString(o);
    });
    _register('-array?', function(o){
        return _.isArray(o);
    });
};

module.exports = require('./dashbars/dashbars').create(p);
