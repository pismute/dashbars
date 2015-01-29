/* global describe, it */
'use strict';

var expect = require('chai').expect;

describe('file', function () {
    var f = require('../dist/index');
    var options = {};

    f.help(require('./mock-helpable').create());

    describe('paths', function () {
        it('f-slash', function () {
            var helper = f.helper('f-slash');

            expect(helper('path/to', options)).to.equal('path/to/');
            expect(helper('path/to/', options)).to.equal('path/to/');
        });

        it('f-join', function () {
            var helper = f.helper('f-join');

            expect(helper('/path/', '/to/', 'filename.ext', options)).to.equal('/path/to/filename.ext');
        });

        it('f-split', function () {
            var helper = f.helper('f-split');

            expect(helper('/path//to/filename.ext/', options)).to.deep.equal(['path','to','filename.ext']);
        });

        it('f-dirname', function () {
            var helper = f.helper('f-dirname');

            expect(helper('/path/to/filename.ext', options)).to.equal('/path/to/');
        });

        it('f-basename', function () {
            var helper = f.helper('f-basename');

            expect(helper('/path/to/filename.ext', options)).to.equal('filename.ext');
            expect(helper('/path/to/filename.ext', '.ext', options)).to.equal('filename');
        });

        it('f-extname', function () {
            var helper = f.helper('f-extname');

            expect(helper('/path/to/filename.ext', options)).to.equal('.ext');
            expect(helper('filename.ext', options)).to.equal('.ext');
        });

        it('f-drop-extname', function () {
            var helper = f.helper('f-drop-extname');

            expect(helper('/path/to/filename.ext', options)).to.equal('/path/to/filename');
            expect(helper('filename.ext', options)).to.equal('filename');
            expect(helper('/path/to/filename.ext.ex2', options)).to.equal('/path/to/filename.ext');
        });

        it('f-relative', function () {
            var helper = f.helper('f-relative');

            expect(helper('/orandea/test/aaa', '/orandea/impl/bbb', options)).to.equal('../../impl/bbb');
        });

    });

    describe('io', function () {
        it('f-read-text', function () {
            var helper = f.helper('f-read-text');

            expect(helper('./test/simple.txt', options)).to.equal("first\nsecond\n");
        });
    });
});
