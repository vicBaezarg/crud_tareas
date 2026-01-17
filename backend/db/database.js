const Database = require("better-sqlite3");
const db = new Database("db/database.db");

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL
  )
`).run();

module.exports = db;
