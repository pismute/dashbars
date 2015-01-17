/* global describe, it */
'use strict';

var expect = require('chai').expect;
var mock = require('./mock-helpable').create();

describe('date', function () {
    require('../lib/d').create().help(mock);
    var options = {};

    describe('return string', function () {
        it('d-iso', function () {
            var helper = mock.helper('d-iso');

            expect(helper(new Date(0), options)).to.equal('1970-01-01T00:00:00.000Z');
        });

        it('d-format', function () {
            var helper = mock.helper('d-format');

            expect(helper('YYYY-MM-DD', new Date(0), options)).to.equal('1970-01-01');
        });

    });

    describe('return date', function () {
        it('d-now', function () {
            var helper = mock.helper('d-now');

            expect(helper(options)).to.be.instanceof(Date);
        });

        it('d-parse', function () {
            var helper = mock.helper('d-parse');

            expect(helper('YYYY-MM-DD HH:mm:ss Z', '1970-01-01 00:00:00 +0000', options).valueOf()).to.equal(0);
        });

        it('d-add', function () {
            var helper = mock.helper('d-add');

            expect(helper(1, 'days', new Date(0), options).valueOf()).to.equal(86400000);
        });

        it('d-subtract', function () {
            var helper = mock.helper('d-subtract');

            expect(helper(1, 'days', new Date(86400000), options).valueOf()).to.equal(0);
        });
    });
});
