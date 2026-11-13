import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from backend.exceptions.custom_exceptions import BaseAppException

logger = logging.getLogger("hackmatrix.exceptions")


def register_exception_handlers(app: FastAPI) -> None:
    """Registers domain-specific custom exception handlers to the FastAPI application."""

    @app.exception_handler(BaseAppException)
    async def app_exception_handler(request: Request, exc: BaseAppException) -> JSONResponse:
        logger.error(f"[{exc.error_code}] {request.method} {request.url.path} -> {exc.message}")
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "details": exc.details
                }
            }
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        logger.exception(f"Unhandled exception at {request.method} {request.url.path}: {str(exc)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_UNEXPECTED_ERROR",
                    "message": "An unexpected server error occurred.",
                    "details": {"type": exc.__class__.__name__, "info": str(exc)}
                }
            }
        )
