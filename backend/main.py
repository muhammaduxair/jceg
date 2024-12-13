from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils import generate_email, EmailContent, read_file_handler

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate-email/", response_model=EmailContent)
async def generate_cold_email(
    resume_file: UploadFile,
    job_description: str = Form(...),
):
    resume_text = read_file_handler(resume_file)

    email_content = generate_email(resume_text, job_description)

    return JSONResponse(content=email_content)
