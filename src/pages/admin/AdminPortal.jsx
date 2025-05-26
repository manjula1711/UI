"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/Navbar"
import AdminDashboard from "./AdminDashboard"
import AdminFaculty from "./AdminFaculty"
import AdminStudent from "./AdminStudent"
import AdminCourses from "./AdminCourses"
import AssignStudents from "./AssignStudents"
import { useEffect } from "react"

const AdminPortal = () => {
  const { user, login, loading } = useAuth()

  useEffect(() => {
    // Auto-login admin if no user is present and we're on admin route
    if (!loading && !user) {
      const defaultAdmin = {
        id: "admin",
        name: "Administrator",
        email: "admin@university.com",
        role: "admin",
      }
      login(defaultAdmin)
    }
  }, [user, loading, login])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    )
  }

  // If no user after loading, show loading (will be handled by useEffect)
  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Initializing Admin Portal...
      </div>
    )
  }

  const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Faculty", path: "/admin/faculty" },
    { label: "Students", path: "/admin/students" },
    { label: "Courses", path: "/admin/courses" },
    { label: "Assign Students", path: "/admin/assign-students" },
  ]

  return (
    <div>
      <Navbar links={navLinks} title="Admin Portal" />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/faculty" element={<AdminFaculty />} />
        <Route path="/students" element={<AdminStudent />} />
        <Route path="/courses" element={<AdminCourses />} />
        <Route path="/assign-students" element={<AssignStudents />} />
      </Routes>
    </div>
  )
}

export default AdminPortal
