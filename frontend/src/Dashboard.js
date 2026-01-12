import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, resumeCourse } from "./api";
import "./styles.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load student dashboard
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard();
        setCourses(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  // Resume last lesson
  const handleResume = async (courseId) => {
    try {
      const data = await resumeCourse(courseId);

      if (data.lesson_id) {
        navigate(`/lesson/${data.lesson_id}`);
      } else {
        alert("No lesson to resume for this course");
      }
    } catch (err) {
      console.error("Resume error:", err);
      alert("Failed to resume course");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="container">
      <h2>📚 My Learning</h2>

      {courses.length === 0 && <p>No enrolled courses</p>}

      {courses.map((course) => (
        <div key={course.course_id} className="card">
          <h3>{course.course}</h3>

          {/* Progress Bar */}
          <div className="progress-bg">
            <div
              className="progress-fill"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <p>
            {course.completed} / {course.total} lessons completed
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => navigate(`/course/${course.course_id}`)}>
              View Lessons
            </button>

            <button onClick={() => handleResume(course.course_id)}>
              Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}