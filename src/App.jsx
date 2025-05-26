import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { DataProvider } from "./context/DataContext"
import LandingPage from "./pages/LandingPage"
import StudentAuth from "./pages/auth/StudentAuth"
import FacultyAuth from "./pages/auth/FacultyAuth"
import StudentPortal from "./pages/student/StudentPortal"
import FacultyPortal from "./pages/faculty/FacultyPortal"
import AdminPortal from "./pages/admin/AdminPortal"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/student/auth" element={<StudentAuth />} />
              <Route path="/faculty/auth" element={<FacultyAuth />} />
              <Route path="/student/*" element={<StudentPortal />} />
              <Route path="/faculty/*" element={<FacultyPortal />} />
              <Route path="/admin/*" element={<AdminPortal />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
