import { useState } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ subject, question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("Error connecting to backend");
    }

    setLoading(false);
  };

  const generateQuiz = async () => {
    setLoading(true);
    setQuiz("");

    try {
      const response = await fetch("http://127.0.0.1:8000/quiz", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          subject,
          topic,
          number_of_questions: 3,
        }),
      });

      const data = await response.json();
      setQuiz(data.quiz);
    } catch {
      setQuiz("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Tutor Chatbot</h1>

      <input
        className="input-field"
        placeholder="Subject e.g. Python"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        className="textarea-field"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button className="ask-button" onClick={askQuestion}>
        Ask AI
      </button>

      <hr />

      <input
        className="input-field"
        placeholder="Quiz topic e.g. for loops"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button className="ask-button" onClick={generateQuiz}>
        Generate Quiz
      </button>

      {loading && <p>Loading...</p>}

      {answer && (
        <div className="answer-box">
          <h3>AI Response</h3>
          <p>{answer}</p>
        </div>
      )}

      {quiz && (
        <div className="answer-box">
          <h3>Quiz</h3>
          <p>{quiz}</p>
        </div>
      )}
    </div>
  );
}

export default App;