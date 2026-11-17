import os
import json
import re
from typing import Dict, Any, List

# Common tech ontology for deterministic parsing and ATS benchmark
TECH_ONTOLOGY = {
    "languages": [
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "golang", "ruby", "rust",
        "php", "swift", "kotlin", "sql", "html", "html5", "css", "css3", "sass", "scss", "r"
    ],
    "frontend": [
        "react", "react.js", "next.js", "vue", "vue.js", "angular", "svelte", "redux", "zustand",
        "tailwind", "tailwind css", "bootstrap", "material ui", "vite", "webpack", "graphql", "rest api",
        "responsive design", "web vitals", "accessibility", "a11y", "figma"
    ],
    "backend": [
        "node.js", "express", "django", "fastapi", "flask", "spring boot", "asp.net", "nest.js",
        "postgresql", "postgres", "mysql", "mongodb", "redis", "elasticsearch", "sqlite", "graphql",
        "restful apis", "microservices", "grpc", "prisma"
    ],
    "devops_cloud": [
        "aws", "amazon web services", "azure", "google cloud", "gcp", "docker", "kubernetes",
        "ci/cd", "github actions", "gitlab ci", "terraform", "ansible", "linux", "nginx", "datadog", "sentry"
    ],
    "ai_data": [
        "machine learning", "deep learning", "nlp", "computer vision", "tensorflow", "pytorch",
        "langchain", "llamaindex", "hugging face", "vector database", "pinecone", "chromadb", "rag",
        "scikit-learn", "pandas", "numpy", "opencv", "generative ai", "llm"
    ]
}


def extract_skills_deterministic(text: str) -> List[str]:
    """Extract present technical skills from resume text using word boundary matching."""
    text_lower = text.lower()
    found_skills = []

    for category, skills in TECH_ONTOLOGY.items():
        for skill in skills:
            # Match word boundary
            pattern = r'(?:\b|_)' + re.escape(skill) + r'(?:\b|_)'
            if re.search(pattern, text_lower):
                # Standardize capitalization
                display_name = skill.title()
                if skill in ["aws", "gcp", "ci/cd", "sql", "css", "html", "rest api", "restful apis", "a11y", "nlp", "llm", "rag"]:
                    display_name = skill.upper()
                elif skill in ["next.js", "node.js", "vue.js"]:
                    display_name = skill.capitalize()
                elif skill == "fastapi":
                    display_name = "FastAPI"
                elif skill == "postgresql":
                    display_name = "PostgreSQL"
                elif skill == "mongodb":
                    display_name = "MongoDB"
                
                if display_name not in found_skills:
                    found_skills.append(display_name)

    return found_skills


def get_target_role_keywords(target_role: str) -> List[str]:
    """Return key skills expected for given target role."""
    tr = target_role.lower()
    if "front" in tr or "react" in tr or "ui" in tr:
        return ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux/Zustand", "REST API", "Testing (Jest/Cypress)", "Web Vitals", "Git", "CI/CD"]
    elif "back" in tr or "node" in tr or "python" in tr:
        return ["Python", "FastAPI", "Node.js", "PostgreSQL", "Docker", "Redis", "RESTful APIs", "Microservices", "AWS", "CI/CD"]
    elif "ai" in tr or "machine" in tr or "data" in tr:
        return ["Python", "PyTorch/TensorFlow", "LangChain", "Vector Databases", "RAG", "SQL", "FastAPI", "Docker", "Pandas", "LLM APIs"]
    elif "full" in tr:
        return ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "RESTful APIs", "Tailwind CSS", "Git", "CI/CD"]
    else:
        return ["Python", "JavaScript", "SQL", "Git", "Docker", "Cloud (AWS/Azure)", "REST APIs", "Agile", "System Design", "CI/CD"]


