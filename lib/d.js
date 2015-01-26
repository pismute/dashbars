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
