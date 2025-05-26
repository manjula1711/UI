"use client"
import { useAuth } from "../../context/AuthContext"
import { useData } from "../../context/DataContext"
import { BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"

const StudentDashboard = () => {
  const { user } = useAuth()
  const { getStudentCourses, courses } = useData()

  const enrolledCourses = getStudentCourses(user.id)
  const availableCourses = courses.filter(
    (course) => course.enabled && !enrolledCourses.some((ec) => ec.id === course.id),
  )

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: <BookOpen size={32} />,
      color: "#4285f4",
      bgColor: "#e3f2fd",
    },
    {
      label: "Available Courses",
      value: availableCourses.length,
      icon: <Clock size={32} />,
      color: "#34a853",
      bgColor: "#e8f5e8",
    },
    {
      label: "Attendance",
      value: "85%",
      icon: <CheckCircle size={32} />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
    {
      label: "Pending Tasks",
      value: "3",
      icon: <AlertCircle size={32} />,
      color: "#dc3545",
      bgColor: "#f8d7da",
    },
  ]

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <h1 style={{ marginBottom: "10px", color: "#1a1a1a" }}>Welcome, {user.name}!</h1>
      <p style={{ marginBottom: "30px", color: "#666", fontSize: "1.1rem" }}>Student ID: {user.rollNumber}</p>

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
          <p>• New assignment posted in Mathematics</p>
          <p>• Attendance marked for Physics lecture</p>
          <p>• Grade updated for Chemistry lab</p>
          <p>• {enrolledCourses.length} courses currently enrolled</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
