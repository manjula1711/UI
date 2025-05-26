"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"

const StudentAuth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()
  const { students } = useData()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    const student = students.find((s) => s.email === email && s.password === password)

    if (student) {
      login({ ...student, role: "student" })
      navigate("/student/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Student Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "20px" }}>
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentAuth
