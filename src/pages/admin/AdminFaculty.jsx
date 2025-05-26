"use client"

import { useState } from "react"
import { Plus, Edit, Eye, Trash2, Upload, Copy, EyeOff } from "lucide-react"
import { useData } from "../../context/DataContext"

const AdminFaculty = () => {
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [showCSVModal, setShowCSVModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    email: "",
    department: "",
    password: "",
  })

  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingFaculty, setViewingFaculty] = useState(null)
  const [visiblePasswords, setVisiblePasswords] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingFaculty) {
      updateFaculty(editingFaculty.id, formData)
    } else {
      addFaculty({
        ...formData,
        createdAt: new Date().toISOString(),
      })
    }
    setShowModal(false)
    setEditingFaculty(null)
    setFormData({ name: "", facultyId: "", email: "", department: "", password: "" })
  }

  const handleEdit = (facultyMember) => {
    setEditingFaculty(facultyMember)
    setFormData({
      name: facultyMember.name,
      facultyId: facultyMember.facultyId,
      email: facultyMember.email,
      department: facultyMember.department,
      password: facultyMember.password,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      deleteFaculty(id)
    }
  }

  const handleAddNew = () => {
    setEditingFaculty(null)
    setFormData({ name: "", facultyId: "", email: "", department: "", password: "" })
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
            const facultyData = {
              name: values[0]?.trim(),
              email: values[1]?.trim(),
              mobile: values[2]?.trim(),
              department: values[3]?.trim(),
              year: values[4]?.trim(),
              facultyId: `FAC${Date.now()}${i}`,
              password: `${values[0]?.trim().toLowerCase()}123`,
              createdAt: new Date().toISOString(),
            }
            addFaculty(facultyData)
          }
        }
      }
      reader.readAsText(file)
      setShowCSVModal(false)
    }
  }

  const handleView = (facultyMember) => {
    setViewingFaculty(facultyMember)
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
        <h1>Faculty Management</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-secondary" onClick={() => setShowCSVModal(true)}>
            <Upload size={16} style={{ marginRight: "8px" }} />
            CSV Upload
          </button>
          <button className="btn btn-primary" onClick={handleAddNew}>
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add Faculty
          </button>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Faculty ID</th>
              <th>Email</th>
              <th>Department</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((facultyMember) => (
              <tr key={facultyMember.id}>
                <td>{facultyMember.name}</td>
                <td>{facultyMember.facultyId}</td>
                <td>{facultyMember.email}</td>
                <td>{facultyMember.department}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "monospace" }}>
                      {visiblePasswords[facultyMember.id] ? facultyMember.password : "••••••••"}
                    </span>
                    <button
                      className="btn"
                      style={{ padding: "4px", minWidth: "auto" }}
                      onClick={() => togglePasswordVisibility(facultyMember.id)}
                    >
                      {visiblePasswords[facultyMember.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                      className="btn"
                      style={{ padding: "4px", minWidth: "auto" }}
                      onClick={() => copyPassword(facultyMember.password)}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button className="btn btn-secondary" onClick={() => handleEdit(facultyMember)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-primary" onClick={() => handleView(facultyMember)}>
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(facultyMember.id)}>
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
            <h3>{editingFaculty ? "Edit Faculty" : "Add New Faculty"}</h3>
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
                <label>Faculty ID</label>
                <input
                  type="text"
                  value={formData.facultyId}
                  onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
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
                  {editingFaculty ? "Update" : "Add"} Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCSVModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload Faculty CSV</h3>
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

      {showViewModal && viewingFaculty && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Faculty Details</h3>
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
              <span>{viewingFaculty.name}</span>
              <strong>Faculty ID:</strong>
              <span>{viewingFaculty.facultyId}</span>
              <strong>Email:</strong>
              <span>{viewingFaculty.email}</span>
              <strong>Department:</strong>
              <span>{viewingFaculty.department}</span>
              <strong>Mobile:</strong>
              <span>{viewingFaculty.mobile || "N/A"}</span>
              <strong>Password:</strong>
              <span style={{ fontFamily: "monospace" }}>{viewingFaculty.password}</span>
              <strong>Created At:</strong>
              <span>{new Date(viewingFaculty.createdAt).toLocaleDateString()}</span>
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

export default AdminFaculty
