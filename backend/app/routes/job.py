from fastapi import APIRouter
from app.schemas.job_schema import JobDescription
from app.services.job_matcher import match_resume_with_job

router = APIRouter(
    prefix="/job",
    tags=["Job Matching"]
)


@router.post("/match")
async def job_match(data: JobDescription):

    return match_resume_with_job(
        data.resume_text,
        data.job_description
    )