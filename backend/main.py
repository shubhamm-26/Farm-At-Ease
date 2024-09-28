# app/main.py
from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.config import load_config

app = FastAPI()
load_config()

app.include_router(auth_router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    