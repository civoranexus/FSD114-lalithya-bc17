import { useState } from "react";
import {
  login,
  getDashboard,
  getCourseLessons,
  resumeCourse
} from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [dashboard, setDashboard] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* ---------------- LOGIN ---------------- */

  const handleLogin = async () => {
    const data = await login(username, password);

    if (data.access) {
      localStorage.setItem("token", data.access);
      setLoggedIn(true);
      alert("Login successful ✅");
      loadDashboard();
    } else {
      alert("Login failed ❌");
    }
  };

  /* ---------------- DASHBOARD ---------------- */

  const loadDashboard = async () => {
    const data = await getDashboard();
    setDashboard(data);
  };

  /* ---------------- COURSE ---------------- */

  const openCourse = async (courseId) => {
    setSelectedCourse(courseId);
    const data = await getCourseLessons(courseId);
    setLessons(data);
  };

  const resume = async (courseId) => {
    const data = await resumeCourse(courseId);
    alert(
      `Resume: ${data.title} (Lesson ${data.order})`
    );
  };

  /* ---------------- UI ---------------- */

  if (!loggedIn) {
    return (
      <div style={{ padding: 30 }}>
        <h2>EduVillage Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Student Dashboard</h2>

      {dashboard.map(d => (
        <div
          key={d.course_id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10
          }}
        >
          <h3>{d.course}</h3>

          <p>
            Progress: {d.completed}/{d.total} (
            {d.progress}%)
          </p>

          <div
            style={{
              width: "100%",
              background: "#eee",
              borderRadius: 6
            }}
          >
            <div
              style={{
                width: `${d.progress}%`,
                background: "#4f46e5",
                color: "white",
                padding: 5,
                borderRadius: 6
              }}
            >
              {d.progress}%
            </div>
          </div>

          <br />

          <button onClick={() => openCourse(d.course_id)}>
            View Lessons
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => resume(d.course_id)}
          >
            Resume
          </button>
        </div>
      ))}

      {selectedCourse && (
        <>
          <h3>Lessons</h3>

          {lessons.map(l => (
            <div key={l.id}>
              {l.order}. {l.title}{" "}
              {l.unlocked ? "🔓" : "🔒"}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;