import * as schema from "./schema";
import { drizzle } from "drizzle-orm/d1";

export function getDB(env: any) {
  if (!env.DB) {
    throw new Error(
      "D1 database binding 'DB' is missing in environment variables."
    );
  }
  return drizzle(env.DB, { schema: schema });
}

export default schema;
