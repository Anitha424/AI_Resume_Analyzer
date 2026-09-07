from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=api_key)


def generate_ai(prompt: str):

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text


def analyze_resume_ai(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the following resume.

Return ONLY in this format.

Resume Summary:
...

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...

Interview Questions:
- ...

Resume:

{resume_text}
"""

    return generate_ai(prompt)


def analyze_job_match_ai(
    resume_text: str,
    job_description: str
):

    prompt = f"""
You are an expert Technical Recruiter and ATS Expert.

Analyze how well this resume matches the given Job Description.

Return ONLY in the following format.

Overall Match:
...

Strengths:
- ...

Weaknesses:
- ...

Skills to Learn:
- ...

Interview Probability:
...

Career Advice:
...

Resume:

{resume_text}

Job Description:

{job_description}
"""

    return generate_ai(prompt)