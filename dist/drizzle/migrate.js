"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const db_1 = require("./db");
async function migration() {
    console.log('======== Migrations started ========');
    try {
        await (0, migrator_1.migrate)(db_1.db, {
            migrationsFolder: __dirname + "/migrations"
        });
        console.log('======== Migrations completed ========');
    }
    catch (err) {
        const error = err;
        console.error('Migration error:', error.message);
    }
    finally {
        process.exit(0);
    }
}
migration().catch((err) => {
    const error = err;
    console.error('Migration error:', error.message);
    process.exit(1);
});
