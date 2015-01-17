'use strict';

var _ = require('lodash');
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
                if(!_.isEmpty(e)) {
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
                encoding: _.isString(encoding)? encoding: 'utf-8',
                flag: 'r'
            });
    });
};

module.exports = require('./dashbars/dashbars').create(f);
