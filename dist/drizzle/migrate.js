"use strict";
// import 'dotenv/config';
// import { migrate } from 'drizzle-orm/node-postgres/migrator';
// import { db } from './db';
Object.defineProperty(exports, "__esModule", { value: true });
// async function migration() {
//   console.log('======== Migrations started ========');
//   try {
//     await migrate(db, {
//         migrationsFolder: __dirname + "/migrations"
//       });
//     console.log('======== Migrations completed ========');
//   } catch (err) {
//     const error = err as Error;
//     console.error('Migration error:', error.message);
//   } finally {
//     process.exit(0);
//   }
// }
// migration().catch((err) => {
//   const error = err as Error;
//   console.error('Migration error:', error.message);
//   process.exit(1);
// });
const migrator_1 = require("drizzle-orm/neon-http/migrator");
const db_1 = require("./db");
async function migration() {
    try {
        console.log("======Migration Started ======");
        await (0, migrator_1.migrate)(db_1.db, {
            migrationsFolder: __dirname + "/migrations"
        });
        console.log("======Migration Ended======");
        process.exit(0);
    }
    catch (error) {
        console.error("Migration failed with error: ", error);
        process.exit(1);
    }
}
migration().catch((e) => {
    console.error("Unexpected error during migration:", e);
    process.exit(1);
});
