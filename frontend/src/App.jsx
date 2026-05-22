import { useState } from "react";
import "./App.css";

function App() {

  // Tutor states
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Quiz states
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  // Feedback states
  const [feedbackQuestion, setFeedbackQuestion] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);


  // Ask AI Tutor
  const askQuestion = async () => {

    setLoading(true);
    setAnswer("");

    try {

      const response = await fetch("http://127.0.0.1:8000/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject,
          question,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {

      setAnswer("Error connecting to backend");

    }

    setLoading(false);
  };


  // Generate Quiz
  const generateQuiz = async () => {

    setLoading(true);
    setQuiz("");

    try {

      const response = await fetch("http://127.0.0.1:8000/quiz", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject,
          topic,
          number_of_questions: 3,
        }),
      });

      const data = await response.json();

      setQuiz(data.quiz);

    } catch (error) {

      setQuiz("Error connecting to backend");

    }

    setLoading(false);
  };


  // Generate Feedback
  const generateFeedback = async () => {

    setLoading(true);
    setFeedback("");

    try {

      const response = await fetch("http://127.0.0.1:8000/feedback", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject: subject,
          question: feedbackQuestion,
          student_answer: studentAnswer,
        }),
      });

      const data = await response.json();

      setFeedback(data.feedback);

    } catch (error) {

      setFeedback("Error connecting to backend");

    }

    setLoading(false);
  };


  return (

    <div className="app-container">

      <h1 className="title">AI Tutor Chatbot</h1>

      {/* Tutor Section */}

      <h2>AI Tutor</h2>

      <input
        className="input-field"
        placeholder="Enter Subject"
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


      {/* Quiz Section */}

      <hr />

      <h2>Quiz Generator</h2>

      <input
        className="input-field"
        placeholder="Quiz topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button className="ask-button" onClick={generateQuiz}>
        Generate Quiz
      </button>


      {/* Feedback Section */}

      <hr />

      <h2>AI Feedback Checker</h2>

      <input
        className="input-field"
        placeholder="Enter Question"
        value={feedbackQuestion}
        onChange={(e) => setFeedbackQuestion(e.target.value)}
      />

      <textarea
        className="textarea-field"
        placeholder="Write your answer..."
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
      />

      <button className="ask-button" onClick={generateFeedback}>
        Check Answer
      </button>


      {/* Loading */}

      {loading && <p>Loading...</p>}


      {/* Tutor Response */}

      {answer && (
        <div className="answer-box">
          <h3>AI Response</h3>
          <p>{answer}</p>
        </div>
      )}


      {/* Quiz Response */}

      {quiz && (
        <div className="answer-box">
          <h3>Quiz</h3>
          <p>{quiz}</p>
        </div>
      )}


      {/* Feedback Response */}

      {feedback && (
        <div className="answer-box">
          <h3>AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}

    </div>
  );
}

export default App;