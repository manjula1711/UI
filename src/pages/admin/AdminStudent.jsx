"use client"

import { useState } from "react"
import { Plus, Edit, Eye, Trash2, Upload, Copy, EyeOff } from "lucide-react"
import { useData } from "../../context/DataContext"

const AdminStudent = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [showCSVModal, setShowCSVModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    password: "",
  })

  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingStudent, setViewingStudent] = useState(null)
  const [visiblePasswords, setVisiblePasswords] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingStudent) {
      updateStudent(editingStudent.id, formData)
    } else {
      addStudent({
        ...formData,
        createdAt: new Date().toISOString(),
      })
    }
    setShowModal(false)
    setEditingStudent(null)
    setFormData({ name: "", rollNumber: "", email: "", department: "", password: "" })
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      department: student.department,
      password: student.password,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id)
    }
  }

  const handleAddNew = () => {
    setEditingStudent(null)
    setFormData({ name: "", rollNumber: "", email: "", department: "", password: "" })
    setShowModal(true)
  }

  const handleCSVUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const csv = event.target.result
        const lines = csv.split("\n")
        const headers = lines[0].split(",")

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(",")
            const studentData = {
              name: values[0]?.trim(),
              email: values[1]?.trim(),
              mobile: values[2]?.trim(),
              department: values[3]?.trim(),
              year: values[4]?.trim(),
              rollNumber: `STU${Date.now()}${i}`,
              password: `${values[0]?.trim().toLowerCase()}123`,
              createdAt: new Date().toISOString(),
            }
            addStudent(studentData)
          }
        }
      }
      reader.readAsText(file)
      setShowCSVModal(false)
    }
  }

  const handleView = (student) => {
    setViewingStudent(student)
    setShowViewModal(true)
  }

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Student Management</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-secondary" onClick={() => setShowCSVModal(true)}>
            <Upload size={16} style={{ marginRight: "8px" }} />
            CSV Upload
          </button>
          <button className="btn btn-primary" onClick={handleAddNew}>
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add Student
          </button>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email</th>
              <th>Department</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "monospace" }}>
                      {visiblePasswords[student.id] ? student.password : "••••••••"}
                    </span>
                    <button
                      className="btn"
                      style={{ padding: "4px", minWidth: "auto" }}
                      onClick={() => togglePasswordVisibility(student.id)}
                    >
                      {visiblePasswords[student.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                      className="btn"
                      style={{ padding: "4px", minWidth: "auto" }}
                      onClick={() => copyPassword(student.password)}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button className="btn btn-secondary" onClick={() => handleEdit(student)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-primary" onClick={() => handleView(student)}>
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="AD">AD</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="Mech">Mech</option>
                  <option value="EEE">EEE</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? "Update" : "Add"} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCSVModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload Student CSV</h3>
            <p>CSV format: Name, Email, Mobile, Department, Year</p>
            <div className="form-group">
              <label>Select CSV File</label>
              <input type="file" accept=".csv" onChange={handleCSVUpload} />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowCSVModal(false)}>
                Cancel
              </button>
            </div>
          </div>
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
              <strong>Password:</strong>
              <span style={{ fontFamily: "monospace" }}>{viewingStudent.password}</span>
              <strong>Created At:</strong>
              <span>{new Date(viewingStudent.createdAt).toLocaleDateString()}</span>
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

export default AdminStudent
