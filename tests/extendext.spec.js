const $ = require('jquery');
require('../jquery-extendext');

describe('extendext new modes', () => {
    it('should extend arrays', () => {
        const a = {
            foo  : { bar: 3 },
            array: [{ does: 'work', too: [1, 2, 3] }]
        };
        const b = {
            foo  : { baz: 4 },
            quux : 5,
            array: [{ does: 'work', too: [4, 5, 6] }, { really: 'yes' }]
        };
        const o = {
            foo  : { bar: 3, baz: 4 },
            array: [{ does: 'work', too: [1, 2, 3, 4, 5, 6] }, { really: 'yes' }],
            quux : 5
        };

        expect($.extendext(true, 'extend', a, b)).toEqual(o);
    });

    it('should concat arrays', () => {
        const a = {
            foo  : { bar: 3 },
            array: [1, 2, 4]
        };
        const b = {
            foo  : { baz: 4 },
            array: [1, 4, 5]
        };
        const o = {
            foo  : { bar: 3, baz: 4 },
            array: [1, 2, 4, 1, 4, 5]
        };

        expect($.extendext(true, 'concat', a, b)).toEqual(o);
    });

    it('should replace arrays', () => {
        const a = {
            foo  : { bar: 3 },
            array: [1, 2, 4]
        };
        const b = {
            foo  : { baz: 4 },
            array: [4, 5]
        };
        const o = {
            foo  : { bar: 3, baz: 4 },
            array: [4, 5]
        };

        expect($.extendext(true, 'replace', a, b)).toEqual(o);
    });
});

