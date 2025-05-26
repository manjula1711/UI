"use client"
import { useData } from "../../context/DataContext"

const AdminCourses = () => {
  const { courses, faculty, updateCourse } = useData()

  const handleToggleCourse = (courseId, enabled) => {
    updateCourse(courseId, { enabled: !enabled })
  }

  const getFacultyName = (facultyId) => {
    const facultyMember = faculty.find((f) => f.id === facultyId)
    return facultyMember ? facultyMember.name : "Unknown"
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1>Course Management</h1>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course ID</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.courseId}</td>
                <td>{getFacultyName(course.createdBy)}</td>
                <td>
                  <span
                    style={{
                      color: course.enabled ? "#28a745" : "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    {course.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={course.enabled}
                      onChange={() => handleToggleCourse(course.id, course.enabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && (
        <div className="card">
          <p>No courses available.</p>
        </div>
      )}
    </div>
  )
}

export default AdminCourses
