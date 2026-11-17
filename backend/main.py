import os
import time
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from parser import parse_resume_file
from analyzer import analyze_with_ai

app = FastAPI(
    title="ResumeIQ AI Engine API",
    description="Real-time resume parser, ATS scoring engine, and AI career advisor backend",
    version="1.0.0"
)

# Configure CORS to allow frontend communication
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "ResumeIQ AI Resume Analyzer API",
        "version": "1.0.0",
        "docsUrl": "/docs"
    }


@app.get("/api/health")
def health_check():
    gemini_configured = bool(os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))
    openai_configured = bool(os.getenv("OPENAI_API_KEY"))

    active_ai_provider = "Google Gemini" if gemini_configured else ("OpenAI" if openai_configured else "Deterministic ATS Engine (Offline/Local)")

    return {
        "status": "healthy",
        "timestamp": time.time(),
        "aiProvider": active_ai_provider,
        "isAiConfigured": gemini_configured or openai_configured,
        "supportedFormats": [".pdf", ".docx"]
    }


@app.post("/api/extract-text")
async def extract_text_endpoint(file: UploadFile = File(...)):
    """Parse a PDF or DOCX file and return raw & formatted extracted text."""
    filename = file.filename or "uploaded_resume.pdf"
    fn_lower = filename.lower()
    if not (fn_lower.endswith(".pdf") or fn_lower.endswith(".docx") or fn_lower.endswith(".doc")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a PDF or DOCX file."
        )

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty. Please select a valid resume document."
        )

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the 15 MB limit."
        )

    try:
        extracted_text, meta = parse_resume_file(filename, file_bytes)
        file_size_kb = f"{(len(file_bytes) / 1024):.1f} KB"
        
        return {
            "success": True,
            "fileName": filename,
            "fileSize": file_size_kb,
            "extractedText": extracted_text,
            "meta": meta
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to extract text from {filename}: {str(e)}"
        )


@app.post("/api/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form("Senior Frontend / Full Stack Engineer")
):
    """
    Complete analysis pipeline:
    1. Validate file format and size
    2. Extract text and structural entities
    3. Run AI and ATS evaluation
    4. Return full reactive response matching frontend schema
    """
    filename = file.filename or "uploaded_resume.pdf"
    fn_lower = filename.lower()
    if not (fn_lower.endswith(".pdf") or fn_lower.endswith(".docx") or fn_lower.endswith(".doc")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported format. Only .pdf and .docx documents are accepted."
        )

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds maximum allowed 15 MB."
        )

    # 1. Parse text from binary
    try:
        extracted_text, meta = parse_resume_file(filename, file_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Text extraction failed: {str(e)}"
        )

    # 2. Run analysis
    try:
        clean_target_role = (target_role or "Senior Frontend / Full Stack Engineer").strip()
        analysis_data = analyze_with_ai(extracted_text, clean_target_role, meta)
        
        # Attach file information
        file_size_kb = f"{(len(file_bytes) / 1024):.1f} KB"
        analysis_data["fileName"] = filename
        analysis_data["fileSize"] = file_size_kb
        analysis_data["uploadedAt"] = "Just now"
        analysis_data["extractedText"] = extracted_text

        return {
            "success": True,
            "data": analysis_data
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis pipeline error: {str(e)}"
        )
