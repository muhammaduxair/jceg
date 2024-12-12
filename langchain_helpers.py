import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from typing import TypedDict, Optional
import json

load_dotenv()

if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")


llm = ChatGroq(
    model="llama3-70b-8192",
    temperature=0,
)


class EmailContent(TypedDict):
    subject: str
    email: str
    recepient: Optional[str]


def generate_email(
    resume_text: str,
    job_description: str,
) -> EmailContent:
   # Create prompt
    prompt = PromptTemplate(
        input_variables=["resume", "job_description"],
        template=(
            "You are tasked with creating the best job application cold email for the user. Based on the resume data provided, craft a highly professional, engaging, and tailored email for the job described below.\n"
            "Strictly generate a JSON object (which should be Python standard) for the following fields:\n"
            "1. 'subject': A concise and compelling email subject.\n"
            "2. 'email': The main body of the email, personalized and aligned with the job description.\n"
            "3. 'recipient': The recipient's email extracted from the job description, if provided. if not provided so don't make recipient field\n"
            "Strictly Ensure:\n"
            "- No additional text or explanation outside the JSON object.\n"
            "- Do not include the user's own email in any form.\n"
            "- Do not make assumptions; use only the given data.\n"
            "- No preamble, no postamble, no formatting other than JSON.\n\n"
            "Input Data:\n"
            "Resume:\n{resume}\n\n"
            "Job Description:\n{job_description}\n"
        ),
        optional_variables=['subject', 'email', 'recipient'],
    )

    # Call LLM to generate email content
    llm_response = llm.invoke(
        prompt.format(resume=resume_text, job_description=job_description)
    )

    try:
        # Parse the JSON response from LLM
        email_data: dict = json.loads(llm_response.content)
        return EmailContent(
            subject=email_data.get("subject", ""),
            email=email_data.get("email", ""),
            recipient=email_data.get("recipient", None),
        )
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {e}")
        return EmailContent(
            subject="Something went wrong",
            email="Please try again.",
            recipient=None,
        )
