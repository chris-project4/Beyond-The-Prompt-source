import Database from 'better-sqlite3';

// Lazily opened. The issues table does not exist yet: adding it is the first
// task in specs/create-and-list-issues/tasks.md.
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  db = new Database(process.env.ISSUE_TRACKER_DB ?? 'issue-tracker.db');
  db.pragma('journal_mode = WAL');
  // TODO: create the `issues` table here, per the spec.
  return db;
}
