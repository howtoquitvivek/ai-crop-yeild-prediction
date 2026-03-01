from fastapi import FastAPI
from app.api import health, predict
from app.config import settings

app = FastAPI(
    title="AICYP ML Service",
    version=settings.API_VERSION
)

app.include_router(health.router, prefix="/api/v1")
app.include_router(predict.router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )