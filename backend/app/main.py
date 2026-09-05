from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.job import router as job_router

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

# -------------------------------
# CORS Configuration
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Include Routers
# -------------------------------
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(job_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Resume Analyzer API 🚀"
    }