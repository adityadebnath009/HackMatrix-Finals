import logging
from typing import Any


class BaseService:
    """Base service class encapsulating business logic rules."""

    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)

    def log_action(self, action: str, metadata: dict[str, Any] | None = None):
        self.logger.info(f"[{self.__class__.__name__}] {action} | meta={metadata or {}}")
