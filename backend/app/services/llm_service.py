import ollama


# ---------------------------------------
# AI Resume Analysis
# ---------------------------------------
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

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]


# ---------------------------------------
# AI Job Match Analysis
# ---------------------------------------
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

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]