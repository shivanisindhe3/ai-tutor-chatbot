from fastapi import APIRouter
from app.models.schemas import FeedbackRequest, FeedbackResponse
from app.services.llm_service import generate_feedback

router = APIRouter()


@router.post("/feedback", response_model=FeedbackResponse)
def feedback(request: FeedbackRequest):
    result = generate_feedback(
        request.subject,
        request.question,
        request.student_answer
    )

    return FeedbackResponse(feedback=result)