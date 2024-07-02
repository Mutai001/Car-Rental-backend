import { Drizzle, SQLite3Connector } from '@drizzle-orm/core';

const connector = new SQLite3Connector({
  filePath: './data/book-repository.db',
});

const drizzle = new Drizzle(connector);

export default drizzle;