def analyze_with_deterministic_engine(text: str, target_role: str, meta: Dict[str, Any]) -> Dict[str, Any]:
    """Perform deterministic ATS scoring and analysis when no AI API key is configured."""
    found_skills = extract_skills_deterministic(text)
    expected_skills = get_target_role_keywords(target_role)

    # Keywords detected vs missing
    found_lower = [s.lower() for s in found_skills]
    missing_keywords = []
    for exp in expected_skills:
        if not any(exp.lower() in fl or fl in exp.lower() for fl in found_lower):
            missing_keywords.append(exp)

    # Calculate subscores
    # 1. Keywords match (percentage of expected skills present)
    matched_count = len(expected_skills) - len(missing_keywords)
    keyword_score = min(98, max(50, int((matched_count / max(1, len(expected_skills))) * 100)))

    # 2. Formatting score
    sections = meta.get("detectedSections", [])
    formatting_score = 65
    if meta.get("email"): formatting_score += 10
    if meta.get("phone"): formatting_score += 5
    if len(sections) >= 3: formatting_score += 15
    formatting_score = min(96, formatting_score)

    # 3. Quantifiable Impact score (metrics, % signs, numbers)
    impact_count = len(re.findall(r'(\d+%\s|\$\d+|\d+\+?\s(?:users|clients|revenue|ms|seconds|leads|queries|teams))', text, re.IGNORECASE))
    impact_score = min(95, max(45, 50 + (impact_count * 8)))

    # 4. Skills breadth score
    skills_score = min(95, max(40, len(found_skills) * 6))

    # Overall ATS Score
    overall_score = int((keyword_score * 0.35) + (formatting_score * 0.25) + (impact_score * 0.25) + (skills_score * 0.15))

    match_rating = "Strong ATS Match" if overall_score >= 80 else ("Moderate Match" if overall_score >= 65 else "Needs Optimization")

    # Generate real Before/After rewrites by looking for sentences without numbers
    lines = [l.strip() for l in text.split("\n") if len(l.strip()) > 30 and not l.strip().endswith(':')]
    sample_bullets = [l.lstrip('•-* ').strip() for l in lines if not any(c in l for c in ['%', '$', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])]
    
    bullet_1 = sample_bullets[0] if len(sample_bullets) > 0 else "Responsible for developing frontend features and working with cross-functional teams."
    bullet_2 = sample_bullets[1] if len(sample_bullets) > 1 else "Helped maintain backend database endpoints and improved application stability."

    return {
        "applicantName": meta.get("candidateName", "Candidate"),
        "targetRole": target_role,
        "atsScore": overall_score,
        "matchRating": match_rating,
        "aiEngine": "Deterministic ATS Parser (Add GEMINI_API_KEY in backend/.env for GenAI)",
        "scoreBreakdown": [
            { "category": "Keyword Match", "score": keyword_score, "max": 100, "status": "Good" if keyword_score >= 75 else "Needs Attention", "color": "#00D9FF" },
            { "category": "ATS Formatting", "score": formatting_score, "max": 100, "status": "Clean", "color": "#10B981" },
            { "category": "Quantifiable Impact", "score": impact_score, "max": 100, "status": "Needs Improvement" if impact_score < 70 else "Strong", "color": "#F59E0B" },
            { "category": "Skills Breadth", "score": skills_score, "max": 100, "status": "Good", "color": "#7357FF" },
        ],
        "radarData": [
            { "subject": "Keywords", "A": keyword_score, "fullMark": 100 },
            { "subject": "Formatting", "A": formatting_score, "fullMark": 100 },
            { "subject": "Impact Metrics", "A": impact_score, "fullMark": 100 },
            { "subject": "Experience Flow", "A": min(95, formatting_score - 5), "fullMark": 100 },
            { "subject": "Skills Match", "A": skills_score, "fullMark": 100 },
            { "subject": "Brevity & Tone", "A": 85, "fullMark": 100 },
        ],
        "trendData": [
            { "version": "v1.0 (Initial Scan)", "score": max(50, overall_score - 15) },
            { "version": "v1.1 (+Formatting)", "score": max(60, overall_score - 8) },
            { "version": "v1.2 (Current Parse)", "score": overall_score },
            { "version": "Goal Target", "score": 95 },
        ],
        "detectedKeywords": found_skills if found_skills else ["Communication", "Problem Solving", "Teamwork"],
        "missingKeywords": missing_keywords if missing_keywords else ["System Architecture", "Unit Testing", "CI/CD"],
        "keyFindings": {
            "strengths": [
                f"Candidate name identified as '{meta.get('candidateName')}' with clean typography parsing.",
                f"Identified {len(found_skills)} relevant technical competencies in resume text.",
                "Chronological section layout is detectable by major ATS parsers." if len(sections) >= 2 else "Resume text was parsed cleanly into standard blocks."
            ],
            "improvements": [
                f"Missing {len(missing_keywords)} priority keywords for {target_role}: {', '.join(missing_keywords[:3])}.",
                "Several experience bullets lack quantifiable business metrics (e.g. % improvements, latency gains, revenue impact).",
                "Ensure standard section headings (SUMMARY, EXPERIENCE, SKILLS, EDUCATION) are used explicitly."
            ]
        },
        "careerRoles": [
            {
                "id": "role-1",
                "title": target_role,
                "department": "Core Engineering",
                "matchScore": overall_score,
                "demandLevel": "High",
                "salaryRange": "$140,000 – $185,000",
                "description": f"Lead development in {target_role} leveraging your core stack: {', '.join(found_skills[:4])}.",
                "skillsRequired": expected_skills[:6],
                "skillsMatched": [s for s in expected_skills if s.lower() in found_lower],
                "missingSkills": missing_keywords[:3],
                "marketTrend": "+22% YoY Openings",
                "difficulty": "Moderate"
            },
            {
                "id": "role-2",
                "title": f"Full Stack {target_role.split()[-1] if target_role.split() else 'Developer'}",
                "department": "Product Engineering",
                "matchScore": max(65, overall_score - 6),
                "demandLevel": "Very High",
                "salaryRange": "$135,000 – $175,000",
                "description": "Bridge client architecture, cloud APIs, and database transactions.",
                "skillsRequired": ["React", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
                "skillsMatched": [s for s in ["React", "Node.js", "PostgreSQL", "Docker"] if s.lower() in found_lower],
                "missingSkills": ["Cloud Deployment", "Microservices"],
                "marketTrend": "+18% YoY Openings",
                "difficulty": "Moderate"
            }
        ],
        "skillGaps": [
            {
                "skill": missing_keywords[0] if missing_keywords else "Cloud Infrastructure",
                "category": "Target Role Requirement",
                "priority": "High",
                "targetScore": 90,
                "currentLevel": 40,
                "estimatedTimeToLearn": "2 - 3 weeks",
                "recommendedCourse": f"Mastering {missing_keywords[0] if missing_keywords else 'Cloud'} for Production Systems",
                "impact": "+12% ATS Match Gain"
            },
            {
                "skill": missing_keywords[1] if len(missing_keywords) > 1 else "CI/CD & Automated Testing",
                "category": "Engineering Standards",
                "priority": "Medium",
                "targetScore": 85,
                "currentLevel": 50,
                "estimatedTimeToLearn": "1 - 2 weeks",
                "recommendedCourse": "End-to-End Testing and Deployment Pipelines",
                "impact": "+8% Candidate Ranking"
            }
        ],
        "improvements": [
            {
                "id": "imp-1",
                "category": "Impact & Quantifiable Metrics",
                "section": "Experience Section",
                "issue": "Bullet point describes actions without showing measurable results.",
                "beforeText": bullet_1,
                "afterText": f"Architected high-performance modules in {found_skills[0] if found_skills else 'core stack'}, reducing load times by 35% and supporting 50K+ daily active users.",
                "impactScore": "+8 ATS Points",
                "tag": "High Impact",
                "explanation": "ATS and technical recruiters strongly reward specific metric outcomes (% saved, users reached, revenue).",
                "applied": False
            },
            {
                "id": "imp-2",
                "category": "Action Verbs & Ownership",
                "section": "Experience Section",
                "issue": "Phrasing can be strengthened with decisive engineering action verbs.",
                "beforeText": bullet_2,
                "afterText": f"Spearheaded redesign of backend data workflows using {found_skills[1] if len(found_skills) > 1 else 'REST APIs'}, reducing query latency by 45% with 99.9% uptime.",
                "impactScore": "+6 ATS Points",
                "tag": "Ownership",
                "explanation": "Replace passive language with active verbs like 'Spearheaded', 'Architected', or 'Engineered'.",
                "applied": False
            }
        ],
        "interviewQuestions": [
            {
                "id": "q-1",
                "category": "Technical",
                "role": target_role,
                "difficulty": "Advanced",
                "question": f"How do you design and architect for high scalability and performance when using {found_skills[0] if found_skills else 'your primary framework'} in production?",
                "overview": f"Evaluates real-world architectural design, caching, and troubleshooting in {target_role}.",
                "starAnswer": {
                    "situation": f"Our application was experiencing performance degradation under high-traffic spikes.",
                    "task": "Isolate the bottleneck and maintain steady 60 FPS / sub-100ms response times.",
                    "action": f"Profiled the application using developer tooling, introduced caching with state isolation in {found_skills[0] if found_skills else 'our stack'}, and virtualized heavy components.",
                    "result": "Cut load time by 40% and improved Lighthouse performance score from 62 to 94."
                },
                "keyTips": [
                    "Mention concrete metrics and profiling tools.",
                    "Walk through your decision-making trade-offs."
                ]
            },
            {
                "id": "q-2",
                "category": "Behavioral / HR",
                "role": target_role,
                "difficulty": "Intermediate",
                "question": "Describe a scenario where you faced a tight project deadline or conflicting architectural requirements. How did you handle it?",
                "overview": "Assesses project prioritization, cross-team communication, and delivery focus.",
                "starAnswer": {
                    "situation": "Two weeks before a critical product release, scope changes required refactoring our core data flow.",
                    "task": "Deliver the essential client features on time without compromising code reliability.",
                    "action": "Facilitated a technical alignment sync with product stakeholders, scoped down to an MVP increment, and established automated regression tests in CI.",
                    "result": "Shipped on schedule with zero critical production bugs and positive user adoption."
                },
                "keyTips": [
                    "Highlight proactive stakeholder communication.",
                    "Emphasize pragmatism and automated verification."
                ]
            }
        ]
    }


def analyze_with_ai(text: str, target_role: str, meta: Dict[str, Any]) -> Dict[str, Any]:
    """Call Google Gemini API (or OpenAI fallback) with structured JSON prompt."""
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    if not gemini_key and not openai_key:
        # Fall back gracefully to deterministic engine
        return analyze_with_deterministic_engine(text, target_role, meta)

    prompt = f"""
You are an expert AI Resume Evaluator and ATS Hiring System Architect.
Analyze the following extracted resume text thoroughly against the target job role: '{target_role}'.

CANDIDATE METADATA:
Name: {meta.get('candidateName')}
Email: {meta.get('email')}
Phone: {meta.get('phone')}

RESUME TEXT:
\"\"\"
{text[:10000]}
\"\"\"

RETURN STRICT JSON ONLY (NO MARKDOWN WRAPPERS, NO CODE BLOCKS, NO EXPLANATION BEFORE OR AFTER).
The JSON must follow this exact schema:
{{
  "applicantName": "{meta.get('candidateName', 'Candidate')}",
  "targetRole": "{target_role}",
  "atsScore": <integer between 40 and 98>,
  "matchRating": "<Strong ATS Match | Moderate Match | Needs Optimization>",
  "aiEngine": "Google Gemini 2.0 Flash (Live AI Analysis)",
  "scoreBreakdown": [
    {{ "category": "Keyword Match", "score": <int 40-100>, "max": 100, "status": "<string>", "color": "#00D9FF" }},
    {{ "category": "ATS Formatting", "score": <int 40-100>, "max": 100, "status": "<string>", "color": "#10B981" }},
    {{ "category": "Quantifiable Impact", "score": <int 40-100>, "max": 100, "status": "<string>", "color": "#F59E0B" }},
    {{ "category": "Skills Breadth", "score": <int 40-100>, "max": 100, "status": "<string>", "color": "#7357FF" }}
  ],
  "radarData": [
    {{ "subject": "Keywords", "A": <int 40-100>, "fullMark": 100 }},
    {{ "subject": "Formatting", "A": <int 40-100>, "fullMark": 100 }},
    {{ "subject": "Impact Metrics", "A": <int 40-100>, "fullMark": 100 }},
    {{ "subject": "Experience Flow", "A": <int 40-100>, "fullMark": 100 }},
    {{ "subject": "Skills Match", "A": <int 40-100>, "fullMark": 100 }},
    {{ "subject": "Brevity & Tone", "A": <int 40-100>, "fullMark": 100 }}
  ],
  "trendData": [
    {{ "version": "v1.0 (Initial Scan)", "score": <int> }},
    {{ "version": "v1.1 (+Formatting)", "score": <int> }},
    {{ "version": "v1.2 (Current Parse)", "score": <int equal to atsScore> }},
    {{ "version": "Goal Target", "score": 95 }}
  ],
  "detectedKeywords": [<array of 10-20 specific technical skills found in resume>],
  "missingKeywords": [<array of 5-8 crucial technical skills missing for '{target_role}'>],
  "keyFindings": {{
    "strengths": [<array of 3-4 specific strengths found in this actual resume>],
    "improvements": [<array of 3-4 actionable improvements needed for this actual resume>]
  }},
  "careerRoles": [
    {{
      "id": "role-1",
      "title": "{target_role}",
      "department": "Core Engineering",
      "matchScore": <int 50-98>,
      "demandLevel": "<High | Very High | Explosive Demand>",
      "salaryRange": "<e.g. $145,000 – $190,000>",
      "description": "<1-2 sentence description customized to candidate>",
      "skillsRequired": [<array of 5-6 strings>],
      "skillsMatched": [<array of matched strings>],
      "missingSkills": [<array of 2-3 missing strings>],
      "marketTrend": "<e.g. +24% YoY Openings>",
      "difficulty": "<Moderate | High | Very High>"
    }},
    {{
      "id": "role-2",
      "title": "<Adjacent senior role>",
      "department": "Product Engineering",
      "matchScore": <int 50-95>,
      "demandLevel": "<High | Very High>",
      "salaryRange": "<e.g. $150,000 – $200,000>",
      "description": "<1-2 sentence description>",
      "skillsRequired": [<array of strings>],
      "skillsMatched": [<array of strings>],
      "missingSkills": [<array of strings>],
      "marketTrend": "<string>",
      "difficulty": "<string>"
    }}
  ],
  "skillGaps": [
    {{
      "skill": "<Crucial missing skill 1>",
      "category": "Target Role Requirement",
      "priority": "High",
      "targetScore": 90,
      "currentLevel": 45,
      "estimatedTimeToLearn": "2 - 3 weeks",
      "recommendedCourse": "<Specific course or certification name>",
      "impact": "+14% ATS Match Boost"
    }},
    {{
      "skill": "<Crucial missing skill 2>",
      "category": "Architecture & Cloud",
      "priority": "Medium",
      "targetScore": 85,
      "currentLevel": 50,
      "estimatedTimeToLearn": "1 - 2 weeks",
      "recommendedCourse": "<Specific course name>",
      "impact": "+10% Candidate Filter Passing"
    }}
  ],
  "improvements": [
    {{
      "id": "imp-1",
      "category": "Impact & Quantifiable Metrics",
      "section": "Experience Section",
      "issue": "<Specific critique of a sentence in the candidate's resume>",
      "beforeText": "<Actual or closely matching sentence from candidate resume>",
      "afterText": "<Rewritten metric-backed high-impact bullet point>",
      "impactScore": "+8 ATS Points",
      "tag": "High Impact",
      "explanation": "<Why recruiters and ATS systems prefer this>",
      "applied": false
    }},
    {{
      "id": "imp-2",
      "category": "Action Verbs & Ownership",
      "section": "Experience Section",
      "issue": "<Specific critique of weak phrasing>",
      "beforeText": "<Actual or closely matching sentence from candidate resume>",
      "afterText": "<Rewritten version leading with strong action verb>",
      "impactScore": "+6 ATS Points",
      "tag": "Ownership",
      "explanation": "<Explanation>",
      "applied": false
    }}
  ],
  "interviewQuestions": [
    {{
      "id": "q-1",
      "category": "Technical",
      "role": "{target_role}",
      "difficulty": "Advanced",
      "question": "<Tailored technical question based on candidate's actual projects>",
      "overview": "<What this tests>",
      "starAnswer": {{
        "situation": "<Situation>",
        "task": "<Task>",
        "action": "<Action>",
        "result": "<Result with metric>"
      }},
      "keyTips": [<array of 2-3 specific tips>]
    }},
    {{
      "id": "q-2",
      "category": "Behavioral / HR",
      "role": "{target_role}",
      "difficulty": "Intermediate",
      "question": "<Tailored behavioral question>",
      "overview": "<What this tests>",
      "starAnswer": {{
        "situation": "<Situation>",
        "task": "<Task>",
        "action": "<Action>",
        "result": "<Result with metric>"
      }},
      "keyTips": [<array of 2-3 tips>]
    }}
  ]
}}
"""

    # Attempt Gemini API first
    if gemini_key:
        try:
            # Try new google-genai SDK
            try:
                from google import genai
                client = genai.Client(api_key=gemini_key)
                response = client.models.generate_content(
                    model='gemini-2.0-flash',
                    contents=prompt,
                )
                raw_text = response.text.strip()
            except Exception:
                # Fallback to google.generativeai
                import google.generativeai as gai
                gai.configure(api_key=gemini_key)
                model = gai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(prompt)
                raw_text = response.text.strip()

            # Clean JSON formatting wrappers if present
            cleaned_json = re.sub(r'^```(?:json)?\s*', '', raw_text, flags=re.MULTILINE)
            cleaned_json = re.sub(r'\s*```$', '', cleaned_json, flags=re.MULTILINE).strip()
            data = json.loads(cleaned_json)
            data["aiEngine"] = "Google Gemini (Live AI Analysis)"
            return data
        except Exception as e:
            print(f"[Warning] Gemini API call error: {e}. Falling back to deterministic analysis.")

    # Attempt OpenAI API if key available
    if openai_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=openai_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert ATS and Resume Analyzer that responds in strictly valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            raw_text = response.choices[0].message.content.strip()
            data = json.loads(raw_text)
            data["aiEngine"] = "OpenAI GPT-4o-mini (Live AI Analysis)"
            return data
        except Exception as e:
            print(f"[Warning] OpenAI API call error: {e}. Falling back to deterministic analysis.")

    # Fallback to deterministic ATS engine
    return analyze_with_deterministic_engine(text, target_role, meta)
