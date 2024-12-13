from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from utils import generate_email, EmailContent, read_file_handler

app = FastAPI()


@app.post("/generate-email/", response_model=EmailContent)
async def generate_cold_email(
    resume_file: UploadFile,
    job_description: str = Form(...),
):
    resume_text = read_file_handler(resume_file)

    email_content = generate_email(resume_text, job_description)

    return JSONResponse(content=email_content)