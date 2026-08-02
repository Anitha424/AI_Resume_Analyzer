import os
import shutil

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.services.resume_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills
from app.services.ats_score import calculate_ats_score
from app.services.job_matcher import (
    recommend_jobs,
    match_resume_with_job,
)
from app.services.analysis import analyze_resume
from app.services.llm_service import (
    analyze_resume_ai,
    analyze_job_match_ai,
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ---------------------------------------
# Request Model
# ---------------------------------------
class JobMatchRequest(BaseModel):
    job_description: str


# ---------------------------------------
# Upload Resume
# ---------------------------------------
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract Resume Text
    extracted_text = extract_text_from_pdf(file_path)

    # Skills
    skills = extract_skills(extracted_text)

    # ATS
    ats_score, suggestions = calculate_ats_score(
        extracted_text,
        skills
    )

    # Job Recommendation
    job_matches = recommend_jobs(skills)

    # Rule-Based Analysis
    analysis = analyze_resume(
        extracted_text,
        skills
    )

    # AI Analysis
    ai_analysis = analyze_resume_ai(
        extracted_text
    )

    return {
        "message": "Resume Uploaded Successfully",
        "filename": file.filename,
        "skills": skills,
        "ats_score": ats_score,
        "suggestions": suggestions,
        "job_matches": job_matches,
        "resume_quality": analysis["resume_quality"],
        "strengths": analysis["strengths"],
        "weaknesses": analysis["weaknesses"],
        "analysis_suggestions": analysis["analysis_suggestions"],
        "ai_analysis": ai_analysis,
    }


# ---------------------------------------
# Resume vs Job Description
# ---------------------------------------
@router.post("/job-match")
async def job_match(request: JobMatchRequest):

    files = os.listdir(UPLOAD_FOLDER)

    if len(files) == 0:
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "ai_feedback": "Please upload a resume first."
        }

    latest_resume = os.path.join(
        UPLOAD_FOLDER,
        files[-1]
    )

    resume_text = extract_text_from_pdf(
        latest_resume
    )

    result = match_resume_with_job(
        resume_text,
        request.job_description
    )

    # AI Analysis
    ai_feedback = analyze_job_match_ai(
        resume_text,
        request.job_description
    )

    result["ai_feedback"] = ai_feedback

    return result