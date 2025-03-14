"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlchemy_1 = require("urlchemy");
const obj = { user: { id: 1, name: "John Doe" }, active: true, roles: ["admin", "editor"] };
// Convert object to query string
const queryString = (0, urlchemy_1.objectToQueryString)(obj, { prefix: true });
console.log("Generated Query String:", queryString);
// Parse back into an object
const parsedObject = (0, urlchemy_1.queryStringToObject)(queryString);
console.log("Parsed Object:", parsedObject);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbnVnZXRjaGFyL0RvY3VtZW50cy91dGlscy91cmxjaGVteS9leGFtcGxlcy9ub2RlLWV4YW1wbGUvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRTtBQUVwRSxNQUFNLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFFNUYsaUNBQWlDO0FBQ2pDLE1BQU0sV0FBVyxHQUFHLElBQUEsOEJBQW1CLEVBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUVwRCw0QkFBNEI7QUFDNUIsTUFBTSxZQUFZLEdBQUcsSUFBQSw4QkFBbUIsRUFBQyxXQUFXLENBQUMsQ0FBQztBQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDIn0=