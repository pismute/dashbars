var s = function s($register, $helper){
    $helper = $helper; // for lint

    $register('s-size', function(s) {
        return s.length;
    });
    $register('s-trim', function(s) {
        return s.trim();
    });
    $register('s-take', function(n, s) {
        return s.slice(0, n);
    });
    $register('s-drop', function(n, s) {
        return s.slice(n);
    });
    $register('s-repeat', function(n, s) {
        return (new Array(n+1)).join(s);
    });
    $register('s-concat', function() {
        return Array.prototype.slice.call(arguments, 0, -1).join('');
    });
    $register('s-split', function(sep, s) {
        return s.split(sep);
    });
    $register('s-slice', function(s, from, to, options) {
        return s.slice(to && from, options && to);
    });
    $register('s-reverse', function(s) {
        return s.split('').reverse().join('');
    });
    $register('s-replace', function(old, nu, s, regOpts, options) {
        return s.replace(new RegExp(old, options && regOpts), nu);
    });
    $register('s-match', function(regex, s, regOpts, options) {
        return s.match(new RegExp(regex, options && regOpts)) || [];
    });
    $register('s-lowercase', function(s) {
        return s.toLowerCase();
    });
    $register('s-uppercase', function(s) {
        return s.toUpperCase();
    });

    //predicates
    $register('s-lowercase?', function(s) {
        return s.toLowerCase() === s;
    });
    $register('s-uppercase?', function(s) {
        return s.toUpperCase() === s;
    });
    $register('s-match?', function(regex, s, regOpts, options) {
        return (new RegExp(regex, options && regOpts)).test(s);
    });
    $register('s-contain?', function(needle, s, ignoreCase) {
        needle = (ignoreCase) ? needle.toLowerCase(): needle;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.indexOf(needle) >= 0;
    });
    $register('s-start-with?', function(prefix, s, ignoreCase) {
        prefix = (ignoreCase) ? prefix.toLowerCase(): prefix;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.indexOf(prefix) === 0;
    });
    $register('s-end-with?', function(suffix, s, ignoreCase) {
        suffix = (ignoreCase) ? suffix.toLowerCase(): suffix;
        s = (ignoreCase) ? s.toLowerCase(): s;

        return s.lastIndexOf(suffix) === s.length - suffix.length;
    });
};
