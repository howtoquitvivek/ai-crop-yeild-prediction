from fastapi import FastAPI
from app.api.predict import router as predict_router
from app.api.recommend import router as recommend_router
from app.api.health import router as health_router

app = FastAPI()

app.include_router(predict_router)
app.include_router(recommend_router)
app.include_router(health_router)