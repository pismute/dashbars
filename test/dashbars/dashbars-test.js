/* global describe, it */
'use strict';

var expect = require('chai').expect;

var _helper = function(){
    return 'this is a helper';
};

var _registerer = function(_register){
    _register({
        'helper': _helper
    });
};

describe('Dashbars', function () {
    describe('mock:', function () {
        var dashbars = require('../../lib/dashbars/dashbars').create(_registerer);

        dashbars.help(require('../mock-helpable').create());

        it('lookup a helper', function(){
            expect(dashbars.helper('helper')).to.equal(_helper);
        });

        it('extend dashbars', function(){
            var dashbars2 = dashbars.create();

            dashbars2.extend(dashbars);

            dashbars2.help(require('../mock-helpable').create());

            expect(dashbars2.helper('helper')).to.equal(_helper);
        });
    });

    describe('Handlebars:', function () {
        var dashbars = require('../../lib/dashbars/dashbars').create(_registerer);

        dashbars.help(require('handlebars').create());

        it('lookup a helper', function(){
            expect(dashbars.helper('helper')).to.equal(_helper);
        });
    });
});
