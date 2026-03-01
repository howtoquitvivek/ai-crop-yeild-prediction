import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME = "AICYP ML Service"
    API_VERSION = "v1"
    HOST = os.getenv("ML_HOST", "0.0.0.0")
    PORT = int(os.getenv("ML_PORT", 8000))

settings = Settings()