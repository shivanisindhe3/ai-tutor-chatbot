import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const [feedbackQuestion, setFeedbackQuestion] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfMessage, setPdfMessage] = useState("");
  const [pdfQuestion, setPdfQuestion] = useState("");
  const [pdfAnswer, setPdfAnswer] = useState("");

  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Summarize this PDF",
    "Explain the key concepts",
    "Generate quiz questions from this PDF",
    "What are the important topics?",
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");

    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

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

      const newChat = {
        subject,
        question,
        answer: data.answer,
      };

      const updatedHistory = [newChat, ...chatHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    } catch (error) {
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
          subject,
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

  const uploadPdf = async () => {
    if (!pdfFile) {
      setPdfMessage("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setPdfMessage("");

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPdfMessage(`${data.message}. Total chunks: ${data.total_chunks}`);
    } catch (error) {
      setPdfMessage("Error uploading PDF");
    }

    setLoading(false);
  };

  const askPdf = async (customQuestion = null) => {
    const finalQuestion = customQuestion || pdfQuestion;

    if (!finalQuestion.trim()) {
      setPdfAnswer("Please enter a PDF question first.");
      return;
    }

    setLoading(true);
    setPdfAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/ask-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
        }),
      });

      const data = await response.json();

      setPdfQuestion(finalQuestion);
      setPdfAnswer(data.answer);
    } catch (error) {
      setPdfAnswer("Error asking PDF");
    }

    setLoading(false);
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>AI Tutor</h2>

        <div className="sidebar-item">Chat Tutor</div>
        <div className="sidebar-item">Quiz Generator</div>
        <div className="sidebar-item">Feedback Checker</div>
        <div className="sidebar-item">PDF Learning</div>

        <button className="ask-button" onClick={clearHistory}>
          Clear History
        </button>

        <h3>History</h3>

        {chatHistory.slice(0, 5).map((chat, index) => (
          <div key={index} className="sidebar-item">
            {chat.subject}: {chat.question.slice(0, 30)}...
          </div>
        ))}
      </aside>

      <main className="main-content">
        <div className="app-container">
          <h1 className="title">AI Tutor Chatbot</h1>

          <div className="section-card">
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

            {answer && (
              <>
                <div className="chat-message user-message">
                  <strong>You:</strong> {question}
                </div>

                <div className="chat-message ai-message">
                  <strong>AI Tutor:</strong>
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
              </>
            )}
          </div>

          <div className="section-card">
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

            {quiz && (
              <div className="answer-box">
                <h3>Quiz</h3>
                <ReactMarkdown>{quiz}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className="section-card">
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

            {feedback && (
              <div className="answer-box">
                <h3>AI Feedback</h3>
                <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className="section-card">
            <h2>PDF Learning Assistant</h2>

            <input
              type="file"
              accept="application/pdf"
              className="input-field"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />

            {pdfFile && (
              <div className="uploaded-file">
                Uploaded File: {pdfFile.name}
              </div>
            )}

            <button className="ask-button" onClick={uploadPdf}>
              Upload PDF
            </button>

            {pdfMessage && (
              <div className="answer-box">
                <p>{pdfMessage}</p>
              </div>
            )}

            <div className="suggested-questions">
              <h3>Suggested Questions</h3>

              {suggestedQuestions.map((item, index) => (
                <button
                  key={index}
                  className="ask-button"
                  onClick={() => {
                    setPdfQuestion(item);
                    askPdf(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <textarea
              className="textarea-field"
              placeholder="Ask a question from the uploaded PDF..."
              value={pdfQuestion}
              onChange={(e) => setPdfQuestion(e.target.value)}
            />

            <button className="ask-button" onClick={() => askPdf()}>
              Ask PDF
            </button>

            {pdfAnswer && (
              <div className="answer-box">
                <h3>PDF Answer</h3>
                <ReactMarkdown>{pdfAnswer}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className="section-card">
            <h2>Full Chat History</h2>

            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="chat-message user-message">
                  <strong>You:</strong> {chat.question}
                </div>

                <div className="chat-message ai-message">
                  <strong>AI Tutor:</strong>
                  <ReactMarkdown>{chat.answer}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {loading && (
  <div className="loading-box">
    AI is thinking...
  </div>
)}
        </div>
      </main>
    </div>
  );
}

export default App;