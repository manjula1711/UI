"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { User, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const Navbar = ({ links, title }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleProfileClick = () => {
    if (user && user.role !== "admin") {
      const basePath = `/${user.role}`
      navigate(`${basePath}/profile`)
    }
    setShowDropdown(false)
  }

  const getProfileIcon = () => {
    if (user && user.profileImage) {
      return (
        <img
          src={user.profileImage || "/placeholder.svg"}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #007bff",
          }}
        />
      )
    } else {
      return (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          <User size={20} />
        </div>
      )
    }
  }

  if (!user) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">{title}</div>

        <ul className="navbar-nav">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className={location.pathname === link.path ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="profile-dropdown" ref={dropdownRef}>
          <div onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }}>
            {getProfileIcon()}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {user.role !== "admin" && (
                <div className="dropdown-item" onClick={handleProfileClick}>
                  <User size={16} style={{ marginRight: "8px" }} />
                  My Profile
                </div>
              )}
              <div className="dropdown-item" onClick={handleLogout}>
                <LogOut size={16} style={{ marginRight: "8px" }} />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar