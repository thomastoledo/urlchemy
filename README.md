# Urlchemy

**urlchemy** is a lightweight and powerful library for converting objects into query strings and vice versa. With support for nested objects, arrays, and custom serialization options, **urlchemy** turns your URL manipulation into pure alchemy!

## Features

- ✨ **Bidirectional Conversion**: Convert objects to query strings and query strings to objects.  
- 🛠 **Nested Object Support**: Handles arrays and deeply nested structures.  
- 🎛 **Custom Serialization**: Choose how arrays, booleans, and `null` values are handled.  
- ⚡ **Lightweight and Fast**: Built for performance and simplicity.  
- 🔄 **Boolean Parsing**: Automatically interpret `"true"` and `"false"` as booleans.  

---

## Installation

Install **urlchemy** via `npm` or `yarn`:

```bash
npm install urlchemy
```

Or:

```bash
yarn add urlchemy
```

---

## Usage

### Import the library

```typescript
import { toQueryString, parseQueryString } from 'urlchemy';
```

---

### Examples

#### **1. Convert an Object to a Query String**

```typescript
import { toQueryString } from 'urlchemy';

const params = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'coding'],
  preferences: {
    theme: 'dark',
    notifications: true,
  },
  empty: null,
};

const options = {
  arrayFormat: 'comma', // Arrays will be serialized as comma-separated values
  booleanFormat: 'numeric', // Booleans will be serialized as 1/0
  nullFormat: 'omit', // Null values will be omitted
};

console.log(toQueryString(params, options));
// Output: "name=Alice&age=25&hobbies=reading,coding&preferences[theme]=dark&preferences[notifications]=1"
```

---

#### **2. Parse a Query String into an Object**

```typescript
import { parseQueryString } from 'urlchemy';

const query = "?name=Alice&active=true&age=25&hobbies[]=reading&hobbies[]=coding";

const result = parseQueryString(query, true);

console.log(result);
// Output:
// {
//   name: "Alice",
//   active: true,
//   age: "25",
//   hobbies: ["reading", "coding"]
// }
```

---

### API Reference

#### **`toQueryString(params: Record<string, any>, options?: QueryStringifyOptions): string`**

Converts an object into a query string.

- **`params`**: The object to convert.  
- **`options`**:  
  - **`arrayFormat`**: Determines how arrays are serialized. Options:  
    - `'brackets'` (default): `key[]=value1&key[]=value2`.  
    - `'indices'`: `key[0]=value1&key[1]=value2`.  
    - `'comma'`: `key=value1,value2`.  
  - **`booleanFormat`**: Determines how booleans are serialized. Options:  
    - `'string'` (default): `true`/`false`.  
    - `'numeric'`: `1`/`0`.  
  - **`nullFormat`**: Determines how `null` values are serialized. Options:  
    - `'string'` (default): `key=`.  
    - `'omit'`: Excludes `null` values from the query string.  

#### **`parseQueryString<T = Record<string, any>>(query: string, parseBooleans?: boolean): T`**

Parses a query string into an object.

- **`query`**: The query string to parse.  
- **`parseBooleans`**: If `true`, converts `"true"`/`"false"` into `true`/`false`. Default: `false`.  

---

### Examples of Options

#### **1. Array Formats**

```typescript
const params = { tags: ['js', 'ts', 'html'] };

console.log(toQueryString(params, { arrayFormat: 'brackets' }));
// Output: "tags[]=js&tags[]=ts&tags[]=html"

console.log(toQueryString(params, { arrayFormat: 'indices' }));
// Output: "tags[0]=js&tags[1]=ts&tags[2]=html"

console.log(toQueryString(params, { arrayFormat: 'comma' }));
// Output: "tags=js,ts,html"
```

#### **2. Boolean Formats**

```typescript
const params = { isAdmin: true, isGuest: false };

console.log(toQueryString(params, { booleanFormat: 'string' }));
// Output: "isAdmin=true&isGuest=false"

console.log(toQueryString(params, { booleanFormat: 'numeric' }));
// Output: "isAdmin=1&isGuest=0"
```

#### **3. Null Formats**

```typescript
const params = { name: 'Alice', age: null };

console.log(toQueryString(params, { nullFormat: 'string' }));
// Output: "name=Alice&age="

console.log(toQueryString(params, { nullFormat: 'omit' }));
// Output: "name=Alice"
```

---

## License

MIT

---

## Contributing

Contributions are welcome! If you spot an issue or have an idea for improvement, feel free to open an issue or submit a pull request. 😊
