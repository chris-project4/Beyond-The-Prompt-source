import express, { NextFunction, Request, Response } from 'express';
import { issuesRouter } from './issues/issue.routes';
import { AppError } from './errors';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/issues', issuesRouter);

  // Central error handler: AppError becomes its status, anything else is a 500.
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.status).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  });

  return app;
}
