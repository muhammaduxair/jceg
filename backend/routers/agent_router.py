from fastapi import APIRouter, HTTPException
from utils import generate_email, EmailContent, read_file_handler
from fastapi import UploadFile, Form
from fastapi.responses import JSONResponse

# define a router
router = APIRouter(prefix='/api/v1/agent')


@router.post("/generate-email/", response_model=EmailContent)
async def generate_cold_email(
    resume_file: UploadFile,
    job_description: str = Form(...),
):
    if len(job_description.split()) > 2000:
        raise HTTPException(
            status_code=400, detail="Job description is too long. Please provide a shorter job description.")

    resume_text = await read_file_handler(resume_file)

    if len(resume_text.split()) > 2000:
        raise HTTPException(
            status_code=400, detail="Resume text is too long. Please upload a shorter resume.")

    email_content = generate_email(
        resume_text.strip(), job_description.strip())

    return JSONResponse(content=email_content)
