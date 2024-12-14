from fastapi import APIRouter
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
    resume_text = await read_file_handler(resume_file)
    email_content = generate_email(
        resume_text.strip(), job_description.strip())
    return JSONResponse(content=email_content)
