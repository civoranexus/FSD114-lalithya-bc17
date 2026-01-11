import { useEffect, useState } from "react"
import { getDashboard, resumeCourse } from "./api"
import "./styles.css"

export default function Dashboard({ openCourse, navigate }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDashboard()
      .then(data => {
        setCourses(data.courses || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Failed to load dashboard")
        setLoading(false)
      })
  }, [])

  // 🔄 Loading state
  if (loading) {
    return <div className="spinner">Loading dashboard...</div>
  }

  // ❌ Error state
  if (error) {
    return <div className="error">{error}</div>
  }

  // 📭 Empty state
  if (courses.length === 0) {
    return <p>No courses enrolled yet.</p>
  }

  // ▶ Resume handler
  const handleResume = (courseId) => {
    resumeCourse(courseId).then(data => {
      navigate(`/course/${courseId}/lesson/${data.lesson_id}`)
    })
  }

  return (
    <div className="container">
      <h2>My Learning</h2>

      {courses.map(course => (
        <div key={course.course_id} className="card">
          <h3>{course.course}</h3>

          {/* Progress Bar */}
          <div className="progress-bg">
            <div
              className="progress-fill"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>

          <p>
            {course.completed} / {course.total_lessons} lessons completed
          </p>

          <div className="btn-group">
            <button onClick={() => openCourse(course.course_id)}>
              View Lessons
            </button>

            <button onClick={() => handleResume(course.course_id)}>
              Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}