/* global describe, it */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var mock = require('./mock-helpable').create();

describe('dash', function () {
    require('../dist/index').create().help(mock);
    var options = {};

    mock.registerHelper({
        '_plus-one': function(n) {
            return n+1;
        },
        '_compare': function(left, right){
            return (left > right)? -1:
                (left < right)? 1: 0;
        },
        '_lt-3?': function(n) {
            return n < 3;
        },
        '_gt-15?': function(n) {
            return n > 15;
        },
    });

    describe('List:', function () {
        it('-map', function () {
            var helper = mock.helper('-map');

            var list = [1,2];
            expect(helper('_plus-one', list, options)).to.deep.equal([2,3]);
            expect(helper('_plus-one', list, options)).to.not.equal(list);

        });

        it('-sort', function () {
            var helper = mock.helper('-sort');

            var list = [1,2];
            expect(helper(list, options)).to.deep.equal([1,2]);
            expect(helper(list, options)).to.not.equal(list);

            expect(helper(list, '_compare', options)).to.deep.equal([2,1]);

        });

        it('-take', function () {
            var helper = mock.helper('-take');

            var list = _.range(1,20);
            expect(helper(5, list, options)).to.deep.equal([1,2,3,4,5]);
            expect(helper(5, list, options)).to.not.equal(list);
        });

        it('-drop', function () {
            var helper = mock.helper('-drop');

            var list = _.range(1,20);
            expect(helper(15, list, options)).to.deep.equal([16,17,18,19]);
            expect(helper(15, list, options)).to.not.equal(list);
        });

        it('-take-while', function () {
            var helper = mock.helper('-take-while');

            var list = _.range(1,20);
            expect(helper('_lt-3?', list, options)).to.deep.equal([1,2]);
            expect(helper('_lt-3?', list, options)).to.not.equal(list);
        });

        it('-drop-while', function () {
            var helper = mock.helper('-drop-while');

            var list = _.range(1,20);
            expect(helper('_lt-3?', list, options)).to.deep.equal(_.range(3,20));
            expect(helper('_lt-3?', list, options)).to.not.equal(list);
        });

        it('-slice', function () {
            var helper = mock.helper('-slice');

            var list = _.range(0,10);
            expect(helper(list, options)).to.deep.equal(_.range(0,10));
            expect(helper(list, options)).to.not.equal(list);

            expect(helper(_.range(0,10), 0, 5, options)).to.deep.equal(_.range(0,5));
            expect(helper(_.range(0,10), 0, options)).to.deep.equal(_.range(0,10));
            expect(helper(_.range(0,10), 5, options)).to.deep.equal(_.range(5,10));
        });

        it('-flatten', function () {
            var helper = mock.helper('-flatten');

            expect(helper([[1,2],3,[4]], [5,6], options)).to.deep.equal([1,2,3,4,5,6]);
        });
    });

    describe('Cons:', function () {
        it('-array', function () {
            var helper = mock.helper('-array');

            expect(helper(1, 2, 3, 4, 5, options)).to.deep.equal([1,2,3,4,5]);
        });

        it('-range', function () {
            var helper = mock.helper('-range');

            expect(helper(5, options)).to.deep.equal([0,1,2,3,4]);
            expect(helper(0, 5, options)).to.deep.equal([0,1,2,3,4]);
            expect(helper(0, 5, 2, options)).to.deep.equal([0,2,4]);
            expect(helper(0, -5, options)).to.be.empty();
            expect(helper(0, -5, -1, options)).to.deep.equal([0,-1,-2,-3,-4]);
            expect(helper(0, -5, -2, options)).to.deep.equal([0,-2,-4]);
            expect(helper(0, options)).to.be.empty();
        });

        it('-object', function () {
            var helper = mock.helper('-object');

            expect(helper('{"foo":1, "bar":2}', options)).to.deep.equal({foo:1,bar:2});
        });
    });

    describe('Reductions:', function () {
        it('-size', function () {
            var helper = mock.helper('-size');

            expect(helper(_.range(1,20), options)).to.equal(19);
        });

        it('-find', function () {
            var helper = mock.helper('-find');

            expect(helper('_lt-3?', _.range(1,20), options)).to.equal(1);
            expect(helper('_gt-15?', _.range(1,20), options)).to.equal(16);
        });

        it('-reduce', function () {
            var helper = mock.helper('-reduce');

            expect(helper('n-add', "", _.range(1,11), options)).to.equal("12345678910");
            expect(helper('n-add', 0, _.range(1,11), options)).to.equal(55);
        });

        it('-first', function () {
            var helper = mock.helper('-first');

            expect(helper(_.range(1,10), options)).to.equal(1);
        });

        it('-last', function () {
            var helper = mock.helper('-last');

            expect(helper(_.range(1,10), options)).to.equal(9);
        });

        it('-join', function () {
            var helper = mock.helper('-join');

            expect(helper(['j', 'o', 'i', 'n'], options)).to.equal('join');
            expect(helper(['j', 'o', 'i', 'n'], ',' , options)).to.equal('j,o,i,n');
        });

        it('-sum', function () {
            var helper = mock.helper('-sum');

            expect(helper(_.range(1,11), options)).to.equal(55);
        });

        it('-product', function () {
            var helper = mock.helper('-product');

            expect(helper(_.range(1,11), options)).to.equal(3628800);
        });

        it('-min', function () {
            var helper = mock.helper('-min');

            expect(helper(_.range(1, 11), options)).to.equal(1);
        });

        it('-max', function () {
            var helper = mock.helper('-max');

            expect(helper(_.range(1, 11), options)).to.equal(10);
        });
    });

    describe('Partitioning:', function () {
        it('-group-by', function () {
            var helper = mock.helper('-group-by');

            expect(helper('n-even?', _.range(1,5), options)).to.deep.equal({
                'true':[2,4],
                'false':[1,3]
            });
        });
    });

    describe('Iteration:', function () {
        it('-grouped', function () {
            var helper = mock.helper('-grouped');

            expect(helper(3, _.range(1,11), options)).to.deep.equal([
                [1,2,3], [4,5,6], [7,8,9], [10]
            ]);
            expect(helper(2, _.range(1,11), options)).to.deep.equal([
                [1,2], [3,4], [5,6], [7,8], [9,10]
            ]);
        });
    });

    describe('Predicate:', function () {
        it('-every?', function () {
            var helper = mock.helper('-every?');

            expect(helper('n-even?', _.range(0,11), options)).to.be.false();
            expect(helper('n-even?', _.range(0,11,2), options)).to.be.true();
        });

        it('-some?', function () {
            var helper = mock.helper('-some?');

            expect(helper('n-even?', _.range(0,11), options)).to.be.true();
            expect(helper('n-even?', _.range(1,11,2), options)).to.be.false();
        });

        it('-none?', function () {
            var helper = mock.helper('-none?');

            expect(helper('n-even?', _.range(0,11), options)).to.be.false();
            expect(helper('n-even?', _.range(1,11,2), options)).to.be.true();
        });

        it('-contain?', function () {
            var helper = mock.helper('-contain?');

            expect(helper(0, _.range(0,11), options)).to.be.true();
            expect(helper(11, _.range(0,11), options)).to.be.false();
        });
    });

    describe('Set operation:', function () {
        it('-union', function () {
            var helper = mock.helper('-union');

            var list = [1,2,3];
            expect(helper(list, [4,5,6], options)).to.deep.equal([1,2,3,4,5,6]);
            expect(helper(list, [4,5,6], options)).to.not.equal(list);
        });

        it('-difference', function () {
            var helper = mock.helper('-difference');

            var list = [1,2,3,6];
            expect(helper([1,2,3,6], [1,4,5,6], options)).to.deep.equal([2,3]);
            expect(helper([1,2,3,6], [1,4,5,6], options)).to.not.equal(list);
        });

        it('-intersection', function () {
            var helper = mock.helper('-intersection');

            var list = [1,2,3,6];
            expect(helper(list, [1,4,5,6], options)).to.deep.equal([1,6]);
            expect(helper(list, [1,4,5,6], options)).to.not.equal(list);
        });

        it('-distinct', function () {
            var helper = mock.helper('-distinct');

            var list = [1,1,2,2,3,3];
            expect(helper(list, options)).to.deep.equal([1,2,3]);
            expect(helper(list, options)).to.not.equal(list);
        });
    });

    describe('Dictionary:', function () {
        it('-get', function () {
            var helper = mock.helper('-get');

            expect(helper('prop', {prop:'value'}, options)).to.equal('value');
        });

        it('-keys', function () {
            var helper = mock.helper('-keys');

            expect(helper({}, options)).to.be.empty();
            expect(helper({foo:1, bar:2}, options)).to.deep.equal(['foo','bar']);
        });

        it('-values', function () {
            var helper = mock.helper('-values');

            expect(helper({}, options)).to.be.empty();
            expect(helper({foo:1, bar:2}, options)).to.deep.equal([1,2]);
        });
    });

    describe('Object:', function () {
        it('-json', function () {
            var helper = mock.helper('-json');

            expect(helper({foo:1, bar:2}, options)).to.equal('{"foo":1,"bar":2}');
        });
    });

    describe('Function:', function () {
        it('-call', function () {
            var helper = mock.helper('-call');

            expect(helper(function(l,r){
                return l+r;
            }, 2, 3, options)).to.equal(5);
        });

        it('-as-is', function () {
            var helper = mock.helper('-as-is');

            expect(helper(0, options)).to.equal(0);
        });

        it('-partial', function () {
            var helper = mock.helper('-partial');

            expect(helper('n-add', 3, options).call({}, 2)).to.equal(5);
        });

    });

    describe('Side Effect:', function () {
        it('-let', function () {
            var helper = mock.helper('-let');
            var data = {};

            helper.call(data, 'zero', 0, options);

            expect(data).to.have.property('zero');
        });

        it('-log', function () {
            // This cannot be tested because it just call console.log()
            mock.helper('-log');
        });
    });
});
