import sys
from parser import extract_candidate_meta
from analyzer import analyze_with_deterministic_engine

sample_resume = """
Jane Doe
Seattle, WA • jane.doe@example.com • (555) 123-4567 • linkedin.com/in/janedoe

PROFESSIONAL SUMMARY
Senior Software Engineer with 6 years of experience building modern web applications using React, TypeScript, Python, and AWS.

EXPERIENCE
Software Engineer | Acme Corp | 2021 – Present
• Architected enterprise customer portals in React and Next.js, serving 80,000 daily users and cutting latency by 32%.
• Built microservices using FastAPI, Python, and PostgreSQL processing 1.5M monthly transactions with 99.9% uptime.
• Decreased CI/CD build times by 40% using Docker and GitHub Actions.

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, HTML, CSS
Frameworks: React, Next.js, FastAPI, Node.js, Tailwind CSS
Tools & Cloud: AWS, Docker, Git, CI/CD, PostgreSQL
"""

def test_pipeline():
    meta = extract_candidate_meta(sample_resume, "Jane_Doe_Resume.pdf")
    print("Extracted Candidate:", meta.get("candidateName"))
    print("Extracted Email:", meta.get("email"))
    print("Detected Sections:", meta.get("detectedSections"))
    
    assert meta.get("candidateName") == "Jane Doe", f"Expected Jane Doe, got {meta.get('candidateName')}"
    assert meta.get("email") == "jane.doe@example.com", f"Expected email match, got {meta.get('email')}"
    
    analysis = analyze_with_deterministic_engine(sample_resume, "Full Stack Engineer", meta)
    print("ATS Score:", analysis.get("atsScore"))
    print("Detected Keywords Count:", len(analysis.get("detectedKeywords", [])))
    print("Missing Keywords Count:", len(analysis.get("missingKeywords", [])))
    print("Role recommendations:", len(analysis.get("careerRoles", [])))
    
    assert analysis.get("atsScore") > 60, "Score should be > 60"
    assert len(analysis.get("detectedKeywords", [])) > 5, "Should detect multiple technical keywords"
    assert len(analysis.get("improvements", [])) >= 2, "Should produce improvements"
    assert len(analysis.get("interviewQuestions", [])) >= 2, "Should produce interview questions"
    
    print("\n>>> ALL BACKEND PIPELINE CHECKS PASSED SUCCESSFULLY! <<<")

if __name__ == "__main__":
    test_pipeline()
