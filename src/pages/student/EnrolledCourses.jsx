"use client"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

const EnrolledCourses = () => {
  const { user } = useAuth()
  const { getStudentCourses, unenrollStudent } = useData()

  const enrolledCourses = getStudentCourses(user.id)

  const handleDrop = (courseId) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      unenrollStudent(user.id, courseId)
    }
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1>Enrolled Courses</h1>

      <div className="course-grid">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3 className="course-title">{course.name}</h3>
            <div className="course-id">Course ID: {course.courseId}</div>
            <p className="course-description">{course.description}</p>
            <div className="course-actions">
              <button className="btn btn-danger" onClick={() => handleDrop(course.id)}>
                Drop
              </button>
            </div>
          </div>
        ))}
      </div>

      {enrolledCourses.length === 0 && (
        <div className="card">
          <p>You are not enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses
