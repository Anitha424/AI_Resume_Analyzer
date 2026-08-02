from app.services.skill_extractor import extract_skills


# ----------------------------------------
# Match Resume with Job Description
# ----------------------------------------

def match_resume_with_job(resume_text: str, job_description: str):

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    matched = []
    missing = []

    for skill in job_skills:
        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    score = round((len(matched) / len(job_skills)) * 100) if job_skills else 0

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }


# ----------------------------------------
# Job Recommendation using Weighted Skills
# ----------------------------------------

def recommend_jobs(resume_skills):

    jobs = [

        {
            "title": "Python Developer",
            "skills": {
                "Python": 30,
                "SQL": 20,
                "REST API": 15,
                "GitHub": 10,
                "Docker": 10,
                "AWS": 15
            }
        },

        {
            "title": "Backend Developer",
            "skills": {
                "Python": 20,
                "Node.js": 20,
                "MongoDB": 20,
                "REST API": 15,
                "GitHub": 10,
                "Docker": 15
            }
        },

        {
            "title": "MERN Stack Developer",
            "skills": {
                "React": 25,
                "Node.js": 20,
                "MongoDB": 20,
                "Express.js": 15,
                "JavaScript": 10,
                "GitHub": 5,
                "REST API": 5
            }
        },

        {
            "title": "React Developer",
            "skills": {
                "React": 35,
                "JavaScript": 25,
                "HTML": 15,
                "CSS": 15,
                "GitHub": 10
            }
        },

        {
            "title": "Frontend Developer",
            "skills": {
                "HTML": 20,
                "CSS": 20,
                "JavaScript": 25,
                "React": 25,
                "GitHub": 10
            }
        },

        {
            "title": "Full Stack Developer",
            "skills": {
                "React": 20,
                "Node.js": 20,
                "Express.js": 15,
                "MongoDB": 15,
                "JavaScript": 10,
                "SQL": 10,
                "GitHub": 5,
                "REST API": 5
            }
        }

    ]

    recommendations = []

    resume_set = set(resume_skills)

    for job in jobs:

        total_weight = sum(job["skills"].values())

        obtained = 0

        matched_skills = []

        missing_skills = []

        for skill, weight in job["skills"].items():

            if skill in resume_set:
                obtained += weight
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        score = round((obtained / total_weight) * 100)

        # Classification
        if score >= 90:
            level = "Excellent"
        elif score >= 75:
            level = "Good"
        elif score >= 60:
            level = "Average"
        else:
            level = "Needs Improvement"

        recommendations.append({

            "job_title": job["title"],

            "match_score": score,

            "match_level": level,

            "matched_skills": matched_skills,

            "missing_skills": missing_skills

        })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations