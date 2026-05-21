from groq import Groq
from app.config import GROQ_API_KEY

print("LOADED GROQ KEY:", GROQ_API_KEY)

client = Groq(api_key=GROQ_API_KEY)


def get_ai_response(question: str) -> str:

    prompt = f"""
You are a friendly AI tutor.

Explain clearly for beginners.
Use simple language.
Give one simple example.
End with one practice question.

Student question:
{question}
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
def generate_quiz(subject: str, topic: str, number_of_questions: int) -> str:

    prompt = f"""
You are an expert {subject} tutor.

Generate {number_of_questions} beginner-friendly quiz questions on:

Topic: {topic}

For each question:
- Ask the question
- Give 4 options
- Mention the correct answer
- Give a short explanation
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": f"You are an expert {subject} tutor."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Groq API Error: {str(e)}"