"""House error type. The API layer renders every AppError as
{ "error": { "code", "message" } }. Never return a bare string error."""
from fastapi import Request
from fastapi.responses import JSONResponse


class AppError(Exception):
    code = "error"
    status_code = 400

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class NotFoundError(AppError):
    code = "not_found"
    status_code = 404


class ValidationError(AppError):
    code = "validation_error"
    status_code = 422


class PermissionError(AppError):
    code = "forbidden"
    status_code = 403


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": exc.code, "message": exc.message}},
    )
