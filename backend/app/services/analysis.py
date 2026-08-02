def analyze_resume(text: str, skills: list):

    text = text.lower()

    strengths = []
    weaknesses = []
    suggestions = []

    # -------------------------
    # Skills
    # -------------------------

    if len(skills) >= 10:
        strengths.append("Strong technical skill set.")
    else:
        weaknesses.append("Limited technical skills.")
        suggestions.append("Add more relevant technical skills.")

    # -------------------------
    # Projects
    # -------------------------

    if "project" in text:
        strengths.append("Good project experience.")
    else:
        weaknesses.append("Projects section missing.")
        suggestions.append("Add academic or real-world projects.")

    # -------------------------
    # Internship
    # -------------------------

    if "internship" in text or "experience" in text:
        strengths.append("Internship / Experience included.")
    else:
        weaknesses.append("No internship or work experience.")
        suggestions.append("Mention internships or practical experience.")

    # -------------------------
    # Certifications
    # -------------------------

    if (
        "certification" in text
        or "certificate" in text
        or "coursera" in text
        or "udemy" in text
        or "nptel" in text
    ):
        strengths.append("Certifications added.")
    else:
        weaknesses.append("No certifications found.")
        suggestions.append("Add certifications to improve credibility.")

    # -------------------------
    # GitHub
    # -------------------------

    if "github" in text:
        strengths.append("GitHub profile available.")
    else:
        weaknesses.append("GitHub profile missing.")
        suggestions.append("Add your GitHub profile link.")

    # -------------------------
    # LinkedIn
    # -------------------------

    if "linkedin" in text:
        strengths.append("LinkedIn profile available.")
    else:
        weaknesses.append("LinkedIn profile missing.")
        suggestions.append("Add your LinkedIn profile.")

    # -------------------------
    # Resume Summary
    # -------------------------

    if (
        "summary" in text
        or "objective" in text
        or "profile" in text
    ):
        strengths.append("Professional summary included.")
    else:
        weaknesses.append("Professional summary missing.")
        suggestions.append("Add a professional summary.")

    # -------------------------
    # Resume Quality
    # -------------------------

    score = len(strengths)

    if score >= 6:
        quality = "Excellent"
    elif score >= 4:
        quality = "Good"
    elif score >= 2:
        quality = "Average"
    else:
        quality = "Needs Improvement"

    return {
        "resume_quality": quality,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "analysis_suggestions": suggestions
    }