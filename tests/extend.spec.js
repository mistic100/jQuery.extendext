require('jest-expect-message');

const $ = require('jquery');
require('../jquery-extendext');

describe('tests from jQuery', () => {

    it('jQuery.extend(Object, Object)', function () {
        expect.assertions(28);

        var empty, optionsWithLength, optionsWithDate, myKlass,
            customObject, optionsWithCustomObject, MyNumber, ret,
            nullUndef, target, recursive, obj,
            defaults, defaultsCopy, options1, options1Copy, options2, options2Copy, merged2,
            settings = { 'xnumber1': 5, 'xnumber2': 7, 'xstring1': 'peter', 'xstring2': 'pan' },
            options = { 'xnumber2': 1, 'xstring2': 'x', 'xxx': 'newstring' },
            optionsCopy = { 'xnumber2': 1, 'xstring2': 'x', 'xxx': 'newstring' },
            merged = { 'xnumber1': 5, 'xnumber2': 1, 'xstring1': 'peter', 'xstring2': 'x', 'xxx': 'newstring' },
            deep1 = { 'foo': { 'bar': true } },
            deep2 = { 'foo': { 'baz': true }, 'foo2': document },
            deep2copy = { 'foo': { 'baz': true }, 'foo2': document },
            deepmerged = { 'foo': { 'bar': true, 'baz': true }, 'foo2': document },
            arr = [1, 2, 3],
            nestedarray = { 'arr': arr };

        $.extendext(settings, options);
        expect(settings, 'Check if extended: settings must be extended').toEqual(merged);
        expect(options, 'Check if not modified: options must not be modified').toEqual(optionsCopy);

        $.extendext(settings, null, options);
        expect(settings, 'Check if extended: settings must be extended').toEqual(merged);
        expect(options, 'Check if not modified: options must not be modified').toEqual(optionsCopy);

        $.extendext(true, deep1, deep2);
        expect(deep1['foo'], 'Check if foo: settings must be extended').toEqual(deepmerged['foo']);
        expect(deep2['foo'], 'Check if not deep2: options must not be modified').toEqual(deep2copy['foo']);
        expect(deep1['foo2'], 'Make sure that a deep clone was not attempted on the document').toEqual(document);

        expect($.extendext(true, {}, nestedarray)['arr'] !== arr, 'Deep extend of object must clone child array').toEqual(true);

        // #5991
        expect(Array.isArray($.extendext(true, { 'arr': {} }, nestedarray)['arr']), 'Cloned array have to be an Array').toEqual(true);
        expect($.isPlainObject($.extendext(true, { 'arr': arr }, { 'arr': {} })['arr']), 'Cloned object have to be an plain object').toEqual(true);

        empty = {};
        optionsWithLength = { 'foo': { 'length': -1 } };
        $.extendext(true, empty, optionsWithLength);
        expect(empty['foo'], 'The length property must copy correctly').toEqual(optionsWithLength['foo']);

        empty = {};
        optionsWithDate = { 'foo': { 'date': new Date() } };
        $.extendext(true, empty, optionsWithDate);
        expect(empty['foo'], 'Dates copy correctly').toEqual(optionsWithDate['foo']);

        /** @constructor */
        myKlass = function () {
        };
        customObject = new myKlass();
        optionsWithCustomObject = { 'foo': { 'date': customObject } };
        empty = {};
        $.extendext(true, empty, optionsWithCustomObject);
        expect(empty['foo'] && empty['foo']['date'] === customObject, 'Custom objects copy correctly (no methods)').toEqual(true);

        // Makes the class a little more realistic
        myKlass.prototype = {
            'someMethod': function () {
            }
        };
        empty = {};
        $.extendext(true, empty, optionsWithCustomObject);
        expect(empty['foo'] && empty['foo']['date'] === customObject, 'Custom objects copy correctly').toEqual(true);

        MyNumber = Number;

        ret = $.extendext(true, { 'foo': 4 }, { 'foo': new MyNumber(5) });
        expect(parseInt(ret.foo, 10) === 5, 'Wrapped numbers copy correctly').toEqual(true);

        nullUndef = $.extendext({}, options, { 'xnumber2': null });
        expect(nullUndef['xnumber2'] === null, 'Check to make sure null values are copied').toEqual(true);

        nullUndef = $.extendext({}, options, { 'xnumber2': undefined });
        expect(nullUndef['xnumber2'] === options['xnumber2'], 'Check to make sure undefined values are not copied').toEqual(true);

        nullUndef = $.extendext({}, options, { 'xnumber0': null });
        expect(nullUndef['xnumber0'] === null, 'Check to make sure null values are inserted').toEqual(true);

        target = {};
        recursive = { foo: target, bar: 5 };
        $.extendext(true, target, recursive);
        expect(target, 'Check to make sure a recursive obj doesn\'t go never-ending loop by not copying it over').toEqual({ bar: 5 });

        ret = $.extendext(true, { foo: [] }, { foo: [0] }); // 1907
        expect(ret.foo.length, 'Check to make sure a value with coercion \'false\' copies over when necessary to fix #1907').toEqual(1);

        ret = $.extendext(true, { foo: '1,2,3' }, { foo: [1, 2, 3] });
        expect(typeof ret.foo !== 'string', 'Check to make sure values equal with coercion (but not actually equal) overwrite correctly').toEqual(true);

        ret = $.extendext(true, { foo: 'bar' }, { foo: null });
        expect(typeof ret.foo !== 'undefined', 'Make sure a null value doesn\'t crash with deep extend, for #1908').toEqual(true);

        obj = { foo: null };
        $.extendext(true, obj, { foo: 'notnull' });
        expect(obj.foo, 'Make sure a null value can be overwritten').toEqual('notnull');

        function func() {
        }

        $.extendext(func, { key: 'value' });
        expect(func.key, 'Verify a function can be extended').toEqual('value');

        defaults = { xnumber1: 5, xnumber2: 7, xstring1: 'peter', xstring2: 'pan' };
        defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: 'peter', xstring2: 'pan' };
        options1 = { xnumber2: 1, xstring2: 'x' };
        options1Copy = { xnumber2: 1, xstring2: 'x' };
        options2 = { xstring2: 'xx', xxx: 'newstringx' };
        options2Copy = { xstring2: 'xx', xxx: 'newstringx' };
        merged2 = { xnumber1: 5, xnumber2: 1, xstring1: 'peter', xstring2: 'xx', xxx: 'newstringx' };

        settings = $.extendext({}, defaults, options1, options2);
        expect(settings, 'Check if extended: settings must be extended').toEqual(merged2);
        expect(defaults, 'Check if not modified: options1 must not be modified').toEqual(defaultsCopy);
        expect(options1, 'Check if not modified: options1 must not be modified').toEqual(options1Copy);
        expect(options2, 'Check if not modified: options2 must not be modified').toEqual(options2Copy);
    });

    it('jQuery.extend(Object, Object {created with "defineProperties"})', function () {
        expect.assertions(2);

        var definedObj = Object.defineProperties({}, {
                'enumerableProp'   : {
                    get       : function () {
                        return true;
                    },
                    enumerable: true
                },
                'nonenumerableProp': {
                    get: function () {
                        return true;
                    }
                }
            }),
            accessorObj = {};

        $.extendext(accessorObj, definedObj);
        expect(accessorObj.enumerableProp, 'Verify that getters are transferred').toEqual(true);
        expect(accessorObj.nonenumerableProp, 'Verify that non-enumerable getters are ignored').toEqual(undefined);
    });

    it('jQuery.extend(true,{},{a:[], o:{}}); deep copy with array, followed by object', function () {
        expect.assertions(2);

        var result, initial = {

            // This will make "copyIsArray" true
            array: [1, 2, 3, 4],

            // If "copyIsArray" doesn't get reset to false, the check
            // will evaluate true and enter the array copy block
            // instead of the object copy block. Since the ternary in the
            // "copyIsArray" block will evaluate to false
            // (check if operating on an array with ), this will be
            // replaced by an empty array.
            object: {}
        };

        result = $.extendext(true, {}, initial);

        expect(result, 'The [result] and [initial] have equal shape and values').toEqual(initial);
        expect(!Array.isArray(result.object), 'result.object wasn\'t paved with an empty array').toEqual(true);
    });

    it('jQuery.extend( true, ... ) Object.prototype pollution', function () {
        expect.assertions(1);

        $.extendext(true, {}, JSON.parse('{"__proto__": {"devMode": true}}'));
        expect(!('devMode' in {}), 'Object.prototype not polluted').toEqual(true);
    });

});
