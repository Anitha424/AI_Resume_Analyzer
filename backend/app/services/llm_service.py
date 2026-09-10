import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=api_key)


def generate_ai(prompt: str):
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text

import os
import time
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=api_key)


def generate_ai(prompt: str):

    models = [
        "gemini-3.5-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite"
    ]

    for model in models:

        for attempt in range(3):

            try:

                print(f"Trying Gemini model: {model}")
                print(f"Attempt: {attempt + 1}")

                response = client.models.generate_content(
                    model=model,
                    contents=prompt
                )

                return response.text

            except Exception as e:

                print("Gemini Error:")
                print(type(e).__name__)
                print(e)

                if attempt < 2:
                    time.sleep(2 ** attempt)

    return "AI analysis is temporarily unavailable. Please try again later."


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