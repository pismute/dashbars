var dash = function dash(_register, _helper){
    //List
    _register('-map', function(fn, list) {
        return list.map(_helper(fn));
    });
    _register('-sort', function(list, compare, options) {
        return list.slice().sort(options && _helper(compare));
    });
    _register('-take', function(n, list) {
       return list.slice(0, n);
    });
    _register('-drop', function(n, list) {
       return list.slice(n);
    });
    _register('-take-while', function(pred, list) {
        return _().filter(list, _helper(pred));
    });
    _register('-drop-while', function(pred, list) {
        return _().dropWhile(list, _helper(pred));
    });
    _register('-slice', function(list, begin, end, options) {
        return list.slice(end && begin, options && end);
    });
    _register('-flatten', function(list) {
        return _().flatten(list);
    });
    _register('-deep-flatten', function(list) {
        return _().flatten(list, true);
    });

    //Cons
    _register('-array', function() {
        return Array.prototype.slice.call(arguments, 0, -1);
    });
    _register('-range', function(from, to, step, options) {
        return _().range(to && from, step && to, options && step);
    });
    _register('-object', function(json) {
        return JSON.parse(json);
    });

    //Reductions
    _register('-size', function(list) {
        return list.length;
    });
    _register('-find', function(pred, list) {
        return _().find(list, _helper(pred).bind(this));
    });
    _register('-reduce', function(fn, initial, list) {
        return list.reduce(_helper(fn), initial);
    });
    _register('-first', function(list) {
        return _().first(list);
    });
    _register('-last', function(list) {
        return _().last(list);
    });
    _register('-join', function(list, sep, options) {
        return list.join(options? sep:'');
    });
    _register('-sum', function(list) {
        return list.reduce(function(r, e){
                return r+e;
            }, 0);
    });
    _register('-product', function(list) {
        return list.reduce(function(r, e){
                return r*e;
            }, 1);
    });
    _register('-min', function(list) {
        return list.reduce(function(r, e){
                return r<e? r:e;
            }, Number.MAX_VALUE);
    });
    _register('-max', function(list) {
        return list.reduce(function(r, e){
                return r>e? r:e;
            }, Number.MIN_VALUE);
    });

    //Partitioning
    _register('-group-by', function(fn, list) {
        var that = this;
        return list.reduce(function(r, el){
            var key = _helper(fn).call(that, el);

            if( r[key] ){
               r[key].push(el);
            }else{
               r[key] = [el];
            }

            return r;
        }, {});
    });

    //Iteration
    _register('-grouped', function(size, list){
        return _().range(0, list.length, size)
            .map(function(n){ return list.slice(n, n+size);});
    });

    //Predicate
    _register('-every?', function(pred, list){
        return list.every(_helper(pred));
    });
    _register('-some?', function(pred, list){
        return list.some(_helper(pred));
    });
    _register('-none?', function(pred, list){
        return !list.some(_helper(pred));
    });
    _register('-contain?', function(item, list){
        return list.some(function(el){
                return el === item;
            });
    });

    //Set operation
    _register('-union', function() {
        return Array.prototype.concat.apply(arguments[0],
            Array.prototype.slice.call(arguments, 1, -1));
    });
    _register('-difference', function() {
        return _().difference.apply(null,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('-intersection', function() {
        return _().intersection.apply(null,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    _register('-distinct', function(list) {
        return _().unique(list);
    });

    //Dictionary
    _register('-get', function(key, dict) {
        return dict[key];
    });
    _register('-keys', function(dict) {
        return Object.keys(dict);
    });
    _register('-values', function(dict) {
        return Object.keys(dict).map(function(k){
                return dict[k];
            });
    });

    //Object
    _register('-json', function(dict) {
        return JSON.stringify(dict);
    });

    //Function
    _register('-call', function() {
        var fn = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1, -1);

       return fn.apply(this, args);
    });
    _register('-as-is', function(o) {
        return o;
    });
    _register('-partial', function() {
        var fn = arguments[0];
        var applied = Array.prototype.slice.call(arguments, 1, -1);
        var that = this;
        return function(){
            var args = applied.slice();
            var arg = 0;
            for ( var i = 0; i < args.length || arg < arguments.length; i++ ) {
                if ( args[i] === undefined ) {
                    args[i] = arguments[arg++];
                }
            }

            return _helper(fn).apply(that, args);
        };
    });

    //Side Effects
    _register('-let', function(name, value) {
        this[name] = value;
    });
    _register('-log', function() {
        console.log.call(this, Array.prototype.slice.call(arguments, 1, -1));
    });

};
