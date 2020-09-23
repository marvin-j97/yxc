(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.yxc = {}));
}(this, (function (exports) { 'use strict';

    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (process.env.YXC_DEBUG) {
            console.log.apply(console, args);
        }
    }

    var Handler = (function () {
        function Handler() {
            this._rules = [];
        }
        Handler.prototype.test = function (rule) {
            this.custom(rule);
            return this;
        };
        Handler.prototype.check = function (rule) {
            this.custom(rule);
            return this;
        };
        Handler.prototype.use = function (rule) {
            this.custom(rule);
            return this;
        };
        Handler.prototype.rule = function (rule) {
            this.custom(rule);
            return this;
        };
        Handler.prototype.custom = function (rule) {
            this._rules.push(rule);
            return this;
        };
        Handler.prototype.validate = function (value, key, root) {
            var results = [];
            log("Checking rules");
            for (var _i = 0, _a = this._rules; _i < _a.length; _i++) {
                var rule = _a[_i];
                var result = rule(value, key || [], root || value);
                if (typeof result === "string" || !result) {
                    log("Rule failed!");
                    results.push({ key: key || [], message: result });
                    log("Rule result: " + result);
                    return results;
                }
                else {
                    log("Rule passed!");
                }
            }
            log("Checked rules, " + results.length + " errors");
            return results;
        };
        return Handler;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var OptionalHandler = (function (_super) {
        __extends(OptionalHandler, _super);
        function OptionalHandler() {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return v === undefined || "Must be undefined"; });
            return _this;
        }
        OptionalHandler.prototype.nullable = function () {
            return new UnionHandler([this, new NullHandler()]);
        };
        return OptionalHandler;
    }(Handler));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var NullHandler = (function (_super) {
        __extends$1(NullHandler, _super);
        function NullHandler() {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return v === null || "Must be null"; });
            return _this;
        }
        NullHandler.prototype.optional = function () {
            return new UnionHandler([this, new OptionalHandler()]);
        };
        return NullHandler;
    }(Handler));

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var UnionHandler = (function (_super) {
        __extends$2(UnionHandler, _super);
        function UnionHandler(handlers) {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) {
                if (handlers.some(function (h) { return h.validate(v).length === 0; })) {
                    return true;
                }
                return "Input is not matching any of the expected schemas";
            });
            return _this;
        }
        UnionHandler.prototype.nullable = function () {
            return new UnionHandler([this, new NullHandler()]);
        };
        UnionHandler.prototype.optional = function () {
            return new UnionHandler([this, new OptionalHandler()]);
        };
        return UnionHandler;
    }(Handler));

    var __extends$3 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var BaseHandler = (function (_super) {
        __extends$3(BaseHandler, _super);
        function BaseHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseHandler.prototype.nullable = function () {
            return new UnionHandler([this, new NullHandler()]);
        };
        BaseHandler.prototype.optional = function () {
            return new UnionHandler([this, new OptionalHandler()]);
        };
        return BaseHandler;
    }(Handler));

    var __extends$4 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var AtomicHandler = (function (_super) {
        __extends$4(AtomicHandler, _super);
        function AtomicHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AtomicHandler.prototype.equals = function (expected) {
            this._rules.push(function (v) { return v === expected || "Must be equal to " + expected; });
            return this;
        };
        AtomicHandler.prototype.eq = function (expected) {
            return this.equals(expected);
        };
        AtomicHandler.prototype.equal = function (expected) {
            return this.equals(expected);
        };
        AtomicHandler.prototype.enum = function (values) {
            this._rules.push(function (v) {
                return values.includes(v) ||
                    "Must be one of the following values: " + values.join(", ");
            });
            return this;
        };
        return AtomicHandler;
    }(BaseHandler));

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    function isEmail(str) {
        return emailRegex.test(str);
    }

    var __extends$5 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var StringHandler = (function (_super) {
        __extends$5(StringHandler, _super);
        function StringHandler() {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return typeof v === "string" || "Must be a string"; });
            return _this;
        }
        StringHandler.prototype.prefix = function (substr) {
            return this.startsWith(substr);
        };
        StringHandler.prototype.suffix = function (substr) {
            return this.endsWith(substr);
        };
        StringHandler.prototype.endsWith = function (substr) {
            this._rules.push(function (v) { return v.endsWith(substr) || "Value has to end with " + substr; });
            return this;
        };
        StringHandler.prototype.beginsWith = function (substr) {
            return this.startsWith(substr);
        };
        StringHandler.prototype.startsWith = function (substr) {
            this._rules.push(function (v) { return v.startsWith(substr) || "Value has to start with " + substr; });
            return this;
        };
        StringHandler.prototype.email = function () {
            this._rules.push(function (v) { return isEmail(v) || "Must be a valid email"; });
            return this;
        };
        StringHandler.prototype.numeric = function () {
            var regexp = /[^0-9]/;
            this._rules.push(function (v) { return (v.length && !regexp.test(v)) || "Must be numeric"; });
            return this;
        };
        StringHandler.prototype.alphanum = function (allowSpaces) {
            var regexp = allowSpaces ? /[^a-zA-Z0-9 ]/ : /[^a-zA-Z0-9]/;
            this._rules.push(function (v) { return (v.length && !regexp.test(v)) || "Must be alphanumeric"; });
            return this;
        };
        StringHandler.prototype.regex = function (regexp) {
            this._rules.push(function (v) { return regexp.test(v) || "Does not match " + regexp.toString(); });
            return this;
        };
        StringHandler.prototype.match = function (regexp) {
            return this.regex(regexp);
        };
        StringHandler.prototype.pattern = function (regexp) {
            return this.regex(regexp);
        };
        StringHandler.prototype.length = function (num) {
            this._rules.push(function (v) { return v.length === num || "Must be of length " + num; });
            return this;
        };
        StringHandler.prototype.len = function (num) {
            return this.length(num);
        };
        StringHandler.prototype.notEmpty = function () {
            return this.min(1);
        };
        StringHandler.prototype.between = function (min, max) {
            return this.min(min).max(max);
        };
        StringHandler.prototype.min = function (min) {
            this._rules.push(function (v) {
                return v.length >= min || "Must be at least " + min + " characters long";
            });
            return this;
        };
        StringHandler.prototype.max = function (max) {
            this._rules.push(function (v) { return v.length <= max || "Must have at most " + max + " characters"; });
            return this;
        };
        return StringHandler;
    }(AtomicHandler));

    function isObject(val) {
        return typeof val === "object" && !Array.isArray(val) && val !== null;
    }

    var __extends$6 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var ObjectHandler = (function (_super) {
        __extends$6(ObjectHandler, _super);
        function ObjectHandler(keys) {
            var _this = _super.call(this) || this;
            _this._keys = {};
            _this._arbitrary = false;
            _this._partial = false;
            _this._rules.push(function (v) { return isObject(v) || "Must be an object"; });
            if (keys) {
                _this._keys = keys;
            }
            return _this;
        }
        ObjectHandler.prototype.any = function (pred) {
            return this.some(pred);
        };
        ObjectHandler.prototype.all = function (pred) {
            return this.every(pred);
        };
        ObjectHandler.prototype.some = function (pred) {
            this._rules.push(function (o) { return Object.keys(o).some(function (k) { return pred(o[k], k, o); }); });
            return this;
        };
        ObjectHandler.prototype.every = function (pred) {
            this._rules.push(function (o) { return Object.keys(o).every(function (k) { return pred(o[k], k, o); }); });
            return this;
        };
        ObjectHandler.prototype.partial = function () {
            this._partial = true;
            return this;
        };
        ObjectHandler.prototype.arbitrary = function () {
            this._arbitrary = true;
            return this;
        };
        ObjectHandler.prototype.numKeys = function (num) {
            this._rules.push(function (v) { return Object.keys(v).length === num || "Must have " + num + " keys"; });
            return this;
        };
        ObjectHandler.prototype.validate = function (value, key, root) {
            if (key === void 0) { key = []; }
            var myResults = _super.prototype.validate.call(this, value, key, root);
            var keyResults = [];
            if (typeof value === "object" && value !== null) {
                var _value_1 = value;
                if (!this._arbitrary) {
                    for (var objKey in _value_1) {
                        var handler = this._keys[objKey];
                        if (!handler) {
                            keyResults.push({
                                key: __spreadArrays(key, [objKey]),
                                message: "Value not allowed",
                            });
                        }
                    }
                }
                var _loop_1 = function (myKey) {
                    var handler = this_1._keys[myKey];
                    var getResults = function (handler) {
                        var results = handler.validate(_value_1[myKey], __spreadArrays(key, [myKey]), root);
                        keyResults.push.apply(keyResults, results);
                        return results;
                    };
                    if (handler instanceof Handler) {
                        if (this_1._partial) {
                            getResults(new UnionHandler([handler, new OptionalHandler()]));
                        }
                        else {
                            getResults(handler);
                        }
                    }
                };
                var this_1 = this;
                for (var myKey in this._keys) {
                    _loop_1(myKey);
                }
            }
            return myResults.concat(keyResults);
        };
        return ObjectHandler;
    }(BaseHandler));

    var __extends$7 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var NumberHandler = (function (_super) {
        __extends$7(NumberHandler, _super);
        function NumberHandler() {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) {
                return (typeof v === "number" && !isNaN(v)) || "Must be a number";
            });
            return _this;
        }
        NumberHandler.prototype.natural = function (opts) {
            return this.integer().positive({ withZero: opts === null || opts === void 0 ? void 0 : opts.withZero });
        };
        NumberHandler.prototype.int = function () {
            return this.integer();
        };
        NumberHandler.prototype.integer = function () {
            this._rules.push(function (v) { return Number.isInteger(v) || "Must be an integer"; });
            return this;
        };
        NumberHandler.prototype.negative = function (opts) {
            if (opts === null || opts === void 0 ? void 0 : opts.withZero) {
                this.max(0);
            }
            else {
                this._rules.push(function (v) { return v < 0 || "Must be a negative number"; });
            }
            return this;
        };
        NumberHandler.prototype.positive = function (opts) {
            if (opts === null || opts === void 0 ? void 0 : opts.withZero) {
                this.min(0);
            }
            else {
                this._rules.push(function (v) { return v > 0 || "Must be a positive number"; });
            }
            return this;
        };
        NumberHandler.prototype.between = function (min, max) {
            this._rules.push(function (v) { return (v >= min && v <= max) || "Must be " + min + " and " + max; });
            return this;
        };
        NumberHandler.prototype.min = function (min) {
            this._rules.push(function (v) { return v >= min || "Must be " + min + " or greater"; });
            return this;
        };
        NumberHandler.prototype.max = function (max) {
            this._rules.push(function (v) { return v <= max || "Must be less than or equal " + max; });
            return this;
        };
        return NumberHandler;
    }(AtomicHandler));

    var __extends$8 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var BooleanHandler = (function (_super) {
        __extends$8(BooleanHandler, _super);
        function BooleanHandler() {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return typeof v === "boolean" || "Must be a boolean"; });
            return _this;
        }
        BooleanHandler.prototype.true = function () {
            return this.equals(true);
        };
        BooleanHandler.prototype.false = function () {
            return this.equals(false);
        };
        return BooleanHandler;
    }(AtomicHandler));

    var __extends$9 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __spreadArrays$1 = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var ArrayHandler = (function (_super) {
        __extends$9(ArrayHandler, _super);
        function ArrayHandler(handler) {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return Array.isArray(v) || "Must be an array"; });
            _this._handler = handler;
            return _this;
        }
        ArrayHandler.prototype.any = function (pred) {
            return this.some(pred);
        };
        ArrayHandler.prototype.all = function (pred) {
            return this.every(pred);
        };
        ArrayHandler.prototype.some = function (pred) {
            this._rules.push(function (arr) { return arr.some(pred); });
            return this;
        };
        ArrayHandler.prototype.every = function (pred) {
            this._rules.push(function (arr) { return arr.every(pred); });
            return this;
        };
        ArrayHandler.prototype.length = function (num) {
            this._rules.push(function (v) { return v.length === num || "Must be of length " + num; });
            return this;
        };
        ArrayHandler.prototype.len = function (num) {
            this.length(num);
            return this;
        };
        ArrayHandler.prototype.notEmpty = function () {
            this._rules.push(function (v) { return !!v.length || "Must not be empty"; });
            return this;
        };
        ArrayHandler.prototype.between = function (min, max) {
            return this.min(min).max(max);
        };
        ArrayHandler.prototype.min = function (min) {
            this._rules.push(function (v) {
                return v.length >= min || "Must have at least " + min + " items";
            });
            return this;
        };
        ArrayHandler.prototype.max = function (max) {
            this._rules.push(function (v) {
                return v.length <= max || "Must have at most " + max + " items";
            });
            return this;
        };
        ArrayHandler.prototype.validate = function (value, key, root) {
            var _this = this;
            if (key === void 0) { key = []; }
            var myResults = _super.prototype.validate.call(this, value, key, root);
            var keyResults = [];
            if (Array.isArray(value)) {
                value.forEach(function (v, i) {
                    var myKey = i.toString();
                    var results = _this._handler.validate(v, __spreadArrays$1(key, [myKey]), root);
                    keyResults.push.apply(keyResults, results);
                });
            }
            return myResults.concat(keyResults);
        };
        return ArrayHandler;
    }(BaseHandler));

    var __extends$a = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var AnyHandler = (function (_super) {
        __extends$a(AnyHandler, _super);
        function AnyHandler() {
            return _super.call(this) || this;
        }
        AnyHandler.prototype.truthy = function () {
            this._rules.push(function (v) { return !!v || "Value must be truthy"; });
            return this;
        };
        AnyHandler.prototype.falsy = function () {
            this._rules.push(function (v) { return !v || "Value must be falsy"; });
            return this;
        };
        return AnyHandler;
    }(AtomicHandler));

    var __extends$b = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __spreadArrays$2 = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var RecordHandler = (function (_super) {
        __extends$b(RecordHandler, _super);
        function RecordHandler(schema) {
            var _this = _super.call(this) || this;
            _this._rules.push(function (v) { return isObject(v) || "Must be an object"; });
            _this._schema = schema;
            return _this;
        }
        RecordHandler.prototype.any = function (pred) {
            return this.some(pred);
        };
        RecordHandler.prototype.all = function (pred) {
            return this.every(pred);
        };
        RecordHandler.prototype.some = function (pred) {
            this._rules.push(function (o) { return Object.keys(o).some(function (k) { return pred(o[k], k, o); }); });
            return this;
        };
        RecordHandler.prototype.every = function (pred) {
            this._rules.push(function (o) { return Object.keys(o).every(function (k) { return pred(o[k], k, o); }); });
            return this;
        };
        RecordHandler.prototype.numKeys = function (num) {
            this._rules.push(function (v) {
                return Object.keys(v).length === num || "Must have " + num + " keys";
            });
            return this;
        };
        RecordHandler.prototype.validate = function (value, key, root) {
            if (key === void 0) { key = []; }
            var myResults = _super.prototype.validate.call(this, value, key, root);
            var keyResults = [];
            if (typeof value === "object") {
                var _value = value;
                for (var myKey in _value) {
                    var results = this._schema.validate(_value[myKey], __spreadArrays$2(key, [myKey]), root);
                    keyResults.push.apply(keyResults, results);
                }
            }
            return myResults.concat(keyResults);
        };
        return RecordHandler;
    }(BaseHandler));

    function createExecutableSchema(handler) {
        return function (value) {
            var result = handler.validate(value, [], value);
            return {
                ok: !result.length,
                errors: result,
            };
        };
    }
    function createSchema(def) {
        return createExecutableSchema(new ObjectHandler(def));
    }
    function is(value, handler) {
        return createExecutableSchema(handler)(value).ok;
    }

    var index = {
        object: function (schema) {
            return new ObjectHandler(schema);
        },
        record: function (schema) {
            return new RecordHandler(schema);
        },
        string: function () { return new StringHandler(); },
        number: function () { return new NumberHandler(); },
        boolean: function () { return new BooleanHandler(); },
        array: function (handler) {
            return new ArrayHandler(handler);
        },
        any: function () { return new AnyHandler(); },
        union: function (handlers) {
            return new UnionHandler(handlers);
        },
        null: function () { return new NullHandler(); },
        optional: function () { return new OptionalHandler(); },
        undefined: function () { return new OptionalHandler(); },
    };

    exports.createExecutableSchema = createExecutableSchema;
    exports.createSchema = createSchema;
    exports.default = index;
    exports.is = is;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
