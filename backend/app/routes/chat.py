from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import get_ai_response

router = APIRouter()


class ChatRequest(BaseModel):
    subject: str
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    ai_answer = get_ai_response(
        request.question,
        request.subject
    )

    return {
        "answer": ai_answer
    }