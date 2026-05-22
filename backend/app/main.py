from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.feedback import router as feedback_router

from app.routes.chat import router as chat_router
from app.routes.quiz import router as quiz_router

app = FastAPI(title="AI Tutor Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(quiz_router)
app.include_router(feedback_router)


@app.get("/")
def home():
    return {"message": "AI Tutor Chatbot backend is running"}
