from dotenv import dotenv_values
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"

config = dotenv_values(env_path)

GROQ_API_KEY = config.get("GROQ_API_KEY")