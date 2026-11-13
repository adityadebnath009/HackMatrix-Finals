from typing import Any, Dict, Optional


class BaseAppException(Exception):
    """Base application exception for all domain-specific errors."""
    def __init__(
        self,
        message: str,
        status_code: int = 500,
        error_code: str = "INTERNAL_SERVER_ERROR",
        details: Optional[Dict[str, Any]] = None
    ):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}


class ResourceNotFoundException(BaseAppException):
    """Raised when an entity or resource is not found in database/repository."""
    def __init__(self, resource_name: str, identifier: Any):
        super().__init__(
            message=f"{resource_name} with identifier '{identifier}' was not found.",
            status_code=404,
            error_code="RESOURCE_NOT_FOUND",
            details={"resource": resource_name, "identifier": str(identifier)}
        )


class ResourceAlreadyExistsException(BaseAppException):
    """Raised when an entity already exists (unique constraint violation)."""
    def __init__(self, resource_name: str, field: str, value: Any):
        super().__init__(
            message=f"{resource_name} with {field} '{value}' already exists.",
            status_code=409,
            error_code="RESOURCE_ALREADY_EXISTS",
            details={"resource": resource_name, "field": field, "value": str(value)}
        )


class ValidationException(BaseAppException):
    """Raised for business logic validation failures."""
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            status_code=422,
            error_code="VALIDATION_ERROR",
            details=details
        )


class UnauthorizedException(BaseAppException):
    """Raised when client is unauthenticated."""
    def __init__(self, message: str = "Authentication credentials were invalid or missing."):
        super().__init__(
            message=message,
            status_code=401,
            error_code="UNAUTHORIZED"
        )


class ForbiddenException(BaseAppException):
    """Raised when client lacks permissions."""
    def __init__(self, message: str = "Access to the requested resource is forbidden."):
        super().__init__(
            message=message,
            status_code=403,
            error_code="FORBIDDEN"
        )


class DatabaseOperationException(BaseAppException):
    """Raised when an unexpected database transaction or query error occurs."""
    def __init__(self, operation: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=f"Failed to execute database operation: {operation}",
            status_code=500,
            error_code="DATABASE_OPERATION_FAILED",
            details=details
        )


class ExternalServiceException(BaseAppException):
    """Raised when an external API (LLM, Groq, Gemini, Neon) fails or times out."""
    def __init__(self, service_name: str, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=f"External service '{service_name}' failed: {message}",
            status_code=502,
            error_code="EXTERNAL_SERVICE_FAILURE",
            details=details
        )


class WorkflowExecutionException(BaseAppException):
    """Raised when a multi-step flow or pipeline fails."""
    def __init__(self, flow_name: str, step: str, reason: str):
        super().__init__(
            message=f"Flow '{flow_name}' failed at step '{step}': {reason}",
            status_code=500,
            error_code="WORKFLOW_EXECUTION_ERROR",
            details={"flow": flow_name, "step": step, "reason": reason}
        )
