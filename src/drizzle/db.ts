// import "dotenv/config";
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from './schema';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema, logger: true });


import "dotenv/config";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';

const databaseUrl = process.env.Database_URL as string;
if (!databaseUrl) throw new Error("Database_URL is not set");

const sql = neon(databaseUrl);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema, logger: true });

