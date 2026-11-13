import logging
from typing import Any, Dict


class BaseService:
    """Base service class encapsulating business logic rules."""

    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)

    def log_action(self, action: str, metadata: Dict[str, Any] = None):
        self.logger.info(f"[{self.__class__.__name__}] {action} | meta={metadata or {}}")
