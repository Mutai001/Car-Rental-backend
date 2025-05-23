"use strict";
// import "dotenv/config";
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from './schema';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema, logger: true });
require("dotenv/config");
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const schema = __importStar(require("./schema"));
const databaseUrl = process.env.Database_URL;
if (!databaseUrl)
    throw new Error("Database_URL is not set");
const sql = (0, serverless_1.neon)(databaseUrl);
exports.db = (0, neon_http_1.drizzle)(sql, { schema, logger: true });
