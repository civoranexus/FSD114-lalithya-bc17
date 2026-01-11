import { useEffect, useState } from "react"
import { getCourseLessons } from "./api"
import "./styles.css"

export default function CoursePage({ courseId, goBack, openLesson }) {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCourseLessons(courseId).then(data => {
      setLessons(data)
      setLoading(false)
    })
  }, [courseId])

  if (loading) return <p>Loading lessons...</p>

  return (
    <div className="container">
      <button onClick={goBack}>⬅ Back</button>
      <h2>Lessons</h2>

      {lessons.map(l => (
        <div key={l.id} className="card">
          <span>{l.order}. {l.title}</span>

          <button
            disabled={!l.can_access}
            onClick={() => l.can_access && openLesson(l.id)}
            className={l.can_access ? "lesson-open" : "lesson-locked"}
          >
            {l.can_access ? "Open" : "Locked"}
          </button>
        </div>
      ))}
    </div>
  )
}