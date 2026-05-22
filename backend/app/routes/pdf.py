import os

from fastapi import APIRouter, UploadFile, File

from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.text_chunker import chunk_text

router = APIRouter()

UPLOAD_FOLDER = "uploaded_files"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)

    chunks = chunk_text(extracted_text)

    return {

        "filename": file.filename,

        "message": "PDF uploaded and chunked successfully",

        "total_chunks": len(chunks),

        "sample_chunk": chunks[0]

    }