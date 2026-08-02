from pydantic import BaseModel


class JobDescription(BaseModel):
    resume_text: str
    job_description: str