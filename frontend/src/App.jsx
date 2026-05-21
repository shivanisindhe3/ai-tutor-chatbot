import { useState } from "react";

function App() {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject: subject,
          question: question,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {
      setAnswer("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h1>AI Tutor Chatbot</h1>

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={askQuestion} style={styles.button}>
        Ask AI
      </button>

      {loading && <p>Loading...</p>}

      {answer && (
        <div style={styles.answerBox}>
          <h3>AI Response:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    marginTop: "50px",
    fontFamily: "Arial",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  },

  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    marginBottom: "20px",
  },

  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },

  answerBox: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid gray",
    borderRadius: "10px",
  },
};

export default App;