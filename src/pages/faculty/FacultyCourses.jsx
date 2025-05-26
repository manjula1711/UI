"use client"

import { useState } from "react"
import { Edit, Eye, Plus } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

const FacultyCourses = () => {
  const { user } = useAuth()
  const { courses, addCourse, updateCourse } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    description: "",
  })

  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingCourse, setViewingCourse] = useState(null)

  const facultyCourses = courses.filter((course) => course.createdBy === user.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCourse) {
      updateCourse(editingCourse.id, formData)
    } else {
      addCourse({
        ...formData,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
      })
    }
    setShowModal(false)
    setEditingCourse(null)
    setFormData({ name: "", courseId: "", description: "" })
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      courseId: course.courseId,
      description: course.description,
    })
    setShowModal(true)
  }

  const handleAddNew = () => {
    setEditingCourse(null)
    setFormData({ name: "", courseId: "", description: "" })
    setShowModal(true)
  }

  const handleView = (course) => {
    setViewingCourse(course)
    setShowViewModal(true)
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>My Courses</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add Course
        </button>
      </div>

      <div className="course-grid">
        {facultyCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3 className="course-title">{course.name}</h3>
            <div className="course-id">Course ID: {course.courseId}</div>
            <p className="course-description">{course.description}</p>
            <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "10px" }}>Created by: {user.name}</div>
            {!course.enabled && (
              <div style={{ color: "#dc3545", fontSize: "0.9rem", marginBottom: "10px" }}>Course disabled by Admin</div>
            )}
            <div className="course-actions">
              <button className="btn btn-secondary" onClick={() => handleEdit(course)} disabled={!course.enabled}>
                <Edit size={16} />
              </button>
              <button className="btn btn-primary" onClick={() => handleView(course)}>
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingCourse ? "Edit Course" : "Add New Course"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Course ID</label>
                <input
                  type="text"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? "Update" : "Add"} Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showViewModal && viewingCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Course Details</h3>
            <div className="profile-grid">
              <strong>Course Name:</strong>
              <span>{viewingCourse.name}</span>
              <strong>Course ID:</strong>
              <span>{viewingCourse.courseId}</span>
              <strong>Description:</strong>
              <span>{viewingCourse.description}</span>
              <strong>Created By:</strong>
              <span>{user.name}</span>
              <strong>Status:</strong>
              <span>{viewingCourse.enabled ? "Enabled" : "Disabled"}</span>
              <strong>Created At:</strong>
              <span>{new Date(viewingCourse.createdAt).toLocaleDateString()}</span>
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

export default FacultyCourses
