from datetime import datetime
from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class BaseResponse(BaseModel, Generic[T]):
    """Standardized API response wrapper matching frontend contracts."""
    success: bool = True
    message: str = "Operation completed successfully."
    data: T | None = None


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: dict[str, Any] | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail


class HealthData(BaseModel):
    status: str
    app: str
    environment: str
    database: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
