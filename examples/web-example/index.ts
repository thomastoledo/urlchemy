import { objectToQueryString, queryStringToObject } from "urlchemy";

const obj = { user: { id: 1, name: "Jane Doe" }, active: false, roles: ["editor"] };

// Convert object to query string
const queryString = objectToQueryString(obj, { prefix: true });
console.log("Generated Query String:", queryString);

// Parse back into an object
const parsedObject = queryStringToObject(queryString);
console.log("Parsed Object:", parsedObject);
