var times = require('times'),
    keys = require('keys'),
    each = require('each');

var has = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var isArray = Array.isArray ||
function(obj) {
    return toString.call(obj) == '[object Array]';
};
var isValue = function(v){
    return v != null;
};


var paths = function(o){
    // enumerate json paths to all leaves
    // todo - optimize
    var paths = [];
    each(keys(o), function(k) {
        var _t = typeof o[k];
        // check for primitives and arrays
        // todo - oh god this could be so much cleaner. 
        // perhaps - _.isArray(x) || !_.isObject(x)
        if ((!isValue(o[k])) || _t === 'string' || _t === 'number' || isArray(o[k]) || _t === 'boolean') {
            paths.push({
                key: k,
                value: o[k]
            });
            return;
        } else {
            var childPaths = paths(o[k]);
            paths = paths.concat(times(childPaths, function(i, p) {
                return ({
                    key: k + '.' + p.key,
                    value: p.value
                });
            }));
        }

    });
    return paths;
};

module.exports = {
    at: function(o, path){
        var pointer = o;
            var failed = false;
            if (!path) {
                return o;
            }
            each(path.split('.'), function(p) {
                if (isValue(pointer[p]) && !failed) {
                    pointer = pointer[p];
                } else {
                    failed = true;
                }
            });
            return failed ? undefined : pointer;
    },
    setAt: function(o, key, value){
        var t = this;
        // _(x).setAt('a.b.c', 2) -> x.a.b.c === 2, WITHOUT overriding .a .b if they exist
        if (typeof key === 'string') {
            var path = key.split('.');
            var node = o || {};
            times(path.length - 1, function(i) {
                var _node = node[path[i]];
                if (!isValue(_node)) {
                    _node = node[path[i]] = {};
                }
                node = _node;
            });

            node[path[path.length - 1]] = value;
        } else {
            //setting object hash by deepcopy
            each(paths(key), function(p, i) {
                t.setAt(o, p.key, p.value);
            });
        }
        return o;
    }
};
