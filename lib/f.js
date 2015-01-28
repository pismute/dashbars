var _path = require('path');
var _fs = require('fs');

var _slash = function(path){
    return (path.lastIndexOf('/') === path.length-1)? path:path+'/';
};

var f = function f($register, $helper){
    $helper = $helper; // for lint

    //paths
    $register('f-slash', _slash);
    $register('f-join', function(){
        return _path.join.apply(_path,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    $register('f-split', function(path){
        return path.split('/')
            .reduce(function(r, e){
                if(!_().isEmpty(e)) {
                    r.push(e);
                }

                return r;
            }, []);
    });
    $register('f-dirname', function(path){
        return _slash(_path.dirname(path));
    });
    $register('f-basename', function(path, ext){
        return _path.basename(path, ext);
    });
    $register('f-extname', function(path){
        return _path.extname(path);
    });
    $register('f-drop-extname', function(path){
        return _path.join(
            _path.dirname(path),
            _path.basename(path,
                _path.extname(path)));
    });
    $register('f-relative', function(){
        return _path.relative.apply(_path,
            Array.prototype.slice.call(arguments, 0, -1));
    });

    //io
    $register('f-read-text', function(path, encoding){
        return _fs.readFileSync(path, {
                encoding: _().isString(encoding)? encoding: 'utf-8',
                flag: 'r'
            });
    });
};
