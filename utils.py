import os
from fastapi import UploadFile
import os
import tempfile
from docx import Document
import csv


def extract_text_from_file(file: UploadFile) -> str:
    _, ext = os.path.splitext(file.filename)
    ext = ext.lower()
    text = ""

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp_file:
        temp_file.write(file.file.read())
        temp_path = temp_file.name

    if ext == ".pdf":
        from PyPDF2 import PdfReader
        reader = PdfReader(temp_path)
        text = "\n".join(page.extract_text() for page in reader.pages)

    elif ext == ".docx":
        doc = Document(temp_path)
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs)

    elif ext == ".txt":
        with open(temp_path, "r", encoding="utf-8") as f:
            text = f.read()

    elif ext == ".csv":
        with open(temp_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            text = "\n".join([", ".join(row) for row in reader])

    os.remove(temp_path)
    return text
