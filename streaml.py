import streamlit as st
from read_file import read_file
from langchain_helpers import generate_email
from starlette.datastructures import UploadFile
import io
import asyncio


def convert_streamlit_to_fastapi_file(streamlit_file):
    # Read the content of the Streamlit UploadedFile
    file_content = streamlit_file.read()

    # Create a FastAPI UploadFile
    fastapi_file = UploadFile(
        filename=streamlit_file.name,
        file=io.BytesIO(file_content),
        size=len(file_content),
        headers={
            "Content-Type": streamlit_file.type,
            "Content-Disposition": f'attachment; filename="{streamlit_file.name}"'
        }
    )

    # Reset the file pointer of the Streamlit file
    streamlit_file.seek(0)

    return fastapi_file


st.title('Job Cold Email Generator')

uploaded_file = st.file_uploader(label='Upload your resume', type=[
    'pdf', 'docx', 'txt', 'csv', ], accept_multiple_files=False)

job_description = st.text_area(
    label='Paste the job description here', height=300)

if st.button('Generate Email', use_container_width=True,
             disabled=uploaded_file is None or job_description == ''):

    async def async_handler():
        resume_text = await read_file(
            convert_streamlit_to_fastapi_file(uploaded_file))

        placeholder = st.empty()
        placeholder.write('Generating email...')

        generated_email = generate_email(resume_text, job_description)

        placeholder.empty()

        if generated_email.get('subject'):
            st.write(f"**Subject:**", generated_email.get('subject'))

        if generated_email.get('email'):
            st.text(generated_email.get('email'))

        if generated_email.get('recipient'):
            st.write(f"**Recipient:**", generated_email.get('recipient'))

    asyncio.run(async_handler())
