from typing import TypeVar, Generic, Type, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from backend.models.base import Base
from backend.exceptions.custom_exceptions import DatabaseOperationException, ResourceNotFoundException

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Generic async repository providing standard CRUD operations for Postgres."""

    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def get_by_id(self, id: Any) -> ModelType | None:
        try:
            result = await self.session.execute(select(self.model).where(self.model.id == id))
            return result.scalar_one_or_none()
        except Exception as e:
            raise DatabaseOperationException(f"get_by_id on {self.model.__name__}", {"id": str(id), "error": str(e)})

    async def get_by_id_or_fail(self, id: Any) -> ModelType:
        entity = await self.get_by_id(id)
        if not entity:
            raise ResourceNotFoundException(self.model.__name__, id)
        return entity

    async def list_all(self, limit: int = 100, offset: int = 0) -> list[ModelType]:
        try:
            result = await self.session.execute(select(self.model).limit(limit).offset(offset))
            return list(result.scalars().all())
        except Exception as e:
            raise DatabaseOperationException(f"list_all on {self.model.__name__}", {"error": str(e)})

    async def create(self, **kwargs) -> ModelType:
        try:
            instance = self.model(**kwargs)
            self.session.add(instance)
            await self.session.flush()
            await self.session.refresh(instance)
            return instance
        except Exception as e:
            raise DatabaseOperationException(f"create on {self.model.__name__}", {"error": str(e)})

    async def delete(self, id: Any) -> bool:
        entity = await self.get_by_id_or_fail(id)
        try:
            await self.session.delete(entity)
            await self.session.flush()
            return True
        except Exception as e:
            raise DatabaseOperationException(f"delete on {self.model.__name__}", {"id": str(id), "error": str(e)})
