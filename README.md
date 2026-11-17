# ResumeIQ – AI Resume Analyzer & Career Advisor

A full-stack modern SaaS application built with **React (Vite)**, **Tailwind CSS**, and a **Python FastAPI** backend for real PDF & Word (.docx) resume text parsing, ATS scoring, and AI evaluation.

![ResumeIQ Logo](/public/favicon.svg)

---

## 🚀 Architecture Overview

- **Frontend (Port 5173):** React 18, Vite 6, Tailwind CSS, Recharts, Lucide Icons.
- **Backend (Port 8000):** Python FastAPI, Uvicorn, pypdf, python-docx, Google Gemini AI / OpenAI integration.
- **Proxy:** Vite automatically routes all `/api` requests to `http://127.0.0.1:8000`.

---

## 🛠️ How to Run the Application

### 1. Start the Python FastAPI Backend
Open a terminal in the project folder and run:
```powershell
backend\venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --port 8000 --reload
```
You should see:
```
INFO: Uvicorn running on http://127.0.0.1:8000
```
API Documentation is available at `http://127.0.0.1:8000/docs`.

### 2. Start the Frontend
In a second terminal, run:
```powershell
npm run dev
```
Open your browser at **`http://localhost:5173/`**.

---

## 🔑 AI Model Configuration (Optional but Recommended)

By default, ResumeIQ runs an **in-depth algorithmic ATS parser** (detecting 150+ tech skills, calculating keyword density, formatting, and impact metrics) even without an API key.

To activate **Google Gemini 2.0 Flash AI** generation for custom tailored interview questions and bullet rewrites:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `backend/.env` and paste your key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Save the file. The backend automatically reloads and connects to Google Gemini!

---

## 📄 Supported Resume Formats
- **PDF Documents (`.pdf`):** Extracts text blocks, contact headers, and skills.
- **Microsoft Word (`.docx`):** Parses paragraphs, headings, and table cells.
- **File Limit:** Up to 15 MB.
