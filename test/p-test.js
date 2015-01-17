/* global describe, it */
'use strict';

var expect = require('chai').expect;
var mock = require('./mock-helpable').create();

describe('predicates', function () {
    require('../lib/p').create().help(mock);
    var options = {};

    it('-is?', function () {
        var helper = mock.helper('-is?');

        expect(helper(undefined, options)).to.be.false();
        expect(helper(null, options)).to.be.false();
        expect(helper(0, options)).to.be.false();
        expect(helper('', options)).to.be.false();
        expect(helper(false, options)).to.be.false();
        expect(helper(true, options)).to.be.true();
    });

    it('-and?', function () {
        var helper = mock.helper('-and?');

        expect(helper(false, false, false, options)).to.be.false();
        expect(helper(true, false, true, options)).to.be.false();
        expect(helper(true, true, true, options)).to.be.true();
    });

    it('-or?', function () {
        var helper = mock.helper('-or?');

        expect(helper(false, false, false, options)).to.be.false();
        expect(helper(true, false, true, options)).to.be.true();
        expect(helper(true, true, true, options)).to.be.true();
    });

    it('-not?', function () {
        var helper = mock.helper('-not?');

        expect(helper(undefined, options)).to.be.true();
        expect(helper(null, options)).to.be.true();
        expect(helper(0, options)).to.be.true();
        expect(helper('', options)).to.be.true();
        expect(helper(false, options)).to.be.true();
        expect(helper(true, options)).to.be.false();
    });

    it('-gt?', function () {
        var helper = mock.helper('-gt?');

        expect(helper(1, 2, options)).to.be.false();
        expect(helper(2, 2, options)).to.be.false();
        expect(helper(3, 2, options)).to.be.true();
    });

    it('-lt?', function () {
        var helper = mock.helper('-lt?');

        expect(helper(1, 2, options)).to.be.true();
        expect(helper(2, 2, options)).to.be.false();
        expect(helper(3, 2), options).to.be.false();
    });

    it('-ge?', function () {
        var helper = mock.helper('-ge?');

        expect(helper(1, 2, options)).to.be.false();
        expect(helper(2, 2, options)).to.be.true();
        expect(helper(3, 2, options)).to.be.true();
    });

    it('-le?', function () {
        var helper = mock.helper('-le?');

        expect(helper(1, 2, options)).to.be.true();
        expect(helper(2, 2, options)).to.be.true();
        expect(helper(3, 2, options)).to.be.false();
    });

    it('-ne?', function () {
        var helper = mock.helper('-ne?');

        expect(helper(1, 2, options)).to.be.true();
        expect(helper(2, 2, options)).to.be.false();
        expect(helper(2, '2', options)).to.be.true();
        expect(helper(3, 2, options)).to.be.true();
    });

    it('-equal?', function () {
        var helper = mock.helper('-equal?');

        expect(helper(1, 2, options)).to.be.false();
        expect(helper(2, 2, options)).to.be.true();
        expect(helper(2, '2', options)).to.be.false();
        expect(helper(3, 2, options)).to.be.false();
        expect(helper({foo:'bar'}, {foo:'bar'}, options)).to.be.false();
    });

    it('-deep-equal?', function () {
        var helper = mock.helper('-deep-equal?');

        expect(helper({foo:'bar'}, {foo:'bar'}, options)).to.be.true();
    });

    var Super = function(){
        this.sub = '';
    };

    Super.prototype = {
        super:'super'
    };

    var sub = new Super();

    it('-in?', function () {
        var helper = mock.helper('-in?');

        expect(helper('sub', sub, options)).to.be.true();
        expect(helper('super', sub, options)).to.be.true();
        expect(helper('notfound', sub, options)).to.be.false();
    });

    it('-of?', function () {
        var helper = mock.helper('-of?');

        expect(helper('sub', sub, options)).to.be.true();
        expect(helper('super', sub, options)).to.be.false();
        expect(helper('notfound', sub, options)).to.be.false();
    });

    it('-empy?', function () {
        var helper = mock.helper('-empty?');

        expect(helper('', options)).to.be.true();
        expect(helper([], options)).to.be.true();
        expect(helper({}, options)).to.be.true();
        expect(helper('1', options)).to.be.false();
        expect(helper([1], options)).to.be.false();
        expect(helper({1:1}, options)).to.be.false();
    });

    it('-not-empy?', function () {
        var helper = mock.helper('-not-empty?');

        expect(helper('', options)).to.be.false();
        expect(helper([], options)).to.be.false();
        expect(helper({}, options)).to.be.false();
        expect(helper('1', options)).to.be.true();
        expect(helper([1], options)).to.be.true();
        expect(helper({1:1}, options)).to.be.true();
    });

    it('-string?', function () {
        var helper = mock.helper('-string?');

        expect(helper('', options)).to.be.true();
        expect(helper('1', options)).to.be.true();
        expect(helper(2, options)).to.be.false();
        expect(helper(true, options)).to.be.false();
        expect(helper(helper, options)).to.be.false();
    });

    it('-array?', function () {
        var helper = mock.helper('-array?');

        expect(helper('', options)).to.be.false();
        expect(helper('1', options)).to.be.false();
        expect(helper(2, options)).to.be.false();
        expect(helper(true, options)).to.be.false();
        expect(helper([], options)).to.be.true();
        expect(helper([1], options)).to.be.true();
        expect(helper(helper, options)).to.be.false();
    });

});
