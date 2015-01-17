'use strict';

var s = function s(_register){
    _register('s-size', function(s) {
        return s.length;
    });
    _register('s-trim', function(s) {
        return s.trim();
    });
    _register('s-take', function(n, s) {
        return s.slice(0, n);
    });
    _register('s-drop', function(n, s) {
        return s.slice(n);
    });
    _register('s-repeat', function(n, s) {
        return (new Array(n+1)).join(s);
    });
    _register('s-concat', function() {
        return Array.prototype.slice.call(arguments, 0, -1).join('');
    });
    _register('s-split', function(sep, s) {
        return s.split(sep);
    });
    _register('s-slice', function(s, from, to, options) {
        return s.slice(to && from, options && to);
    });
    _register('s-reverse', function(s) {
        return s.split('').reverse().join('');
    });
    _register('s-replace', function(old, nu, s, regOpts, options) {
        return s.replace(new RegExp(old, options && regOpts), nu);
    });
    _register('s-match', function(regex, s, regOpts, options) {
        return s.match(new RegExp(regex, options && regOpts));
    });
    _register('s-lowercase', function(s) {
        return s.toLowerCase();
    });
    _register('s-uppercase', function(s) {
        return s.toUpperCase();
    });

    //predicates
    _register('s-lowercase?', function(s) {
        return s.toLowerCase() === s;
    });
    _register('s-uppercase?', function(s) {
        return s.toUpperCase() === s;
    });
    _register('s-match?', function(regex, s, regOpts, options) {
        return (new RegExp(regex, options && regOpts)).test(s);
    });
    _register('s-contain?', function(needle, s, ignoreCase) {
        needle = (ignoreCase) ? needle.toLowerCase(): needle;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.indexOf(needle) >= 0;
    });
    _register('s-start-with?', function(prefix, s, ignoreCase) {
        prefix = (ignoreCase) ? prefix.toLowerCase(): prefix;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.indexOf(prefix) === 0;
    });
    _register('s-end-with?', function(suffix, s, ignoreCase) {
        suffix = (ignoreCase) ? suffix.toLowerCase(): suffix;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.lastIndexOf(suffix) === s.length - suffix.length;
    });
};

module.exports = require('./dashbars/dashbars').create(s);
