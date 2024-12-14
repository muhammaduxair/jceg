import io
import PyPDF2
from docx import Document
import pandas as pd
from fastapi import UploadFile, HTTPException
import chardet


async def read_file_handler(file: UploadFile) -> str:
    """
    Read various file types from an UploadFile and return their content as a string.
    Supported file types: PDF, DOCX, TXT, CSV, DOC
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

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
            raise HTTPException(
                status_code=415, detail="DOC files are not supported in this version due to win32com limitations with UploadFile")
        else:
            raise HTTPException(
                status_code=415, detail=f"Unsupported file type: {file_extension}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error reading file: {str(e)}")
    finally:
        await file.seek(0)  # Reset file pointer


def read_pdf(content: bytes) -> str:
    try:
        pdf_file = io.BytesIO(content)
        reader = PyPDF2.PdfReader(pdf_file)
        text = []
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)

        if not text:
            return "The PDF file appears to be empty or unreadable."

        return "\n\n".join(text)
    except PyPDF2.errors.PdfReadError as e:
        raise HTTPException(status_code=422, detail=f"Error reading PDF: {
                            str(e)}. The file may be corrupted or password-protected.")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unexpected error while reading PDF: {str(e)}")


def read_docx(content: bytes) -> str:
    try:
        docx_file = io.BytesIO(content)
        doc = Document(docx_file)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text
    except Exception as e:
        raise HTTPException(
            status_code=422, detail=f"Error reading DOCX file: {str(e)}")


def read_txt(content: bytes) -> str:
    try:
        encoding = chardet.detect(content)['encoding']
        return content.decode(encoding or 'utf-8')
    except Exception as e:
        raise HTTPException(
            status_code=422, detail=f"Error reading TXT file: {str(e)}")


def read_csv(content: bytes) -> str:
    try:
        csv_file = io.StringIO(content.decode('utf-8'))
        df = pd.read_csv(csv_file)
        return df.to_string()
    except UnicodeDecodeError:
        try:
            encoding = chardet.detect(content)['encoding']
            csv_file = io.StringIO(content.decode(encoding or 'utf-8'))
            df = pd.read_csv(csv_file)
            return df.to_string()
        except Exception as e:
            raise HTTPException(
                status_code=422, detail=f"Error reading CSV file: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=422, detail=f"Error reading CSV file: {str(e)}")
