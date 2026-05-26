import os

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.text_chunker import chunk_text
from app.services.llm_service import ask_from_pdf

router = APIRouter()

UPLOAD_FOLDER = "uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

pdf_chunks = []


class PDFQuestionRequest(BaseModel):
    question: str


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_chunks

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)
    pdf_chunks = chunk_text(extracted_text)

    return {
        "filename": file.filename,
        "message": "PDF uploaded and chunked successfully",
        "total_chunks": len(pdf_chunks),
        "sample_chunk": pdf_chunks[0],
    }


@router.post("/ask-pdf")
def ask_pdf(request: PDFQuestionRequest):
    if not pdf_chunks:
        return {"answer": "Please upload a PDF first."}

    context = "\n\n".join(pdf_chunks[:5])
    answer = ask_from_pdf(request.question, context)

    return {"answer": answer}