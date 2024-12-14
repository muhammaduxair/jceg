import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from typing import TypedDict, Optional
from utils import clean_and_parse_json
import json
from fastapi import HTTPException

load_dotenv()

if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

if not os.environ.get("GROQ_API_KEY"):
    raise HTTPException(
        status_code=500, detail="GROQ_API_KEY is not set in the environment variables")

llm = ChatGroq(
    model="llama3-70b-8192",
    temperature=0,
)


class EmailContent(TypedDict):
    subject: str
    email: str
    recipient: Optional[str]


def generate_email(
    resume_text: str,
    job_description: str,
) -> EmailContent:
    if not resume_text or not job_description:
        raise HTTPException(
            status_code=400, detail="Both resume_text and job_description are required")

    # Create prompt
    prompt = PromptTemplate(
        input_variables=["resume", "job_description"],
        template=(
            "You are an expert job application strategist tasked with crafting the most compelling cold email for the user. Analyze the provided resume data meticulously and create a highly tailored, professional, and engaging email for the specified job.\n\n"
            "Generate a Python-compatible JSON object with the following fields:\n"
            "1. 'subject': A concise, attention-grabbing email subject that entices the recipient to open.\n"
            "2. 'email': The main body of the email, strategically personalized and aligned with the job description. Include:\n"
            "   - A strong opening hook\n"
            "   - Clear demonstration of how the candidate's skills match the job requirements\n"
            "   - Specific achievements relevant to the role\n"
            "   - A compelling call-to-action\n"
            "3. 'recipient': The recipient's email extracted from the job description, if provided. Omit this field if not explicitly stated.\n\n"
            "Strict Guidelines:\n"
            "- Ensure the JSON object is valid and follows Python standards.\n"
            "- Do not include any text or explanation outside the JSON object.\n"
            "- Never include or reference the user's own email address.\n"
            "- Use only the information provided in the resume and job description; do not make assumptions or add fictional details.\n"
            "- Optimize for ATS (Applicant Tracking Systems) by incorporating relevant keywords from the job description.\n"
            "- Limit the email body to 250 words or less for maximum impact.\n"
            "- Ensure the tone is professional yet personable, showcasing the candidate's enthusiasm.\n"
            "- Do not use generic phrases; make every sentence specific to the job and candidate.\n\n"
            "Input Data:\n"
            "Resume:\n{resume}\n\n"
            "Job Description:\n{job_description}\n\n"
            "Produce only the JSON object, with no additional formatting, preamble, or postamble."
        ),
    )

    try:
        # Call LLM to generate email content
        llm_response = llm.invoke(
            prompt.format(resume=resume_text, job_description=job_description)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling LLM: {str(e)}")

    try:
        email_data: dict = clean_and_parse_json(llm_response.content)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=422, detail=f"Error parsing LLM response: {str(e)}")

    if not email_data.get("subject") or not email_data.get("email"):
        raise HTTPException(
            status_code=422, detail="LLM response is missing required fields")

    return EmailContent(
        subject=email_data.get("subject", ""),
        email=email_data.get("email", ""),
        recipient=email_data.get("recipient", None),
    )
