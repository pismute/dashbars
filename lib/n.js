var n = function n($register, $helper){
    $helper = $helper; // for lint

    //Predicate
    $register('n-even?', function(n) {
        return n%2 === 0;
    });
    $register('n-odd?', function(n) {
        return n%2 !== 0;
    });

    //Operation
    $register('n-add', function(left, right) {
        return left+right;
    });

    $register('n-subtract', function(left, right) {
        return left-right;
    });

    $register('n-multiply', function(left, right) {
        return left*right;
    });

    $register('n-divide', function(left, right) {
        return left/right;
    });
};
