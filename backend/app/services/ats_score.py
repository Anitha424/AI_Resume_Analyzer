import re


def calculate_ats_score(text: str, skills: list):

    text_lower = text.lower()

    score = 0
    suggestions = []

    # -------------------------
    # Contact Information (10)
    # -------------------------

    email_pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

    if re.search(email_pattern, text):
        score += 5
    else:
        suggestions.append("Add a professional email address.")

    phone_pattern = r"\b\d{10}\b"

    if re.search(phone_pattern, text):
        score += 5
    else:
        suggestions.append("Add a valid phone number.")

    # -------------------------
    # Professional Summary (10)
    # -------------------------

    summary_keywords = [
        "summary",
        "profile",
        "objective",
        "about"
    ]

    if any(word in text_lower for word in summary_keywords):
        score += 10
    else:
        suggestions.append(
            "Add a Professional Summary section."
        )

    # -------------------------
    # Skills (20)
    # -------------------------

    if len(skills) >= 10:
        score += 20
    elif len(skills) >= 7:
        score += 15
    elif len(skills) >= 5:
        score += 10
    else:
        score += 5
        suggestions.append(
            "Include more technical skills."
        )

    # -------------------------
    # Projects (20)
    # -------------------------

    project_keywords = [
        "project",
        "projects"
    ]

    if any(word in text_lower for word in project_keywords):
        score += 20
    else:
        suggestions.append(
            "Include academic or real-world projects."
        )

    # -------------------------
    # Education (15)
    # -------------------------

    education_keywords = [
        "education",
        "b.e",
        "b.tech",
        "bachelor",
        "engineering",
        "cgpa",
        "university",
        "college"
    ]

    if any(word in text_lower for word in education_keywords):
        score += 15
    else:
        suggestions.append(
            "Add your education details."
        )

    # -------------------------
    # Internship / Experience (10)
    # -------------------------

    experience_keywords = [
        "internship",
        "experience",
        "worked",
        "training"
    ]

    if any(word in text_lower for word in experience_keywords):
        score += 10
    else:
        suggestions.append(
            "Add internship or work experience."
        )

    # -------------------------
    # Certifications (5)
    # -------------------------

    certification_keywords = [
        "certification",
        "certificate",
        "coursera",
        "udemy",
        "nptel"
    ]

    if any(word in text_lower for word in certification_keywords):
        score += 5
    else:
        suggestions.append(
            "Add relevant certifications."
        )

    # -------------------------
    # Resume Keywords (10)
    # -------------------------

    important_keywords = [
        "python",
        "react",
        "node",
        "mongodb",
        "sql",
        "javascript",
        "html",
        "css",
        "express",
        "git"
    ]

    found = 0

    for keyword in important_keywords:
        if keyword in text_lower:
            found += 1

    keyword_score = min(found, 10)

    score += keyword_score

    if keyword_score < 7:
        suggestions.append(
            "Include more industry-relevant technical keywords."
        )

    # -------------------------
    # Final Score
    # -------------------------

    if score > 100:
        score = 100

    return score, suggestions