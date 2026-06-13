import { getDb } from '../db';
import { Issue } from '../types';

interface Row {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: string | null;
  created_at: string;
}

// snake_case in the database, camelCase in TypeScript. The mapping lives here
// and nowhere else.
const toIssue = (r: Row): Issue => ({
  id: r.id,
  title: r.title,
  description: r.description,
  status: r.status as Issue['status'],
  assignee: r.assignee,
  createdAt: r.created_at,
});

export const issueRepository = {
  create(title: string, description: string): Issue {
    const info = getDb()
      .prepare('INSERT INTO issues (title, description) VALUES (?, ?)')
      .run(title, description);
    return this.findById(Number(info.lastInsertRowid))!;
  },

  list(): Issue[] {
    const rows = getDb()
      .prepare('SELECT * FROM issues ORDER BY created_at DESC, id DESC')
      .all() as Row[];
    return rows.map(toIssue);
  },

  findById(id: number): Issue | null {
    const row = getDb().prepare('SELECT * FROM issues WHERE id = ?').get(id) as Row | undefined;
    return row ? toIssue(row) : null;
  },

  assign(id: number, assignee: string): Issue | null {
    const res = getDb().prepare('UPDATE issues SET assignee = ? WHERE id = ?').run(assignee, id);
    if (res.changes === 0) return null;
    return this.findById(id);
  },
};
