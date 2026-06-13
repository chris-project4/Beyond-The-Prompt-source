// Every expected HTTP failure is thrown as an AppError. The central error
// handler in app.ts turns it into a JSON response. Routes and services never
// write error responses by hand.
export class AppError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export const badRequest = (message: string) => new AppError(400, message);
export const notFound = (message = 'Not found') => new AppError(404, message);
