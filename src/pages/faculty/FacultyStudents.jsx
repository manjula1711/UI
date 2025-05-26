"use client"

import { useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

const FacultyStudents = () => {
  const { user } = useAuth()
  const { courses, getCourseStudents, getAssignedStudents, getSelfEnrolledStudents, enrollments, students } = useData()
  const [selectedCourse, setSelectedCourse] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingStudent, setViewingStudent] = useState(null)

  const facultyCourses = courses.filter((course) => course.createdBy === user.id)

  const getFilteredStudents = () => {
    if (!selectedCourse) return []

    if (filterType === "all") {
      return getCourseStudents(selectedCourse)
    } else if (filterType === "self") {
      return getSelfEnrolledStudents(selectedCourse)
    } else if (filterType === "assigned") {
      return getAssignedStudents(user.id, selectedCourse)
    }

    return []
  }

  const filteredStudents = getFilteredStudents()

  const handleView = (student) => {
    setViewingStudent(student)
    setShowViewModal(true)
  }

  const getEnrollmentInfo = (studentId) => {
    const enrollment = enrollments.find((e) => e.studentId === studentId && e.courseId === selectedCourse)
    return enrollment
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1>Students</h1>

      <div className="grid grid-3" style={{ marginBottom: "20px" }}>
        <div className="form-group">
          <label>Select Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Select a course</option>
            {facultyCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.courseId})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Filter Students</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} disabled={!selectedCourse}>
            <option value="all">All Enrolled Students</option>
            <option value="self">Self Enrolled</option>
            <option value="assigned">Assigned Students</option>
          </select>
        </div>

        <div className="form-group">
          <label>Total Students</label>
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontWeight: "bold",
              color: "#007bff",
            }}
          >
            {filteredStudents.length}
          </div>
        </div>
      </div>

      {selectedCourse && (
        <div className="card">
          <h3>
            {filterType === "all" && "All Enrolled Students"}
            {filterType === "self" && "Self Enrolled Students"}
            {filterType === "assigned" && "Admin Assigned Students"}
          </h3>
          {filteredStudents.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Enrollment Type</th>
                  <th>Enrollment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const enrollmentInfo = getEnrollmentInfo(student.id)
                  return (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>
                        <span
                          style={{
                            color: enrollmentInfo?.type === "self" ? "#28a745" : "#007bff",
                            fontWeight: "500",
                          }}
                        >
                          {enrollmentInfo?.type === "self" ? "Self Enrolled" : "Admin Assigned"}
                        </span>
                      </td>
                      <td>{enrollmentInfo ? new Date(enrollmentInfo.enrolledAt).toLocaleDateString() : "N/A"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button className="btn btn-primary" onClick={() => handleView(student)}>
                            <Eye size={16} />
                          </button>
                          <button className="btn btn-secondary">
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-danger">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p>No students found for the selected filter.</p>
          )}
        </div>
      )}

      {!selectedCourse && (
        <div className="card">
          <p>Please select a course to view enrolled students.</p>
        </div>
      )}

      {showViewModal && viewingStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Student Details</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "15px",
                alignItems: "center",
                maxWidth: "500px",
              }}
            >
              <strong>Name:</strong>
              <span>{viewingStudent.name}</span>
              <strong>Roll Number:</strong>
              <span>{viewingStudent.rollNumber}</span>
              <strong>Email:</strong>
              <span>{viewingStudent.email}</span>
              <strong>Department:</strong>
              <span>{viewingStudent.department}</span>
              <strong>Mobile:</strong>
              <span>{viewingStudent.mobile || "N/A"}</span>
              <strong>Year:</strong>
              <span>{viewingStudent.year || "N/A"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FacultyStudents
