from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PredictionRequest(BaseModel):
    farmId: str

class PredictionResponse(BaseModel):
    predictedYield: float
    confidence: float
    modelVersion: str

@router.post("/predictions/generate", response_model=PredictionResponse)
def generate_prediction(request: PredictionRequest):
    return PredictionResponse(
        predictedYield=42.5,
        confidence=0.87,
        modelVersion="v1.0.0"
    )