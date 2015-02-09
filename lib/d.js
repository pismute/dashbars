var _moment = function(){
    return (typeof window === 'undefined')? require('moment'): window.moment;
};

// jshint unused:false
var d = function d($register, $helper){

    //return string
    $register('d-iso', function(d) {
        return _moment()(d).toISOString();
    });
    //http://momentjs.com/docs/#/parsing/string-format/
    $register('d-format', function(format, d) {
        return _moment()(d).format(format);
    });

    //return date
    $register('d-now', function() {
        return new Date();
    });
    $register('d-date', function(format, s) {
        return _moment()(s, format).toDate();
    });
    $register('d-add', function(n, unit, d) {
        return _moment()(d).add(n, unit).toDate();
    });
    $register('d-subtract', function(n, unit, d) {
        return _moment()(d).subtract(n, unit).toDate();
    });
};
