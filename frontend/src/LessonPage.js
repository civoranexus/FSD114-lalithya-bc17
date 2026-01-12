import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLesson, submitQuiz } from "./api";
import "./styles.css";

export default function LessonPage() {
  const { id } = useParams();          // lesson id from URL
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLesson(id)
      .then(data => {
        setLesson(data || {}); // make sure we always have an object
        setLoading(false);
      })
      .catch(err => {
        console.error("Lesson fetch error:", err);
        setLesson({});
        setLoading(false);
      });
  }, [id]);

  const choose = (qid, opt) => {
    setAnswers({ ...answers, [qid]: opt });
  };

  const submit = async () => {
    if (!lesson.quiz_id) return;
    const data = await submitQuiz(lesson.quiz_id, answers);
    setResult(data);

    // if passed, auto move to next lesson
    if (data.passed) {
      setTimeout(() => {
        navigate(-1); // go back to lessons
      }, 2000);
    }
  };

  if (loading) return <p>Loading lesson...</p>;
  if (!lesson || Object.keys(lesson).length === 0) return <p>Lesson not found</p>;

  return (
    <div className="container">
      <button className="back" onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{lesson.title || "Untitled Lesson"}</h2>

      {lesson.video_url && (
        <video width="100%" controls>
          <source src={lesson.video_url} />
        </video>
      )}

      <p>{lesson.content || "No content available."}</p>

      <h3>Quiz</h3>

      {lesson.questions && lesson.questions.length > 0 ? (
        lesson.questions.map(q => (
          <div key={q.id} className="card">
            <p>{q.text}</p>

            {["A", "B", "C", "D"].map(opt => (
              <label key={opt} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === opt}
                  onChange={() => choose(q.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))
      ) : (
        <p className="alert">No quiz questions for this lesson.</p>
      )}

      {lesson.quiz_id && <button onClick={submit}>Submit Quiz</button>}

      {result && (
        <div className="card">
          <h3>Result</h3>
          <p>Score: {result.score}%</p>
          <p>{result.passed ? "✅ Passed — Next lesson unlocked!" : "❌ Failed — Try again"}</p>
        </div>
      )}
    </div>
  );
}