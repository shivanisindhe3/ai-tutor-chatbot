from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


# AI Tutor
def get_ai_response(question: str, subject: str) -> str:

    prompt = f"""
You are an AI tutor.

Subject: {subject}

Student Question:
{question}

Explain clearly in simple terms with examples.
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI tutor."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.5

        )

        return response.choices[0].message.content

    except Exception as e:

        return f"Groq API Error: {str(e)}"


# Quiz Generator
def generate_quiz(subject: str, topic: str, number_of_questions: int):

    prompt = f"""
Generate {number_of_questions} quiz questions for:

Subject: {subject}
Topic: {topic}

Include answers.
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": "You are a quiz generator."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.5

        )

        return response.choices[0].message.content

    except Exception as e:

        return f"Groq API Error: {str(e)}"


# Feedback Checker
def generate_feedback(question: str, student_answer: str, subject: str):

    prompt = f"""
You are an AI teacher.

Subject:
{subject}

Question:
{question}

Student Answer:
{student_answer}

Give:
1. Score out of 10
2. What is correct
3. What is missing
4. Improved answer
5. Memory tip
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": "You are an AI feedback evaluator."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4

        )

        return response.choices[0].message.content

    except Exception as e:

        return f"Groq API Error: {str(e)}"


# PDF Question Answering
def ask_from_pdf(question: str, context: str) -> str:

    prompt = f"""
You are an AI tutor.

Answer the student's question using ONLY the PDF context below.

PDF Context:
{context}

Student Question:
{question}

If the answer is not in the PDF context, say:
"I could not find this in the uploaded PDF."
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": "You answer questions from uploaded PDF notes."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3

        )

        return response.choices[0].message.content

    except Exception as e:

        return f"Groq API Error: {str(e)}"