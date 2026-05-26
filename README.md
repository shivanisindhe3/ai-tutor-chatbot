# AI Tutor & PDF Learning Assistant

A full-stack AI-powered learning platform built using React, FastAPI, Groq LLMs, and Retrieval-Augmented Generation (RAG) concepts.

---

# Features

- AI Tutor for subject-based explanations
- Quiz Generator
- AI Feedback Checker
- PDF Upload System
- PDF Question Answering
- Suggested PDF Questions
- Chat History using localStorage
- Markdown Rendering
- Modern ChatGPT-style UI
- FastAPI Backend
- React Frontend

---

# Tech Stack

## Frontend
- React
- Vite
- JavaScript
- React Markdown
- CSS

## Backend
- Python
- FastAPI
- Groq API
- Pydantic
- PyPDF
- Python Multipart

---

# Project Architecture

```text
React Frontend
      ↓
FastAPI Backend
      ↓
API Routes
      ↓
LLM Service
      ↓
Groq LLM
```

---

# RAG Flow

```text
Upload PDF
   ↓
Extract Text
   ↓
Split into Chunks
   ↓
Store PDF Chunks
   ↓
Ask Question
   ↓
LLM Answers Using PDF Context
```

---

# How To Run The Project

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside:

```text
backend/
```

Add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

# Current Features Implemented

- AI Tutor Chatbot
- Quiz Generator
- AI Feedback Checker
- PDF Upload & Question Answering
- Suggested Questions UI
- Chat History
- Loading State
- Markdown Answers
- Professional UI

---

# Future Improvements

- Vector Database Retrieval
- Semantic Search
- Multi-PDF Chat
- Source Citations
- User Authentication
- Streaming AI Responses
- Deployment

---

# Author

Built by Shivani Sindhe