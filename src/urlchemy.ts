interface StringifyOptions {
  encode?: boolean; // Encode keys and values (default: true)
  sort?: boolean; // Sort keys alphabetically (default: false)
  strict?: boolean; // Use dot notation for nested keys (default: false)
  prefix?: boolean; // Add '?' at the beginning of the string (default: false)
  excludeNulls?: boolean; // Exclude null/undefined keys (default: false)
}

/**
 * Converts an object to a query string with advanced options.
 * Supports arrays, nested objects, and custom formatting.
 * @param params - The object to convert.
 * @param options - Options to customize the query string generation.
 * @returns The generated query string.
 */
export function objectToQueryString(params: Record<string, any>, options: StringifyOptions = {}): string {
  const {
    encode = true, // Default to encoding keys and values
    sort = false, // Default to no sorting of keys
    strict = false, // Default to bracket notation for nested keys
    prefix = false, // Default to no '?' prefix
    excludeNulls = false, // Default to including null/undefined values
  } = options;

  /**
   * Builds the query string for a single key-value pair.
   * Supports nested objects, arrays, and primitive types.
   * @param key - The key to encode.
   * @param value - The value associated with the key.
   * @returns The encoded query string for the key-value pair.
   */
  const buildQuery = (key: string, value: any): string => {
    if (excludeNulls && (value === null || value === undefined)) return '';

    // Handle special types
    if (value instanceof Date) {
      value = value.toISOString(); // Convert Date to ISO string
    } else if (typeof value === 'boolean') {
      value = value ? 'true' : 'false'; // Convert boolean to string
    }

    // Handle nested objects
    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedKeys = Object.entries(value)
        .map(([nestedKey, nestedValue]) =>
          buildQuery(strict ? `${key}.${nestedKey}` : `${key}[${nestedKey}]`, nestedValue)
        )
        .filter(Boolean)
        .join('&');
      return nestedKeys;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value
        .map((item) => buildQuery(key, item))
        .filter(Boolean)
        .join('&');
    }

    // Handle primitive values
    const encodedKey = encode ? encodeURIComponent(key) : key;
    const encodedValue = encode ? encodeURIComponent(value) : value;
    return `${encodedKey}=${encodedValue}`;
  };

  // Generate the query string
  let queryString = Object.entries(params)
    .map(([key, value]) => buildQuery(key, value))
    .filter(Boolean)
    .join('&');

  // Optionally sort the keys
  if (sort) {
    queryString = queryString
      .split('&')
      .sort()
      .join('&');
  }

  // Add the '?' prefix if required
  return prefix && queryString ? `?${queryString}` : queryString;
}

/**
 * Parses a query string into an object.
 * Supports nested keys and arrays.
 * @param query - The query string to parse.
 * @returns The parsed object.
 */
export function queryStringToObject(query: string): Record<string, any> {
  const result: Record<string, any> = {};
  const pairs = query.replace(/^\?/, '').split('&'); // Remove leading '?' and split by '&'

  pairs.forEach((pair) => {
    const [rawKey, rawValue] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const value = rawValue ? decodeURIComponent(rawValue) : null;

    // Handle nested keys (dot notation)
    if (key.includes('.')) {
      const keys = key.split('.');
      let current = result;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          current[k] = value; // Assign value at the deepest level
        } else {
          current[k] = current[k] || {}; // Ensure object exists for the next level
          current = current[k];
        }
      });
    }
    // Handle nested keys (bracket notation)
    else if (key.includes('[')) {
      const keys = key.match(/[^\[\]]+/g); // Extract nested keys from brackets
      if (!keys) return;

      let current = result;
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          // Handle arrays
          if (Array.isArray(current[k])) {
            current[k].push(value);
          } else if (current[k]) {
            current[k] = [current[k], value]; // Convert to array if multiple values exist
          } else {
            current[k] = value;
          }
        } else {
          current[k] = current[k] || {}; // Ensure object exists for the next level
          current = current[k];
        }
      }
    }
    // Handle simple keys
    else {
      if (result[key]) {
        if (Array.isArray(result[key])) {
          result[key].push(value); // Add to existing array
        } else {
          result[key] = [result[key], value]; // Convert to array if multiple values exist
        }
      } else {
        result[key] = value; // Assign value directly
      }
    }
  });

  return result;
}
