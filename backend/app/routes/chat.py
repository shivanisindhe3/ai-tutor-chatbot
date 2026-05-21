from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm_service import get_ai_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    user_question = request.question

    ai_answer = get_ai_response(user_question)

    return ChatResponse(answer=ai_answer)