from fastapi import APIRouter, HTTPException
from utils import generate_email, EmailContent, read_file_handler, load_web_document, clean_scraped_text
from fastapi import UploadFile, Form
from fastapi.responses import JSONResponse
from typing import Optional

# define a router
router = APIRouter(prefix='/api/v1/agent')


@router.post("/generate-email/", response_model=EmailContent)
async def generate_cold_email(
    resume_file: UploadFile,
    job_description: Optional[str] = Form(None),
    job_description_url: Optional[str] = Form(None),
):
    if not job_description and not job_description_url:
        raise HTTPException(
            status_code=400, detail="Please provide job description or job description url.")

    job_description_actual_text = ''

    if job_description:
        if len(job_description.split()) > 2000:
            raise HTTPException(
                status_code=400, detail="Job description is too long. Please provide a shorter job description.")
        else:
            job_description_actual_text = job_description.strip()

    if job_description_url:
        document_data = load_web_document(job_description_url)
        clean_document_data = clean_scraped_text(document_data)
        # Grab the first 2000 characters of the job description
        job_description_actual_text = clean_document_data[:2000]

    resume_text = await read_file_handler(resume_file)

    if len(resume_text.split()) > 2000:
        raise HTTPException(
            status_code=400, detail="Resume text is too long. Please upload a shorter resume.")

    email_content = generate_email(
        resume_text=resume_text.strip(), job_description=job_description_actual_text)

    return JSONResponse(content=email_content)
