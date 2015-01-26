#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coverall-image]][coverall-url]

> A modern helper library for wonderful [Handlebars][]. Much inspired by [dash.el][] and [s.el][], [f.el][], [handlebars-helpers][].

[Handlebars]: http://handlebarsjs.com/
[dash.el]: https://github.com/magnars/dash.el
[s.el]: https://github.com/magnars/s.el
[f.el]: https://github.com/rejeep/f.el
[handlebars-helpers]: https://github.com/assemble/handlebars-helpers

Dashbars (yet) has no block helper because built-in helpers(each, if, unless) is powerful:

```html
{{-take 5 (-drop 3 (-range 0 10))}} // [3,4,5,6,7]
{{-slice 0 5 (-range 0 10)}} // [0,1,2,3,4]

{{#each (-take 5 (-drop 3 (-range 0 10)))}} // [3,4,5,6,7]
    ...
{{else}}
    ...
{{/each}}

{{#if (-lt? 3 myVar)}} // 3 < myVar
    ...
{{else}}
    ...
{{/if}}
```

## Install & Usage

### Node

#### Install

```sh
$ npm install --save dashbars
```

#### Usage

Handlebars:

```js
var handlebars = require('handlebars');

require('dashbars').help(handlebars);
```

To use multiple instances, dashbars support all of them:

```js
var handlebars1 = require('handlebars').create();
var handlebars2 = require('handlebars').create();

require('dashbars').create().help(handlebars1);
require('dashbars').create().help(handlebars2);
```

## Helpers

### Common predicate

Functions return boolean. The name of predicate should end with question mark(`?`).

Basically, You can use the predicate helper to combine with build-in block helpers(if, unless, each):

```
{{#if (-lt? 3 4)}}
   ...
{{/if}}

{{#if (-string? 'my string')}}
   ...
{{/if}}
```

You can chain helpers:

```
{{#if (-not? (-gt? 3 4))}}
   ...
{{/if}}
```

There are common predicates for object:

