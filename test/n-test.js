/* global describe, it */
'use strict';

var expect = require('chai').expect;
var mock = require('./mock-helpable').create();

describe('n', function () {
    require('../dist/index').create().help(mock);
    var options = {};

    describe('Predicate:', function () {
        it('n-even?', function () {
            var helper = mock.helper('n-even?');

            expect(helper(2, options)).to.be.true();
            expect(helper(1, options)).to.be.false();
            expect(helper(0, options)).to.be.true();
        });
        it('n-odd?', function () {
            var helper = mock.helper('n-odd?');

            expect(helper(2, options)).to.be.false();
            expect(helper(1, options)).to.be.true();
            expect(helper(0, options)).to.be.false();
        });
    });

    describe('Operation:', function () {
        it('n-add', function () {
            var helper = mock.helper('n-add');

            expect(helper(1, 2, options)).to.equal(3);
        });

        it('n-subtract', function () {
            var helper = mock.helper('n-subtract');

            expect(helper(1, 2, options)).to.equal(-1);
        });

        it('n-muliply', function () {
            var helper = mock.helper('n-multiply');

            expect(helper(2, 2, options)).to.equal(4);
        });

        it('n-divide', function () {
            var helper = mock.helper('n-divide');

            expect(helper(2, 2, options)).to.equal(1);
        });
    });
});
