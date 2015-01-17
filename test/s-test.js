/* global describe, it */
'use strict';

var expect = require('chai').expect;
var mock = require('./mock-helpable').create();

describe('strings', function () {
    require('../lib/s').create().help(mock);
    var options = {};

    describe('helpers', function () {
        it('s-size', function () {
            var helper = mock.helper('s-size');

            expect(helper('size', options)).to.equal(4);
        });

        it('s-trim', function () {
            var helper = mock.helper('s-trim');

            expect(helper(' trim ', options)).to.equal('trim');
        });

        it('s-take', function () {
            var helper = mock.helper('s-take');

            expect(helper(2, 'take', options)).to.equal('ta');
        });

        it('s-drop', function () {
            var helper = mock.helper('s-drop');

            expect(helper(2, 'drop', options)).to.equal('op');
        });

        it('s-repeat', function () {
            var helper = mock.helper('s-repeat');

            expect(helper(2, 'repeat', options)).to.equal('repeatrepeat');
        });

        it('s-concat', function () {
            var helper = mock.helper('s-concat');

            expect(helper('co', 'nc', 'at', options)).to.equal('concat');
        });

        it('s-split', function () {
            var helper = mock.helper('s-split');

            expect(helper(',', 's,p,l,i,t', options)).to.deep.equal(['s', 'p', 'l', 'i', 't']);
        });

        it('s-slice', function () {
            var helper = mock.helper('s-slice');

            expect(helper('slice', options)).to.equal('slice');
            expect(helper('slice', 1, 3, options)).to.equal('li');
        });

        it('s-reverse', function () {
            var helper = mock.helper('s-reverse');

            expect(helper('reverse', options)).to.equal('esrever');
        });

        it('s-replace', function () {
            var helper = mock.helper('s-replace');

            expect(helper('a', 'b', 'aaaaA', options)).to.equal('baaaA');
            expect(helper('a', 'b', 'aaaaA', 'g', options)).to.equal('bbbbA');
            expect(helper('a', 'b', 'aaaaA', 'gi', options)).to.equal('bbbbb');
        });

        it('s-match', function () {
            var helper = mock.helper('s-match');

            expect(helper('r', 'reverse', 'g', options)).to.deep.equal(['r', 'r']);
        });

        it('s-lowercase', function () {
            var helper = mock.helper('s-lowercase');

            expect(helper('LOWERCASE', options)).to.equal('lowercase');
        });

        it('s-uppercase', function () {
            var helper = mock.helper('s-uppercase');

            expect(helper('uppercase', options)).to.equal('UPPERCASE');
        });

    });

    describe('predicates', function () {
        it('s-lowercase?', function () {
            var helper = mock.helper('s-lowercase?');

            expect(helper('lowercase', options)).to.be.true();
            expect(helper('Lowercase', options)).to.be.false();
        });

        it('s-uppercase?', function () {
            var helper = mock.helper('s-uppercase?');

            expect(helper('UPPERCASE', options)).to.be.true();
            expect(helper('Uppercase', options)).to.be.false();
        });

        it('s-match?', function () {
            var helper = mock.helper('s-match?');

            expect(helper('[a-z]+', 'match', options)).to.be.true();
            expect(helper('[a-z]+', 'MatcH', 'i', options)).to.be.true();
        });

        it('s-contain?', function () {
            var helper = mock.helper('s-contain?');

            expect(helper('tai', 'contain', options)).to.be.true();
            expect(helper('iai', 'contain', options)).to.be.false();
        });

        it('s-start-with', function () {
            var helper = mock.helper('s-start-with?');

            expect(helper('sta', 'start-with', options)).to.be.true();
            expect(helper('tar', 'start-with', options)).to.be.false();
        });

        it('s-end-with?', function () {
            var helper = mock.helper('s-end-with?');

            expect(helper('.js', 'end-with.js', options)).to.be.true();
            expect(helper('.css', 'end-with.js', options)).to.be.false();
        });
    });
});
