'use strict';

module.exports =
        require('./lib/dashbars/dashbars').create()
        .extend(require('./lib/dash'))
        .extend(require('./lib/p'))
        .extend(require('./lib/n'))
        .extend(require('./lib/s'))
        .extend(require('./lib/d'))
        .extend(require('./lib/f'));
