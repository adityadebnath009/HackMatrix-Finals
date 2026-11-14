from abc import ABC, abstractmethod
from typing import Any
import logging
from backend.exceptions.custom_exceptions import WorkflowExecutionException


class BaseFlow(ABC):
    """Abstract base class for multi-step agent flows and execution pipelines."""

    def __init__(self, name: str):
        self.name = name
        self.logger = logging.getLogger(f"flow.{name}")

    @abstractmethod
    async def execute(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Execute the flow steps end-to-end."""
        pass

    def fail_step(self, step_name: str, reason: str):
        self.logger.error(f"Step '{step_name}' failed: {reason}")
        raise WorkflowExecutionException(flow_name=self.name, step=step_name, reason=reason)
