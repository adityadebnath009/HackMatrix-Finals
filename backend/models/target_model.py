from sqlalchemy import String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column
from backend.models.base import Base


class TargetAgentModel(Base):
    """Target agent configurations persisted in Neon PostgreSQL."""
    __tablename__ = "target_agents"

    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    domain: Mapped[str] = mapped_column(String(64), nullable=False, default="Custom")
    description: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    system_prompt: Mapped[str] = mapped_column(Text, nullable=False)
    mock_sensitive_data: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)

    def __repr__(self) -> str:
        return f"<TargetAgentModel(slug='{self.slug}', name='{self.name}')>"
