var _helper = function(name){
    return _().isFunction(name)? name:
            this._helpable.helper(name) || function(){
                throw Error('not found the helper:' + name);
            };
};

var _emptyHelpable = {
    registerHelper: function(name, func){
        //for lint
        name = name;
        func = func;

        return this;
    },
    helper: function(name){
        //for lint
        name = name;

        return function(){};
    }
};

var _wrapHelpable = function(helpable){
    //handlebars
    return {
        registerHelper: function(name, func){
            helpable.registerHelper(name, func);

            return this;
        },
        helper: function(name){
            return helpable.helpers[name];
        }
    };
};

var _help = function(helpable){
    var that = this;
    this._helpable = _wrapHelpable(helpable);

    this._registerers.forEach(function(register){
        register(that._helpable.registerHelper, that.helper, that.predicate);
    });

    return this;
};

//TODO: remove cos it is not functional.
var _extend = function(dashbars){
    var registerers = this._registerers;

    dashbars._registerers.forEach(function(registerer){
        registerers.push(registerer);
    });

    return this;
};

var _create = function(){
    var args = _().flatten(Array.prototype.slice.call(arguments));
    var dashbars = {
        //TODO: remove extendable cos it is not functional.
        _registerers: _().isEmpty(this._registerers)? []: this._registerers,
        _helpable: _emptyHelpable
    };

    args.forEach(function(registerer){
        dashbars._registerers.push(registerer);
    });

    dashbars.help = _help.bind(dashbars);
    dashbars.helper = _helper.bind(dashbars);
    dashbars.create = _create.bind(dashbars);
    dashbars.extend = _extend.bind(dashbars);

    return dashbars;
};
