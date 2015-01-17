(function(){
    'use strict';

    var _ = require('lodash');

    var _normalizeArguments = function(args, is){
        is = is || _.isString;

        return Array.prototype.slice.call(args, 0,
            //The last argument is options in handlebars.
            //But, in other environments(ex, test) it is not
            is(args[args.length-1])? undefined: -1);
    };


    module.exports = {
        normalizeArguments: _normalizeArguments
    };
})();
