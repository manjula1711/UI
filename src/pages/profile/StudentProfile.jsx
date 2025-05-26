"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const StudentProfile = () => {
  const { user, updateProfile } = useAuth()
  const [activeSection, setActiveSection] = useState("view")
  const [editSection, setEditSection] = useState("basic")
  const [profileData, setProfileData] = useState({
    ...user,
    dob: user.dob || "",
    gender: user.gender || "",
    fatherName: user.fatherName || "",
    motherName: user.motherName || "",
    firstGraduate: user.firstGraduate || "No",
    github: user.github || "",
    linkedin: user.linkedin || "",
    education: user.education || {
      tenth: { institution: "", startYear: "", endYear: "", percentage: "" },
      twelfth: { institution: "", startYear: "", endYear: "", percentage: "" },
      college: { institution: "", startYear: "", endYear: "", cgpa: "" },
    },
  })

  const handleSave = () => {
    updateProfile(profileData)
    setActiveSection("view")
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileData({ ...profileData, profileImage: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const getProfileDisplay = () => {
    if (profileData.profileImage) {
      return (
        <img
          src={profileData.profileImage || "/placeholder.svg"}
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #007bff",
            marginBottom: "20px",
          }}
        />
      )
    } else {
      return (
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            marginBottom: "20px",
            border: "4px solid #007bff",
          }}
        >
          <User size={48} />
        </div>
      )
    }
  }

  const renderViewProfile = () => (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {getProfileDisplay()}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "15px",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <strong>Name:</strong>
        <span>{user.name}</span>
        <strong>Email:</strong>
        <span>{user.email}</span>
        <strong>Roll Number:</strong>
        <span>{user.rollNumber}</span>
        <strong>Department:</strong>
        <span>{user.department}</span>
      </div>
      <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => setActiveSection("edit")}>
          Edit Profile
        </button>
        <button className="btn btn-secondary">View Profile</button>
      </div>
    </div>
  )

  const renderBasicDetails = () => (
    <div>
      <h3>Basic Details</h3>
      <div className="form-group">
        <label>Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {profileData.profileImage && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={profileData.profileImage || "/placeholder.svg"}
              alt="Preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Name (Non-editable)</label>
        <input type="text" value={profileData.name} disabled />
      </div>
      <div className="form-group">
        <label>Email (Non-editable)</label>
        <input type="email" value={profileData.email} disabled />
      </div>
      <div className="form-group">
        <label>Roll Number (Non-editable)</label>
        <input type="text" value={profileData.rollNumber} disabled />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={profileData.dob}
          onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select value={profileData.gender} onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="form-group">
        <label>Father's Name</label>
        <input
          type="text"
          value={profileData.fatherName}
          onChange={(e) => setProfileData({ ...profileData, fatherName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Mother's Name</label>
        <input
          type="text"
          value={profileData.motherName}
          onChange={(e) => setProfileData({ ...profileData, motherName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>First Graduate</label>
        <div>
          <label style={{ marginRight: "20px" }}>
            <input
              type="radio"
              value="Yes"
              checked={profileData.firstGraduate === "Yes"}
              onChange={(e) => setProfileData({ ...profileData, firstGraduate: e.target.value })}
              style={{ marginRight: "5px" }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={profileData.firstGraduate === "No"}
              onChange={(e) => setProfileData({ ...profileData, firstGraduate: e.target.value })}
              style={{ marginRight: "5px" }}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>GitHub Link</label>
        <input
          type="url"
          value={profileData.github}
          onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>LinkedIn Link</label>
        <input
          type="url"
          value={profileData.linkedin}
          onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
        />
      </div>
    </div>
  )

  const renderEducationDetails = () => (
    <div>
      <h3>Education Details</h3>

      <h4>10th Standard</h4>
      <div className="form-group">
        <label>Institution Name</label>
        <input
          type="text"
          value={profileData.education.tenth.institution}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                tenth: { ...profileData.education.tenth, institution: e.target.value },
              },
            })
          }
        />
      </div>
      <div className="grid grid-2">
        <div className="form-group">
          <label>Start Year</label>
          <input
            type="number"
            value={profileData.education.tenth.startYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  tenth: { ...profileData.education.tenth, startYear: e.target.value },
                },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>End Year</label>
          <input
            type="number"
            value={profileData.education.tenth.endYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  tenth: { ...profileData.education.tenth, endYear: e.target.value },
                },
              })
            }
          />
        </div>
      </div>
      <div className="form-group">
        <label>Percentage</label>
        <input
          type="number"
          step="0.01"
          value={profileData.education.tenth.percentage}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                tenth: { ...profileData.education.tenth, percentage: e.target.value },
              },
            })
          }
        />
      </div>

      <h4>12th Standard</h4>
      <div className="form-group">
        <label>Institution Name</label>
        <input
          type="text"
          value={profileData.education.twelfth.institution}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                twelfth: { ...profileData.education.twelfth, institution: e.target.value },
              },
            })
          }
        />
      </div>
      <div className="grid grid-2">
        <div className="form-group">
          <label>Start Year</label>
          <input
            type="number"
            value={profileData.education.twelfth.startYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  twelfth: { ...profileData.education.twelfth, startYear: e.target.value },
                },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>End Year</label>
          <input
            type="number"
            value={profileData.education.twelfth.endYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  twelfth: { ...profileData.education.twelfth, endYear: e.target.value },
                },
              })
            }
          />
        </div>
      </div>
      <div className="form-group">
        <label>Percentage</label>
        <input
          type="number"
          step="0.01"
          value={profileData.education.twelfth.percentage}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                twelfth: { ...profileData.education.twelfth, percentage: e.target.value },
              },
            })
          }
        />
      </div>

      <h4>College</h4>
      <div className="form-group">
        <label>Institution Name</label>
        <input
          type="text"
          value={profileData.education.college.institution}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                college: { ...profileData.education.college, institution: e.target.value },
              },
            })
          }
        />
      </div>
      <div className="grid grid-2">
        <div className="form-group">
          <label>Start Year</label>
          <input
            type="number"
            value={profileData.education.college.startYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  college: { ...profileData.education.college, startYear: e.target.value },
                },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>End Year</label>
          <input
            type="number"
            value={profileData.education.college.endYear}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  college: { ...profileData.education.college, endYear: e.target.value },
                },
              })
            }
          />
        </div>
      </div>
      <div className="form-group">
        <label>CGPA</label>
        <input
          type="number"
          step="0.01"
          value={profileData.education.college.cgpa}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              education: {
                ...profileData.education,
                college: { ...profileData.education.college, cgpa: e.target.value },
              },
            })
          }
        />
      </div>
    </div>
  )

  if (activeSection === "view") {
    return (
      <div className="container" style={{ paddingTop: "20px" }}>
        <h1>My Profile</h1>
        {renderViewProfile()}
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div
          className={`sidebar-item ${editSection === "basic" ? "active" : ""}`}
          onClick={() => setEditSection("basic")}
        >
          Basic Details
        </div>
        <div
          className={`sidebar-item ${editSection === "education" ? "active" : ""}`}
          onClick={() => setEditSection("education")}
        >
          Education Details
        </div>
      </div>

      <div className="main-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1>Edit Profile</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-secondary" onClick={() => setActiveSection("view")}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>

        <div className="card">
          {editSection === "basic" && renderBasicDetails()}
          {editSection === "education" && renderEducationDetails()}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
