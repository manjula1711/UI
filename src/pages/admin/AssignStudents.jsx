"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"

const AssignStudents = () => {
  const { students, faculty, courses, assignStudentsToFaculty, getCourseStudents, enrollments } = useData()
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState([])

  const departments = ["AD", "IT", "ECE", "Mech", "EEE"]

  const filteredFaculty = selectedDepartment ? faculty.filter((f) => f.department === selectedDepartment) : faculty

  const filteredStudents = selectedDepartment ? students.filter((s) => s.department === selectedDepartment) : students

  const availableCourses = selectedDepartment
    ? courses.filter((c) => {
        const courseCreator = faculty.find((f) => f.id === c.createdBy)
        return courseCreator && courseCreator.department === selectedDepartment && c.enabled
      })
    : courses.filter((c) => c.enabled)

  const selectedCourseData = courses.find((c) => c.id === selectedCourse)
  const courseCreator = selectedCourseData ? faculty.find((f) => f.id === selectedCourseData.createdBy) : null

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId)
      } else if (prev.length < 30) {
        return [...prev, studentId]
      }
      return prev
    })
  }

  const handleFacultySelect = (facultyId) => {
    setSelectedFaculty((prev) => {
      if (prev.includes(facultyId)) {
        return prev.filter((id) => id !== facultyId)
      } else {
        return [...prev, facultyId]
      }
    })
  }

  const handleBulkAssign = () => {
    if (selectedCourse && selectedStudents.length > 0 && selectedFaculty.length > 0) {
      selectedFaculty.forEach((facultyId) => {
        assignStudentsToFaculty(selectedStudents, selectedCourse, facultyId)
      })
      setSelectedStudents([])
      setSelectedFaculty([])
      alert(`${selectedStudents.length} students assigned to ${selectedFaculty.length} faculty member(s) successfully!`)
    }
  }

  const enrolledStudents = selectedCourse ? getCourseStudents(selectedCourse) : []

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1>Assign Students to Faculty</h1>

      <div className="grid grid-3" style={{ marginBottom: "20px" }}>
        <div className="form-group">
          <label>Filter by Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value)
              setSelectedCourse("")
              setSelectedStudents([])
              setSelectedFaculty([])
            }}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value)
              setSelectedStudents([])
              setSelectedFaculty([])
            }}
          >
            <option value="">Select a course</option>
            {availableCourses.map((course) => {
              const creator = faculty.find((f) => f.id === course.createdBy)
              return (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.courseId}) - {creator?.name}
                </option>
              )
            })}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "end" }}>
          <button
            className="btn btn-primary"
            onClick={handleBulkAssign}
            disabled={!selectedCourse || selectedStudents.length === 0 || selectedFaculty.length === 0}
          >
            Assign Selected ({selectedStudents.length})
          </button>
        </div>
      </div>

      {selectedCourse && courseCreator && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <h3>Course Information</h3>
          <div className="profile-grid">
            <strong>Course:</strong>
            <span>{selectedCourseData.name}</span>
            <strong>Course ID:</strong>
            <span>{selectedCourseData.courseId}</span>
            <strong>Faculty:</strong>
            <span>{courseCreator.name}</span>
            <strong>Department:</strong>
            <span>{courseCreator.department}</span>
            <strong>Already Enrolled:</strong>
            <span>{enrolledStudents.length} students</span>
          </div>
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <h3>Faculty ({filteredFaculty.length})</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Faculty ID</th>
                  <th>Department</th>
                  <th>Courses</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((facultyMember) => {
                  const facultyCourses = courses.filter((c) => c.createdBy === facultyMember.id && c.enabled)
                  return (
                    <tr key={facultyMember.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedFaculty.includes(facultyMember.id)}
                          onChange={() => handleFacultySelect(facultyMember.id)}
                          disabled={!selectedCourse}
                        />
                      </td>
                      <td>{facultyMember.name}</td>
                      <td>{facultyMember.facultyId}</td>
                      <td>{facultyMember.department}</td>
                      <td>{facultyCourses.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>Students ({filteredStudents.length}) - Max 30 selections</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const isEnrolled = selectedCourse
                    ? enrollments.some((e) => e.studentId === student.id && e.courseId === selectedCourse)
                    : false
                  const enrollmentType = selectedCourse
                    ? enrollments.find((e) => e.studentId === student.id && e.courseId === selectedCourse)?.type
                    : null

                  return (
                    <tr key={student.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                          disabled={
                            (!selectedStudents.includes(student.id) && selectedStudents.length >= 30) || !selectedCourse
                          }
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.department}</td>
                      <td>
                        {isEnrolled ? (
                          <span style={{ color: enrollmentType === "self" ? "#28a745" : "#007bff" }}>
                            {enrollmentType === "self" ? "Self Enrolled" : "Assigned"}
                          </span>
                        ) : (
                          <span style={{ color: "#666" }}>Not Enrolled</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignStudents
