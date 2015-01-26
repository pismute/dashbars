//exporting code from Handlebarjs
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Dashbars = root.Dashbars || factory();
    }
})(this, function () {
//d.js
var _moment = function(){
    return (typeof window === 'undefined')? require('moment'): window.moment;
};

var d = function d(_register){
    //return string
    _register('d-iso', function(d) {
        return _moment()(d).toISOString();
    });
    //http://momentjs.com/docs/#/parsing/string-format/
    _register('d-format', function(format, d) {
        return _moment()(d).format(format);
    });

    //return date
    _register('d-now', function() {
        return new Date();
    });
    _register('d-parse', function(format, d) {
        return _moment()(d, format).toDate();
    });
    _register('d-add', function(n, unit, d) {
        return _moment()(d).add(n, unit).toDate();
    });
    _register('d-subtract', function(n, unit, d) {
        return _moment()(d).subtract(n, unit).toDate();
    });
};

//dash.js
var dash = function dash(_register, _helper){
    //List
    _register('-map', function(fn, list) {
        return list.map(_helper(fn));
    });
    _register('-sort', function(list, compare, options) {
        return list.slice().sort(options && _helper(compare));
    });
    _register('-take', function(n, list) {
       return list.slice(0, n);
    });
    _register('-drop', function(n, list) {
       return list.slice(n);
    });
    _register('-take-while', function(pred, list) {
        return _().filter(list, _helper(pred));
    });
    _register('-drop-while', function(pred, list) {
        return _().drop(list, _helper(pred));
    });
    _register('-slice', function(list, begin, end, options) {
        return list.slice(end && begin, options && end);
    });
    _register('-flatten', function() {
        return _().flatten(Array.prototype.slice.call(arguments, 0, -1));
    });

    //Cons
    _register('-array', function() {
        return Array.prototype.slice.call(arguments, 0, -1);
    });
    _register('-range', function(from, to, step, options) {
        return _().range(to && from, step && to, options && step);
    });
    _register('-object', function(json) {
        return JSON.parse(json);
    });

    //Reductions
    _register('-size', function(list) {
        return list.length;
    });
    _register('-find', function(pred, list) {
        return _().find(list, _helper(pred).bind(this));
    });
    _register('-reduce', function(fn, initial, list) {
        return list.reduce(_helper(fn), initial);
    });
    _register('-first', function(list) {
        return _().first(list);
    });
    _register('-last', function(list) {
        return _().last(list);
    });
    _register('-join', function(list, sep, options) {
        return list.join(options? sep:'');
    });
    _register('-sum', function(list) {
        return list.reduce(function(r, e){
                return r+e;
            }, 0);
    });
    _register('-product', function(list) {
        return list.reduce(function(r, e){
                return r*e;
            }, 1);
    });
    _register('-min', function(list) {
        return list.reduce(function(r, e){
                return r<e? r:e;
            }, Number.MAX_VALUE);
    });
    _register('-max', function(list) {
        return list.reduce(function(r, e){
                return r>e? r:e;
            }, Number.MIN_VALUE);
    });

    //Partitioning
    _register('-group-by', function(fn, list) {
        var that = this;
        return list.reduce(function(r, el){
            var key = _helper(fn).call(that, el);

            if( r[key] ){
               r[key].push(el);
            }else{
               r[key] = [el];
            }

            return r;
        }, {});
    });

    //Iteration
    _register('-grouped', function(size, list){
        return _().range(0, list.length, size)
            .map(function(n){ return list.slice(n, n+size);});
    });

    //Predicate
    _register('-every?', function(pred, list){
        return list.every(_helper(pred));
    });
    _register('-some?', function(pred, list){
        return list.some(_helper(pred));
    });
    _register('-none?', function(pred, list){
        return !list.some(_helper(pred));
    });
    _register('-contain?', function(item, list){
        return list.some(function(el){
                return el === item;
            });
    });

    //Set operation
    _register('-union', function() {
        return _().union.apply(_(),
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('-difference', function() {
        return _().difference.apply(_(),
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('-intersection', function() {
        return _().intersection.apply(_(),
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('-distinct', function(list) {
        return _().unique(list);
    });

    //Dictionary
    _register('-get', function(key, dict) {
        return dict[key];
    });
    _register('-keys', function(dict) {
        return Object.keys(dict);
    });
    _register('-values', function(dict) {
        return Object.keys(dict).map(function(k){
                return dict[k];
            });
    });

    //Object
    _register('-json', function(dict) {
        return JSON.stringify(dict);
    });

    //Function
    _register('-call', function() {
        var fn = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1, -1);

       return fn.apply(this, args);
    });
    _register('-as-is', function(o) {
        return o;
    });
    _register('-partial', function() {
        var fn = arguments[0];
        var applied = Array.prototype.slice.call(arguments, 1, -1);
        var that = this;
        return function(){
            var args = applied.slice();
            var arg = 0;
            for ( var i = 0; i < args.length || arg < arguments.length; i++ ) {
                if ( args[i] === undefined ) {
                    args[i] = arguments[arg++];
                }
            }

            return _helper(fn).apply(that, args);
        };
    });

    //Side Effects
    _register('-let', function(name, value) {
        this[name] = value;
    });
    _register('-log', function() {
        console.log.call(this, Array.prototype.slice.call(arguments, 1, -1));
    });

};

//dashbars.js
var _helper = function(name){
    return _().isFunction(name)? name:
            this._helpable.helper(name) || function(){
                throw Error('not found the helper:' + name);
            };
};

var _emptyHelpable = {
    registerHelper: function(name, func){
        //for lint
        name = name;
        func = func;

        return this;
    },
    helper: function(name){
        //for lint
        name = name;

        return function(){};
    }
};

var _wrapHelpable = function(helpable){
    //handlebars
    return {
        registerHelper: function(name, func){
            helpable.registerHelper(name, func);

            return this;
        },
        helper: function(name){
            return helpable.helpers[name];
        }
    };
};

var _help = function(helpable){
    var that = this;
    this._helpable = _wrapHelpable(helpable);

    this._registerers.forEach(function(register){
        register(that._helpable.registerHelper, that.helper, that.predicate);
    });

    return this;
};

//TODO: remove cos it is not functional.
var _extend = function(dashbars){
    var registerers = this._registerers;

    dashbars._registerers.forEach(function(registerer){
        registerers.push(registerer);
    });

    return this;
};

var _create = function(){
    var args = _().flatten(Array.prototype.slice.call(arguments));
    var dashbars = {
        //TODO: remove extendable cos it is not functional.
        _registerers: _().isEmpty(this._registerers)? []: this._registerers,
        _helpable: _emptyHelpable
    };

    args.forEach(function(registerer){
        dashbars._registerers.push(registerer);
    });

    dashbars.help = _help.bind(dashbars);
    dashbars.helper = _helper.bind(dashbars);
    dashbars.create = _create.bind(dashbars);
    dashbars.extend = _extend.bind(dashbars);

    return dashbars;
};

//f.js
var _path = require('path');
var _fs = require('fs');

var _slash = function(path){
    return (path.lastIndexOf('/') === path.length-1)? path:path+'/';
};

var f = function f(_register){
    //paths
    _register('f-slash', _slash);
    _register('f-join', function(){
        return _path.join.apply(_path,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('f-split', function(path){
        return path.split('/')
            .reduce(function(r, e){
                if(!_().isEmpty(e)) {
                    r.push(e);
                }

                return r;
            }, []);
    });
    _register('f-dirname', function(path){
        return _slash(_path.dirname(path));
    });
    _register('f-basename', function(path, ext){
        return _path.basename(path, ext);
    });
    _register('f-extname', function(path){
        return _path.extname(path);
    });
    _register('f-drop-extname', function(path){
        return _path.join(
            _path.dirname(path),
            _path.basename(path,
                _path.extname(path)));
    });
    _register('f-relative', function(){
        return _path.relative.apply(_path,
            Array.prototype.slice.call(arguments, 0, -1));
    });

    //io
    _register('f-read-text', function(path, encoding){
        return _fs.readFileSync(path, {
                encoding: _().isString(encoding)? encoding: 'utf-8',
                flag: 'r'
            });
    });
};

//global.js
var _ = function(){
    return (typeof window === 'undefined')? require('lodash'): window._;
};

//n.js
var n = function n(_register){
    //Predicate
    _register('n-even?', function(n) {
        return n%2 === 0;
    });

    //Operation
    _register('n-add', function(left, right) {
        return left+right;
    });

    _register('n-subtract', function(left, right) {
        return left-right;
    });

    _register('n-multiply', function(left, right) {
        return left*right;
    });

    _register('n-devide', function(left, right) {
        return left/right;
    });
};

//p.js
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
        return _().isEqual(left,right);
    });
    _register('-in?', function(prop, o) {
        return prop in o;
    });
    _register('-of?', function(prop, o) {
        return Object.prototype.hasOwnProperty.call(o, prop);
    });
    _register('-empty?', function(o){
        return _().isEmpty(o);
    });
    _register('-not-empty?', function(o){
        return !_().isEmpty(o);
    });
    _register('-string?', function(o){
        return _().isString(o);
    });
    _register('-array?', function(o){
        return _().isArray(o);
    });
};

//s.js
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

    return _create(dash, p, s, n, d, f);
});