- [-is?](#-is?-o) `(o)`
- [-and?](#-and?-...) `(...)`
- [-or?](#-or?-...) `(...)`
- [-not?](#-not?-boolean) `(boolean)`
- [-gt?](#-gt?-left-right) `(left, right)`
- [-lt?](#-lt?-left-right) `(left, right)`
- [-ge?](#-ge?-left-right) `(left, right)`
- [-le?](#-le?-left-right) `(left, right)`
- [-ne?](#-ne?-left-right) `(left, right)`
- [-equal?](#-equal?-left-right) `(left, right)`
- [-deep-equal?](#-deep-equal?-left-right) `(left, right)`
- [-in?](#-in?-prop-o) `(prop, o)`
- [-of?](#-of?-prop-o) `(prop, o)`
- [-empty?](#-empty?-o) `(o)`
- [-not-empty?](#-not-empty?-o) `(o)`
- [-string?](#-string?-o) `(o)`
- [-array?](#-array?-o) `(o)`

### Dash

List and Dictionary are abstract term. List demonstrates Array and Set of ES6, somethings which are iterable like list. Dictionary also demonstrates plain JavaScript Object and Map of ES6, somethings which are key-value data structure.

As of now, dashbars tested and supports ES5 only so that List is Array and Dictionary is plain Object.

#### List:

Functions take a list return new list.

All functions which you need are also helper. You should register your helper. And then you can use the name of your helper:

```js
Handlebars.registerHelper('-as-is', function(o){
    return o;
});
```

```html
{{-json (-map '-as-is' (-range 0 5))}} // [0,1,2,3,4]
```

Predicates are the same:

```js
Handlebars.registerHelper('n-even?', function(n){
    return n % 2 === 0;
});
```

```html
{{-json (-take-while 'n-even?' (-range 0 5))}} // [0,2,4]
```

- [-map](#-map-fn-list) `(fn, list)`
- [-sort](#-sort-list-compare) `(list, compare)`
- [-take](#-take-n-list) `(n, list)`
- [-drop](#-drop-n-list) `(n, list)`
- [-take-while](#-take-while-pred-list) `(pred, list)`
- [-drop-while](#-drop-while-pred-list) `(pred, list)`
- [-slice](#-slice-list-begin-end) `(list, begin, end)`
- [-flatten](#-flatten-list-deep) `(list, deep)`

#### Cons:

Functions construct new JavaScript object.

- [-array](#-array-...) `(...)`
- [-range](#-range-from-to-step) `(from, to, step)`
- [-object](#-object-json) `(json)`

#### Reduction:

Functions reducing lists into single value.

- [-size](#-size-list) `(list)`
- [-find](#-find-pred-list) `(pred, list)`
- [-reduce](#-reduce-fn-inital-list) `(fn, initial, list)`
- [-first](#-first-list) `(list)`
- [-last](#-last-list) `(list)`
- [-join](#-join-list-sep) `(list, sep)`
- [-sum](#-sum-list) `(list)`
- [-product](#-product-list) `(list)`
- [-min](#-min-list) `(list)`
- [-max](#-max-list) `(list)`

#### Partitioning:

Functions partitioning the input list into multiple lists.

- [-group-by](#-group-by-fn-list) `(fn, list)`

#### Iteration:

Functions transforming the input list into a list of lists for easy iteration.

- [-grouped](#-grouped-size-list) `(size, list)`

#### Predicate:

- [-every?](#-every?-pred-list) `(pred, list)`
- [-some?](#-some?-pred-list) `(pred, list)`
- [-none?](#-none?-pred-list) `(pred, list)`
- [-contain?](#-contain?-item-list) `(item, list)`

#### Set operation:

Operations pretending lists are sets.

- [-union](#-union-...) `(...)`
- [-difference](#-difference-...) `(...)`
- [-intersection](#-intersection-...) `(...)`
- [-distinct](#-distinct-list) `(list)`

#### Dictionary:

Operations on dictionaries.

- [-get](#-get-key-dict) `(key, dict)`
- [-keys](#-keys-dict) `(dict)`
- [-values](#-values-dict) `(dict)`

#### Obejct:

- [-json](#-json-o) `(o)`

#### Function:

Functions combine

- [-as-is](#-as-is-o) `(o)`
- [-partial](#-partial-fn-...) `(fn, ...)`
- [-call](#-call-fn-...) `(fn, ...)`

#### Side Effects:

- [-let](#-let-name-value) `(name, value)`
- [-log](#-log-...) `(...)`

### Number

#### Predicate:

- [n-even?](#n-even?-n) `(n)`

#### Operation:

- [n-add](#n-add-left-right) `(left, right)`
- [n-subtract](#n-subtract-left-right) `(left, right)`
- [n-multiply](#n-multiply-left-right) `(left, right)`
- [n-divide](#n-divide-left-right) `(left, right)`

### String

- [s-size](#s-size-s) `(s)`
- [s-trim](#s-trim-s) `(s)`
- [s-take](#s-take-n-s) `(n, s)`
- [s-drop](#s-drop-n-s) `(n, s)`
- [s-repeat](#s-repeat-n-s) `(n, s)`
- [s-concat](#s-concat-...) `(...)`
- [s-split](#s-split-sep-s) `(sep, s)`
- [s-slice](#s-slice-s-from-to) `(s, from, to)`
- [s-reverse](#s-reverse-s) `(s)`
- [s-replace](#s-replace-old-new-regopts) `(old, new, s, regOpts)`
- [s-match](#s-match-regex-s-regopts) `(regex, s, regOpts)`
- [s-lowercase](#s-lowercase-s) `(s)`
- [s-uppercase](#s-uppercase-s) `(s)`

#### Predicates:

- [s-lowercase?](#s-lowercase?-s) `(s)`
- [s-uppercase?](#s-uppercase?-s) `(s)`
- [s-match?](#s-match?-regex-s-regopts) `(regex, s, regOpts)`
- [s-contain?](#s-contain?-needle-s-ignorecase) `(needle, s, ignoreCase)`
- [s-start-with?](#s-start-with?-prefix-s-igrnorecase) `(prefix, s, ignoreCase)`
- [s-end-with?](#s-end-with?-suffix-s-ignorecase) `(suffix, s, ignoreCase)`

### Files, Paths, IOs

#### Path:

- [f-slash](#f-slash-path) `(path)`
- [f-join](#f-join-...) `(...)`
- [f-split](#f-split-path) `(path)`
- [f-dirname](#f-dirname-path) `(path)`
- [f-basename](#f-basename-path-ext) `(path, ext)`
- [f-extname](#f-extname-path) `(path)`
- [f-drop-extname](#f-drop-extname-path) `(path)`
- [f-relative](#f-relative-...) `(...)`

#### IOs:

- [f-read-text](#f-read-text-path-encoding) `(path, encoding)`

### Date

Date helpers are developed on [momentjs][]. See [the documentation](http://momentjs.com/docs/) for more details.

[momentjs]: http://momentjs.com/

#### Return String:

- [d-iso](#d-iso-d) `(d)`
- [d-format](#d-format-format-d) `(format, d)`

#### Return Date:

- [d-now](#d-now) `()`
- [d-parse](#d-parse-format-d) `(format, d)`
- [d-add](#d-add-n-unit-d) `(n, unit, d)`
- [d-subtract](#d-subtract-n-unit-d) `(n, unit, d)`

### Conventional guide.

#### Namespace

Start with:

- `-`: Collections functions and basic utility
- `n-`: Numeric functions
- `d-`: Date functions
- `s-`: String functions

#### Predicate

- Predicate should return real boolean(not falsy/truey values)
- The name of predicate should end with question mark('?')

#### Arguments

- Mandatory arguments should be before target object, but Optional arguments should be after target object. Let's see [s-replace](#s-replace-old-new-regopts):

```html
{{s-replace old new s regOpts}}
```
- `old` and `new` are mandatory arguments.
- `s` is main argument
- `regOpts` is optional.

## License

MIT © [Changwoo Park](https://pismute.github.io/)

[npm-url]: https://npmjs.org/package/dashbars
[npm-image]: https://badge.fury.io/js/dashbars.svg
[travis-url]: https://travis-ci.org/pismute/dashbars
[travis-image]: https://travis-ci.org/pismute/dashbars.svg?branch=master
[daviddm-url]: https://david-dm.org/pismute/dashbars.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/pismute/dashbars
[coverall-image]: https://coveralls.io/repos/pismute/dashbars/badge.svg
[coverall-url]: https://coveralls.io/r/pismute/dashbars
