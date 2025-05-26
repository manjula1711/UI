"use client"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

const AvailableCourses = () => {
  const { user } = useAuth()
  const { courses, enrollments, enrollStudent } = useData()

  const availableCourses = courses.filter((course) => {
    const isEnrolled = enrollments.some((e) => e.studentId === user.id && e.courseId === course.id)
    return course.enabled && !isEnrolled
  })

  const handleEnroll = (courseId) => {
    enrollStudent(user.id, courseId)
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1>Available Courses</h1>

      <div className="course-grid">
        {availableCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3 className="course-title">{course.name}</h3>
            <div className="course-id">Course ID: {course.courseId}</div>
            <p className="course-description">{course.description}</p>
            <div className="course-actions">
              <button className="btn btn-primary" onClick={() => handleEnroll(course.id)}>
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {availableCourses.length === 0 && (
        <div className="card">
          <p>No available courses at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default AvailableCourses
