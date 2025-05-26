"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/Navbar"
import StudentDashboard from "./StudentDashboard"
import AvailableCourses from "./AvailableCourses"
import EnrolledCourses from "./EnrolledCourses"
import StudentProfile from "../profile/StudentProfile"

const StudentPortal = () => {
  const { user } = useAuth()

  if (!user || user.role !== "student") {
    return <Navigate to="/student/auth" />
  }

  const navLinks = [
    { label: "Dashboard", path: "/student/dashboard" },
    { label: "Available Courses", path: "/student/available-courses" },
    { label: "Enrolled Courses", path: "/student/enrolled-courses" },
  ]

  return (
    <div>
      <Navbar links={navLinks} title="Student Portal" />
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/available-courses" element={<AvailableCourses />} />
        <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </div>
  )
}

export default StudentPortal
