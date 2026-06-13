import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  // TODO: build the issues feature per specs/create-and-list-issues/ and mount
  // it here:  app.use('/api/issues', issuesRouter);
  // Add the central AppError handler (see errors.ts) once routes can throw.

  return app;
}
