"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/Navbar"
import FacultyDashboard from "./FacultyDashboard"
import FacultyCourses from "./FacultyCourses"
import FacultyStudents from "./FacultyStudents"
import FacultyAttendance from "./FacultyAttendance"
import FacultyProfile from "../profile/FacultyProfile"

const FacultyPortal = () => {
  const { user } = useAuth()

  if (!user || user.role !== "faculty") {
    return <Navigate to="/faculty/auth" />
  }

  const navLinks = [
    { label: "Dashboard", path: "/faculty/dashboard" },
    { label: "Courses", path: "/faculty/courses" },
    { label: "Students", path: "/faculty/students" },
    { label: "Attendance", path: "/faculty/attendance" },
  ]

  return (
    <div>
      <Navbar links={navLinks} title="Faculty Portal" />
      <Routes>
        <Route path="/" element={<Navigate to="/faculty/dashboard" />} />
        <Route path="/dashboard" element={<FacultyDashboard />} />
        <Route path="/courses" element={<FacultyCourses />} />
        <Route path="/students" element={<FacultyStudents />} />
        <Route path="/attendance" element={<FacultyAttendance />} />
        <Route path="/profile" element={<FacultyProfile />} />
      </Routes>
    </div>
  )
}

export default FacultyPortal
