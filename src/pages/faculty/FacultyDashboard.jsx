"use client"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"
import { BookOpen, Users, Clock } from "lucide-react"

const FacultyDashboard = () => {
  const { user } = useAuth()
  const { courses, getCourseStudents } = useData()

  const facultyCourses = courses.filter((course) => course.createdBy === user.id)
  const enabledCourses = facultyCourses.filter((course) => course.enabled)
  const totalStudents = facultyCourses.reduce((total, course) => {
    return total + getCourseStudents(course.id).length
  }, 0)

  const stats = [
    {
      label: "Total Courses",
      value: facultyCourses.length,
      icon: <BookOpen size={32} />,
      color: "#4285f4",
      bgColor: "#e3f2fd",
    },
    {
      label: "Active Courses",
      value: enabledCourses.length,
      icon: <BookOpen size={32} />,
      color: "#34a853",
      bgColor: "#e8f5e8",
    },
    {
      label: "Total Students",
      value: totalStudents,
      icon: <Users size={32} />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
    {
      label: "Pending Reviews",
      value: "5",
      icon: <Clock size={32} />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
  ]

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1 style={{ marginBottom: "10px", color: "#1a1a1a" }}>Welcome, {user.name}!</h1>
      <p style={{ marginBottom: "30px", color: "#666", fontSize: "1.1rem" }}>Faculty ID: {user.facultyId}</p>

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

      <div className="card">
        <h3 style={{ marginBottom: "20px", color: "#1a1a1a" }}>Recent Activity</h3>
        <div style={{ lineHeight: "2" }}>
          <p>• New student enrolled in Data Structures</p>
          <p>• Assignment submitted by 15 students</p>
          <p>• Attendance marked for today's lecture</p>
          <p>• {enabledCourses.length} courses currently active</p>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard
