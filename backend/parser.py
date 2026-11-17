import io
import re
from typing import Tuple, Dict, Any, List
from pypdf import PdfReader
from docx import Document


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract clean, structured text from a PDF file."""
    text_parts = []
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        for page_idx, page in enumerate(reader.pages):
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text.strip())
        
        extracted = "\n\n".join(text_parts).strip()
        if not extracted:
            raise ValueError("The uploaded PDF does not contain extractable text (it may be a scanned image).")
        return extracted
    except Exception as e:
        raise ValueError(f"Error parsing PDF document: {str(e)}")


def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract clean, structured text from a DOCX file including paragraphs and tables."""
    text_parts = []
    try:
        doc = Document(io.BytesIO(file_bytes))
        for p in doc.paragraphs:
            clean_text = p.text.strip()
            if clean_text:
                text_parts.append(clean_text)
        
        # Also extract text from any tables in the docx
        for table in doc.tables:
            for row in table.rows:
                row_cells = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                if row_cells:
                    text_parts.append(" | ".join(row_cells))
        
        extracted = "\n".join(text_parts).strip()
        if not extracted:
            raise ValueError("The uploaded Word document appears to be empty.")
        return extracted
    except Exception as e:
        raise ValueError(f"Error parsing Word (DOCX) document: {str(e)}")


def extract_candidate_meta(text: str, filename: str) -> Dict[str, Any]:
    """Extract candidate name, email, phone, and detect key resume sections from text."""
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    
    # Email heuristic
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    email = email_match.group(0) if email_match else None

    # Phone heuristic
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    phone = phone_match.group(0) if phone_match else None

    # LinkedIn heuristic
    linkedin_match = re.search(r'linkedin\.com/in/[\w\-]+', text, re.IGNORECASE)
    linkedin = linkedin_match.group(0) if linkedin_match else None

    # Candidate Name heuristic:
    # First non-empty line that doesn't look like an email/phone/heading, or fallback to filename
    candidate_name = None
    for line in lines[:5]:
        if len(line) < 40 and not any(h in line.upper() for h in ['RESUME', 'CURRICULUM', 'VITAE', 'HTTP', 'WWW', '@']):
            if re.match(r'^[A-Za-z\s\.\'-]+$', line) and len(line.split()) >= 2:
                candidate_name = line.title()
                break

    if not candidate_name:
        # Clean from filename
        base_name = filename.rsplit('.', 1)[0]
        cleaned = re.sub(r'[_-\s]+(resume|cv|latest|final|updated|202\d).*$', '', base_name, flags=re.IGNORECASE)
        candidate_name = cleaned.replace('_', ' ').replace('-', ' ').title().strip() or "Candidate"

    # Section detection
    section_keywords = {
        "summary": ["SUMMARY", "OBJECTIVE", "PROFILE", "ABOUT ME"],
        "experience": ["EXPERIENCE", "EMPLOYMENT", "WORK HISTORY", "PROFESSIONAL EXPERIENCE"],
        "education": ["EDUCATION", "ACADEMIC", "DEGREE", "UNIVERSITY"],
        "skills": ["SKILLS", "TECHNICAL SKILLS", "COMPETENCIES", "TECHNOLOGIES", "TOOLS"],
        "projects": ["PROJECTS", "PERSONAL PROJECTS", "KEY PROJECTS"],
        "certifications": ["CERTIFICATIONS", "LICENSES", "CREDENTIALS"]
    }
    
    detected_sections = []
    text_upper = text.upper()
    for sec_name, keywords in section_keywords.items():
        if any(kw in text_upper for kw in keywords):
            detected_sections.append(sec_name)

    return {
        "candidateName": candidate_name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "detectedSections": detected_sections,
        "wordCount": len(text.split()),
        "characterCount": len(text),
    }


def parse_resume_file(filename: str, file_bytes: bytes) -> Tuple[str, Dict[str, Any]]:
    """Parse resume file based on extension and return clean text and metadata."""
    fn_lower = filename.lower()
    if fn_lower.endswith('.pdf'):
        text = extract_text_from_pdf(file_bytes)
    elif fn_lower.endswith('.docx') or fn_lower.endswith('.doc'):
        text = extract_text_from_docx(file_bytes)
    else:
        raise ValueError(f"Unsupported file format '{filename}'. Please upload a .pdf or .docx file.")

    meta = extract_candidate_meta(text, filename)
    return text, meta
