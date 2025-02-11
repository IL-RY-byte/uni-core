import { eq, gte, lt, ne } from "drizzle-orm";
import * as schema from "./schema";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

export type UnicoreDB = DrizzleD1Database<typeof schema>;

export function getDB(env: any): UnicoreDB {
  if (!env.DB) {
    throw new Error(
      "D1 database binding 'DB' is missing in environment variables."
    );
  }
  return drizzle(env.DB, { schema: schema });
}

export { eq, lt, gte, ne };

export default schema;
