"use client"
import { useNavigate } from "react-router-dom"
import { GraduationCap, Users, Settings } from "lucide-react"

const LandingPage = () => {
  const navigate = useNavigate()

  const roles = [
    {
      title: "Student Portal",
      description: "Access courses, view attendance, and manage your academic journey",
      icon: <GraduationCap size={48} />,
      path: "/student/auth",
      color: "#4285f4",
      bgColor: "#e3f2fd",
    },
    {
      title: "Faculty Portal",
      description: "Manage courses, track student progress, and handle academic administration",
      icon: <Users size={48} />,
      path: "/faculty/auth",
      color: "#34a853",
      bgColor: "#e8f5e8",
    },
    {
      title: "Admin Portal",
      description: "Complete system administration, user management, and institutional oversight",
      icon: <Settings size={48} />,
      path: "/admin/dashboard",
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
  ]

  const handleRoleClick = (path) => {
    navigate(path)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
        >
          University Management System
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#666666",
            lineHeight: "1.6",
            margin: "0",
          }}
        >
          Streamlined academic administration for students, faculty, and administrators
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => handleRoleClick(role.path)}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "40px 30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)"
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "6px",
                backgroundColor: role.color,
              }}
            />

            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: role.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                color: role.color,
              }}
            >
              {role.icon}
            </div>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              {role.title}
            </h3>

            <p
              style={{
                color: "#666666",
                lineHeight: "1.6",
                marginBottom: "32px",
                fontSize: "1rem",
              }}
            >
              {role.description}
            </p>

            <button
              style={{
                backgroundColor: role.color,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 32px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1"
              }}
            >
              Access Portal
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
