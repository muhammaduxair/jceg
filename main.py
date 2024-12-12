import json
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from utils import extract_text_from_file
from langchain_helpers import generate_email, EmailContent

app = FastAPI()


@app.post("/generate-email/", response_model=EmailContent)
async def generate_cold_email(
    resume_file: UploadFile,
    job_description: str = Form(...),
):
    resume_text = extract_text_from_file(resume_file)

    email_content = generate_email(resume_text, job_description)

    return JSONResponse(content=email_content)
