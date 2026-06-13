import Database from 'better-sqlite3';

// Lazily opened so tests can point ISSUE_TRACKER_DB at an in-memory database
// before the first query runs.
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  db = new Database(process.env.ISSUE_TRACKER_DB ?? 'issue-tracker.db');
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'open',
      assignee TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}
