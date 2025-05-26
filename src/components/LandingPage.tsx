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
    <div className="landing-container">
      <h1 className="landing-title">University Management System</h1>
      <p className="landing-subtitle">
        Streamlined academic administration for students, faculty, and administrators
      </p>
      <div className="role-cards">
        {roles.map((role, index) => (
          <div
            key={index}
            className="role-card"
            onClick={() => handleRoleClick(role.path)}
            style={{
              borderTop: `6px solid ${role.color}`,
            }}
          >
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
            <h3 className="role-title">{role.title}</h3>
            <p className="role-description">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage