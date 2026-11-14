import sys
from pathlib import Path

# Ensure project root is in sys.path so 'backend.xxx' imports work regardless of execution directory
_ROOT_DIR = Path(__file__).resolve().parent.parent
_BACKEND_DIR = Path(__file__).resolve().parent
for _p in [str(_ROOT_DIR), str(_BACKEND_DIR)]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config.settings import get_settings
from backend.exceptions.handlers import register_exception_handlers
from backend.controllers.health_controller import router as health_router
from backend.controllers.target_controller import router as target_router
from backend.controllers.audit_controller import router as audit_router
from backend.controllers.defense_controller import router as defense_router
from backend.controllers.proxy_controller import router as proxy_router
from backend.controllers.ledger_controller import router as ledger_router
from backend.controllers.pipeline_controller import router as pipeline_router
from backend.controllers.connector_controller import router as connector_router

settings = get_settings()

app = FastAPI(
    title="AEGISX Security Platform API",
    description="Autonomous AI Red-Teamer, RAG Threat Intel & Real-Time Defense Shield API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Open CORS configuration for smooth frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register domain-specific custom exception handlers
register_exception_handlers(app)

# Include API Controllers (all /api/v1 prefix built into routers)
app.include_router(target_router)
app.include_router(audit_router)
app.include_router(defense_router)
app.include_router(proxy_router)
app.include_router(ledger_router)
app.include_router(pipeline_router)
app.include_router(connector_router)

# Health router at /api/health and /health
app.include_router(health_router, prefix="/api")
app.include_router(health_router)


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "status": "online",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
