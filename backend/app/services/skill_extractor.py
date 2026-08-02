import re
from app.utils.skills import SKILLS


def extract_skills(text: str):
    found = []

    for skill in SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text, re.IGNORECASE):
            found.append(skill)

    return sorted(set(found))