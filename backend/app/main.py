from fastapi import FastAPI
from app.routes.chat import router as chat_router
from app.routes.quiz import router as quiz_router

app = FastAPI(title="AI Tutor Chatbot")

app.include_router(chat_router)
app.include_router(quiz_router)


@app.get("/")
def home():
    return {"message": "AI Tutor Chatbot backend is running"}