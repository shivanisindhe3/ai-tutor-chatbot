from fastapi import APIRouter
from app.models.schemas import QuizRequest, QuizResponse
from app.services.llm_service import generate_quiz

router = APIRouter()


@router.post("/quiz", response_model=QuizResponse)
def quiz(request: QuizRequest):
    quiz_result = generate_quiz(
        request.subject,
        request.topic,
        request.number_of_questions
    )

    return QuizResponse(quiz=quiz_result)