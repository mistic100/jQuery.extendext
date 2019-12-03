const $ = require('jquery');
require('../jquery-extendext');

describe('tests from deepmerge', () => {

    it('should add keys in target that do not exist at the root', () => {
        const src = { key1: 'value1', key2: 'value2' };
        const target = {};
        const expected = { key1: 'value1', key2: 'value2' };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should merge existing simple keys in target at the roots', () => {
        const src = { key1: 'changed', key2: 'value2' };
        const target = { key1: 'value1', key3: 'value3' };
        const expected = {
            key1: 'changed',
            key2: 'value2',
            key3: 'value3'
        };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should merge nested objects into target', () => {
        const src = {
            key1: {
                subkey1: 'changed',
                subkey3: 'added'
            }
        };
        const target = {
            key1: {
                subkey1: 'value1',
                subkey2: 'value2'
            }
        };
        const expected = {
            key1: {
                subkey1: 'changed',
                subkey2: 'value2',
                subkey3: 'added'
            }
        };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should replace simple key with nested object in target', () => {
        const src = {
            key1: {
                subkey1: 'subvalue1',
                subkey2: 'subvalue2'
            }
        };
        const target = {
            key1: 'value1',
            key2: 'value2'
        };
        const expected = {
            key1: {
                subkey1: 'subvalue1',
                subkey2: 'subvalue2'
            },
            key2: 'value2'
        };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should add nested object in target', () => {
        const src = {
            'b': {
                'c': {}
            }
        };
        const target = {
            'a': {}
        };
        const expected = {
            'a': {},
            'b': {
                'c': {}
            }
        };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should replace object with simple key in target', () => {
        const src = { key1: 'value1' };
        const target = {
            key1: {
                subkey1: 'subvalue1',
                subkey2: 'subvalue2'
            },
            key2: 'value2'
        };
        const expected = { key1: 'value1', key2: 'value2' };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should work on simple array', () => {
        const src = ['one', 'three'];
        const target = ['one', 'two'];
        const expected = ['one', 'two', 'three'];

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should work on another simple array', () => {
        const target = ['a1', 'a2', 'c1', 'f1', 'p1'];
        const src = ['t1', 's1', 'c2', 'r1', 'p2', 'p3'];
        const expected = ['a1', 'a2', 'c1', 'f1', 'p1', 't1', 's1', 'c2', 'r1', 'p2', 'p3'];

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should work on array properties', () => {
        const src = {
            key1: ['one', 'three'],
            key2: ['four']
        };
        const target = {
            key1: ['one', 'two']
        };
        const expected = {
            key1: ['one', 'two', 'three'],
            key2: ['four']
        };

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should work on array of objects', () => {
        const src = [
            { key1: ['one', 'three'], key2: ['one'] },
            { key3: ['five'] }
        ];
        const target = [
            { key1: ['one', 'two'] },
            { key3: ['four'] }
        ];
        const expected = [
            { key1: ['one', 'two', 'three'], key2: ['one'] },
            { key3: ['four', 'five'] }
        ];

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    });

    it('should should work on arrays of nested objects', () => {
        const target = [
            { key1: { subkey: 'one' } }
        ];
        const src = [
            { key1: { subkey: 'two' } },
            { key2: { subkey: 'three' } }
        ];
        const expected = [
            { key1: { subkey: 'two' } },
            { key2: { subkey: 'three' } }
        ];

        expect($.extendext(true, 'extend', target, src)).toEqual(expected);
    })

});
