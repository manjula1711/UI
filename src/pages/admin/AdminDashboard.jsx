"use client"

import { useData } from "../../context/DataContext"
import { Users, GraduationCap, BookOpen, UserCheck } from "lucide-react"

const AdminDashboard = () => {
  const { students, faculty, courses, enrollments } = useData()

  const enabledCourses = courses.filter((course) => course.enabled)
  const disabledCourses = courses.filter((course) => !course.enabled)

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      icon: <GraduationCap size={32} />,
      color: "#4285f4",
      bgColor: "#e3f2fd",
    },
    {
      label: "Total Faculty",
      value: faculty.length,
      icon: <Users size={32} />,
      color: "#34a853",
      bgColor: "#e8f5e8",
    },
    {
      label: "Total Courses",
      value: courses.length,
      icon: <BookOpen size={32} />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
    {
      label: "Total Enrollments",
      value: enrollments.length,
      icon: <UserCheck size={32} />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
    {
      label: "Active Courses",
      value: enabledCourses.length,
      icon: <BookOpen size={32} />,
      color: "#28a745",
      bgColor: "#d4edda",
    },
    {
      label: "Disabled Courses",
      value: disabledCourses.length,
      icon: <BookOpen size={32} />,
      color: "#dc3545",
      bgColor: "#f8d7da",
    },
  ]

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1 style={{ marginBottom: "30px", color: "#1a1a1a" }}>Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e0e0e0",
              transition: "transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: stat.color,
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </div>
              </div>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  backgroundColor: stat.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "20px", color: "#1a1a1a" }}>Recent Activities</h3>
          <div style={{ lineHeight: "2" }}>
            <p>• New faculty member added</p>
            <p>• {enrollments.length} students enrolled in courses</p>
            <p>• {enabledCourses.length} courses currently active</p>
            <p>• System running smoothly</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "20px", color: "#1a1a1a" }}>System Overview</h3>
          <div style={{ lineHeight: "2" }}>
            <p>• All systems operational</p>
            <p>• Database backup completed</p>
            <p>• User activity normal</p>
            <p>• No pending issues</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
