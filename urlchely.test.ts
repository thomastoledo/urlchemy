import { objectToQueryString, queryStringToObject } from './urlchemy';

describe('query-stringify', () => {
    describe('stringify', () => {
        test('converts a flat object to a query string', () => {
            const obj = { key: 'value', foo: 'bar' };
            expect(objectToQueryString(obj)).toBe('key=value&foo=bar');
        });

        test('handles arrays correctly', () => {
            const obj = { tags: ['a', 'b'] };
            expect(objectToQueryString(obj)).toBe('tags=a&tags=b');
        });

        test('handles nested objects with bracket notation', () => {
            const obj = { user: { id: 1, name: 'John' } };
            expect(objectToQueryString(obj, { encode: false })).toBe('user[id]=1&user[name]=John');
        });


        test('handles nested objects with dot notation (strict)', () => {
            const obj = { user: { id: 1, name: 'John' } };
            expect(objectToQueryString(obj, { strict: true })).toBe('user.id=1&user.name=John');
        });

        test('encodes keys and values by default', () => {
            const obj = { key: 'hello world' };
            expect(objectToQueryString(obj)).toBe('key=hello%20world');
        });

        test('excludes null/undefined values when excludeNulls is true', () => {
            const obj = { key: null, foo: 'bar' };
            expect(objectToQueryString(obj, { excludeNulls: true })).toBe('foo=bar');
        });

        test('adds a "?" prefix when prefix is true', () => {
            const obj = { key: 'value' };
            expect(objectToQueryString(obj, { prefix: true })).toBe('?key=value');
        });
    });

    describe('parse', () => {
        test('parses a flat query string into an object', () => {
            const query = 'key=value&foo=bar';
            expect(queryStringToObject(query)).toEqual({ key: 'value', foo: 'bar' });
        });

        test('handles arrays in the query string', () => {
            const query = 'tags=a&tags=b';
            expect(queryStringToObject(query)).toEqual({ tags: ['a', 'b'] });
        });

        test('handles nested objects with bracket notation', () => {
            const query = 'user[id]=1&user[name]=John';
            expect(queryStringToObject(query)).toEqual({ user: { id: '1', name: 'John' } });
        });

        test('handles nested objects with dot notation', () => {
            const query = 'user.id=1&user.name=John';
            expect(queryStringToObject(query)).toEqual({ user: { id: '1', name: 'John' } });
        });

        test('decodes encoded keys and values', () => {
            const query = 'key=hello%20world';
            expect(queryStringToObject(query)).toEqual({ key: 'hello world' });
        });
    });
});
