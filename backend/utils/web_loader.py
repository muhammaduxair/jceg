from langchain_community.document_loaders import WebBaseLoader
from fastapi import HTTPException


def load_web_document(url: str) -> str:
    try:
        loader = WebBaseLoader(url)
        return loader.load().pop().page_content
    except Exception as e:
        raise HTTPException(
            status_code=400, detail="Web document could not be loaded. Please check the URL.")
