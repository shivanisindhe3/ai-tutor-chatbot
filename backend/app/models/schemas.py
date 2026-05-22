from pydantic import BaseModel


class ChatRequest(BaseModel):
    subject: str
    question: str


class ChatResponse(BaseModel):
    answer: str


class QuizRequest(BaseModel):
    subject: str
    topic: str
    number_of_questions: int = 3


class QuizResponse(BaseModel):
    quiz: str


class FeedbackRequest(BaseModel):
    subject: str
    question: str
    student_answer: str


class FeedbackResponse(BaseModel):
    feedback: str