import io
import PyPDF2
from docx import Document
import pandas as pd
from fastapi import UploadFile
import chardet


async def read_file_handler(file: UploadFile) -> str:
    """
    Read various file types from an UploadFile and return their content as a string.
    Supported file types: PDF, DOCX, TXT, CSV, DOC
    """
    file_extension = file.filename.split('.')[-1].lower()
    content = await file.read()

    try:
        if file_extension == 'pdf':
            return read_pdf(content)
        elif file_extension == 'docx':
            return read_docx(content)
        elif file_extension == 'txt':
            return read_txt(content)
        elif file_extension == 'csv':
            return read_csv(content)
        elif file_extension == 'doc':
            return "DOC files are not supported in this version due to win32com limitations with UploadFile"
        else:
            return f"Unsupported file type: {file_extension}"
    except Exception as e:
        return f"Error reading file: {str(e)}"
    finally:
        await file.seek(0)  # Reset file pointer


def read_pdf(content: bytes) -> str:
    pdf_file = io.BytesIO(content)
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text


def read_docx(content: bytes) -> str:
    docx_file = io.BytesIO(content)
    doc = Document(docx_file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text


def read_txt(content: bytes) -> str:
    encoding = chardet.detect(content)['encoding']
    return content.decode(encoding)


def read_csv(content: bytes) -> str:
    csv_file = io.StringIO(content.decode('utf-8'))
    df = pd.read_csv(csv_file)
    return df.to_string()
