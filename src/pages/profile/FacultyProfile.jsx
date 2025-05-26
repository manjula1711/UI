"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const FacultyProfile = () => {
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
    workExperience: user.workExperience || [],
  })

  const handleSave = () => {
    updateProfile(profileData)
    setActiveSection("view")
  }

  const addWorkExperience = () => {
    setProfileData({
      ...profileData,
      workExperience: [
        ...profileData.workExperience,
        { organization: "", jobDescription: "", startYear: "", endYear: "" },
      ],
    })
  }

  const updateWorkExperience = (index, field, value) => {
    const updatedExperience = profileData.workExperience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp,
    )
    setProfileData({ ...profileData, workExperience: updatedExperience })
  }

  const removeWorkExperience = (index) => {
    const updatedExperience = profileData.workExperience.filter((_, i) => i !== index)
    setProfileData({ ...profileData, workExperience: updatedExperience })
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
        <strong>Faculty ID:</strong>
        <span>{user.facultyId}</span>
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
        <label>Faculty ID (Non-editable)</label>
        <input type="text" value={profileData.facultyId} disabled />
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

  const renderWorkExperience = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>Work Experience</h3>
        <button className="btn btn-primary" onClick={addWorkExperience}>
          Add Experience
        </button>
      </div>

      {profileData.workExperience.map((exp, index) => (
        <div key={index} className="card" style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h4>Experience {index + 1}</h4>
            <button className="btn btn-danger" onClick={() => removeWorkExperience(index)}>
              Remove
            </button>
          </div>

          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={exp.organization}
              onChange={(e) => updateWorkExperience(index, "organization", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              value={exp.jobDescription}
              onChange={(e) => updateWorkExperience(index, "jobDescription", e.target.value)}
              rows="3"
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label>Start Year</label>
              <input
                type="number"
                value={exp.startYear}
                onChange={(e) => updateWorkExperience(index, "startYear", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Year</label>
              <input
                type="number"
                value={exp.endYear}
                onChange={(e) => updateWorkExperience(index, "endYear", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      {profileData.workExperience.length === 0 && (
        <div className="card">
          <p>No work experience added yet. Click "Add Experience" to get started.</p>
        </div>
      )}
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
          className={`sidebar-item ${editSection === "work" ? "active" : ""}`}
          onClick={() => setEditSection("work")}
        >
          Work Experience
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
          {editSection === "work" && renderWorkExperience()}
        </div>
      </div>
    </div>
  )
}

export default FacultyProfile
