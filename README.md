### **README for URLchemy**

---

# **URLchemy**

**URLchemy** is a lightweight and flexible utility library for working with query strings in JavaScript and TypeScript. It provides:
- **Object to Query String Conversion**: Convert JavaScript objects into URL-safe query strings.
- **Query String to Object Parsing**: Parse query strings back into JavaScript objects.
- Support for **arrays**, **nested objects**, and **advanced options** for encoding, sorting, and strict formatting.

---

## **Features**

- 🔄 **Bidirectional conversion**: Easily switch between objects and query strings.
- 🧩 **Nested structures**: Works with arrays and deeply nested objects.
- 🎛 **Configurable**: Customize the encoding, sorting, and formatting of query strings.
- 🌐 **URL-safe**: Automatically encodes keys and values for safe use in URLs.

---

## **Installation**

Install URLchemy using **npm** or **yarn**:

```bash
npm install urlchemy
```

---

## **Usage**

### **1. Convert an object to a query string**
```typescript
import { objectToQueryString } from 'urlchemy';

const params = {
  user: {
    id: 123,
    name: 'John Doe',
  },
  tags: ['developer', 'programmer'],
};

const queryString = objectToQueryString(params, { encode: true });
console.log(queryString);
// Output: user%5Bid%5D=123&user%5Bname%5D=John%20Doe&tags=developer&tags=programmer
```

### **2. Parse a query string into an object**
```typescript
import { queryStringToObject } from 'urlchemy';

const query = '?user%5Bid%5D=123&user%5Bname%5D=John%20Doe&tags=developer&tags=programmer';
const parsedObject = queryStringToObject(query);

console.log(parsedObject);
// Output: { user: { id: '123', name: 'John Doe' }, tags: ['developer', 'programmer'] }
```

### **3. Add advanced options**
```typescript
const params = {
  user: {
    id: 123,
    name: 'John Doe',
  },
  tags: ['developer', 'programmer'],
  active: true,
  date: new Date('2023-01-01'),
};

const queryString = objectToQueryString(params, {
  encode: true,
  strict: true,
  prefix: true,
  excludeNulls: true,
  sort: true,
});

console.log(queryString);
// Output: ?active=true&date=2023-01-01T00%3A00%3A00.000Z&tags=developer&tags=programmer&user.id=123&user.name=John%20Doe
```

---

## **API**

### **`objectToQueryString(params, options?)`**
Converts a JavaScript object to a query string.

- **`params`** *(Record<string, any>)*: The object to convert.
- **`options`** *(StringifyOptions)* *(optional)*:
  - `encode` *(boolean)*: Encode keys and values (default: `true`).
  - `sort` *(boolean)*: Sort keys alphabetically (default: `false`).
  - `strict` *(boolean)*: Use dot notation for nested keys (default: `false`).
  - `prefix` *(boolean)*: Add a `?` prefix to the string (default: `false`).
  - `excludeNulls` *(boolean)*: Exclude `null` or `undefined` values (default: `false`).

---

### **`queryStringToObject(query)`**
Parses a query string into a JavaScript object.

- **`query`** *(string)*: The query string to parse (e.g., `?key=value&arr=1&arr=2`).

---

## **Advanced Examples**

### **Handle arrays and nested objects**
```typescript
const params = {
  filters: {
    category: 'books',
    price: {
      min: 10,
      max: 50,
    },
  },
  tags: ['fiction', 'mystery'],
};

const queryString = objectToQueryString(params, {encode: false});
console.log(queryString);
// Output: filters[category]=books&filters[price][min]=10&filters[price][max]=50&tags=fiction&tags=mystery
```

---

### **Decode complex query strings**
```typescript
const query = '?filters[category]=books&filters[price][min]=10&filters[price][max]=50&tags=fiction&tags=mystery';
const parsedObject = queryStringToObject(query);

console.log(parsedObject);
// Output:
// {
//   filters: {
//     category: 'books',
//     price: { min: '10', max: '50' },
//   },
//   tags: ['fiction', 'mystery'],
// }
```

---

## **Roadmap**

### **Ideas for Future Features**
1. **Custom serializers**: Allow users to define how specific types (e.g., Dates) should be serialized.
2. **Type-safe parsing**: Infer and maintain type safety when converting query strings back to objects.
3. **Enhanced array support**: Add options for serializing arrays as comma-separated values (`tags=fiction,mystery`).
4. **Internationalization**: Improved handling for non-UTF-8 character encodings.
5. **Integration with TimePulse**: Add support for time-sensitive URL queries using [TimePulse](https://github.com/thomastoledo/timepulse).

---

## **Contributing**

Contributions are welcome! Feel free to submit **issues** or **pull requests** if you have ideas or encounter bugs.

---

## **License**

URLchemy is licensed under the MIT License. 🌐✨
