var n = function n(_register){
    //Predicate
    _register('n-even?', function(n) {
        return n%2 === 0;
    });
    _register('n-odd?', function(n) {
        return n%2 !== 0;
    });

    //Operation
    _register('n-add', function(left, right) {
        return left+right;
    });

    _register('n-subtract', function(left, right) {
        return left-right;
    });

    _register('n-multiply', function(left, right) {
        return left*right;
    });

    _register('n-devide', function(left, right) {
        return left/right;
    });
};
