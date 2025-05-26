"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([])
  const [faculty, setFaculty] = useState([])
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [assignments, setAssignments] = useState([]) // New: Track admin assignments

  useEffect(() => {
    // Load data from localStorage
    const savedStudents = localStorage.getItem("students")
    const savedFaculty = localStorage.getItem("faculty")
    const savedCourses = localStorage.getItem("courses")
    const savedEnrollments = localStorage.getItem("enrollments")
    const savedAssignments = localStorage.getItem("assignments")

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    } else {
      // Initialize with sample students
      const sampleStudents = [
        {
          id: "1",
          name: "John Doe",
          rollNumber: "STU001",
          email: "john@student.com",
          department: "IT",
          password: "john123",
          mobile: "9876543210",
          year: "2024",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Jane Smith",
          rollNumber: "STU002",
          email: "jane@student.com",
          department: "ECE",
          password: "jane123",
          mobile: "9876543211",
          year: "2024",
          createdAt: new Date().toISOString(),
        },
      ]
      setStudents(sampleStudents)
      localStorage.setItem("students", JSON.stringify(sampleStudents))
    }

    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty))
    } else {
      // Initialize with sample faculty
      const sampleFaculty = [
        {
          id: "1",
          name: "Dr. Smith Wilson",
          facultyId: "FAC001",
          email: "smith@faculty.com",
          department: "IT",
          password: "smith123",
          mobile: "9876543220",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Dr. Sarah Johnson",
          facultyId: "FAC002",
          email: "sarah@faculty.com",
          department: "ECE",
          password: "sarah123",
          mobile: "9876543221",
          createdAt: new Date().toISOString(),
        },
      ]
      setFaculty(sampleFaculty)
      localStorage.setItem("faculty", JSON.stringify(sampleFaculty))
    }

    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    } else {
      // Initialize with sample courses
      const sampleCourses = [
        {
          id: "1",
          name: "Data Structures",
          courseId: "CS101",
          description: "Introduction to data structures and algorithms",
          createdBy: "1",
          enabled: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Digital Electronics",
          courseId: "ECE201",
          description: "Fundamentals of digital electronics and logic design",
          createdBy: "2",
          enabled: true,
          createdAt: new Date().toISOString(),
        },
      ]
      setCourses(sampleCourses)
      localStorage.setItem("courses", JSON.stringify(sampleCourses))
    }

    if (savedEnrollments) {
      setEnrollments(JSON.parse(savedEnrollments))
    }

    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments))
    }
  }, [])

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const addStudent = (student) => {
    const newStudents = [...students, { ...student, id: Date.now().toString() }]
    setStudents(newStudents)
    saveToStorage("students", newStudents)
  }

  const updateStudent = (id, updatedData) => {
    const newStudents = students.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    setStudents(newStudents)
    saveToStorage("students", newStudents)
  }

  const deleteStudent = (id) => {
    const newStudents = students.filter((s) => s.id !== id)
    setStudents(newStudents)
    saveToStorage("students", newStudents)
  }

  const addFaculty = (facultyMember) => {
    const newFaculty = [...faculty, { ...facultyMember, id: Date.now().toString() }]
    setFaculty(newFaculty)
    saveToStorage("faculty", newFaculty)
  }

  const updateFaculty = (id, updatedData) => {
    const newFaculty = faculty.map((f) => (f.id === id ? { ...f, ...updatedData } : f))
    setFaculty(newFaculty)
    saveToStorage("faculty", newFaculty)
  }

  const deleteFaculty = (id) => {
    const newFaculty = faculty.filter((f) => f.id !== id)
    setFaculty(newFaculty)
    saveToStorage("faculty", newFaculty)
  }

  const addCourse = (course) => {
    const newCourses = [...courses, { ...course, id: Date.now().toString(), enabled: true }]
    setCourses(newCourses)
    saveToStorage("courses", newCourses)
  }

  const updateCourse = (id, updatedData) => {
    const newCourses = courses.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    setCourses(newCourses)
    saveToStorage("courses", newCourses)
  }

  const deleteCourse = (id) => {
    const newCourses = courses.filter((c) => c.id !== id)
    setCourses(newCourses)
    saveToStorage("courses", newCourses)
  }

  const enrollStudent = (studentId, courseId) => {
    const newEnrollments = [
      ...enrollments,
      {
        id: Date.now().toString(),
        studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
        type: "self", // self-enrolled
      },
    ]
    setEnrollments(newEnrollments)
    saveToStorage("enrollments", newEnrollments)
  }

  const unenrollStudent = (studentId, courseId) => {
    const newEnrollments = enrollments.filter((e) => !(e.studentId === studentId && e.courseId === courseId))
    setEnrollments(newEnrollments)
    saveToStorage("enrollments", newEnrollments)
  }

  // New: Admin assignment function
  const assignStudentsToFaculty = (studentIds, courseId, facultyId) => {
    const newAssignments = studentIds.map((studentId) => ({
      id: Date.now().toString() + Math.random(),
      studentId,
      courseId,
      facultyId,
      assignedAt: new Date().toISOString(),
      assignedBy: "admin",
    }))

    // Also enroll students if not already enrolled
    const newEnrollments = [...enrollments]
    studentIds.forEach((studentId) => {
      const isAlreadyEnrolled = enrollments.some((e) => e.studentId === studentId && e.courseId === courseId)
      if (!isAlreadyEnrolled) {
        newEnrollments.push({
          id: Date.now().toString() + Math.random(),
          studentId,
          courseId,
          enrolledAt: new Date().toISOString(),
          type: "assigned", // admin-assigned
        })
      }
    })

    const updatedAssignments = [...assignments, ...newAssignments]
    setAssignments(updatedAssignments)
    setEnrollments(newEnrollments)
    saveToStorage("assignments", updatedAssignments)
    saveToStorage("enrollments", newEnrollments)
  }

  const getStudentCourses = (studentId) => {
    const studentEnrollments = enrollments.filter((e) => e.studentId === studentId)
    return studentEnrollments.map((e) => courses.find((c) => c.id === e.courseId)).filter(Boolean)
  }

  const getCourseStudents = (courseId) => {
    const courseEnrollments = enrollments.filter((e) => e.courseId === courseId)
    return courseEnrollments.map((e) => students.find((s) => s.id === e.studentId)).filter(Boolean)
  }

  // New: Get assigned students for a faculty
  const getAssignedStudents = (facultyId, courseId) => {
    const facultyAssignments = assignments.filter((a) => a.facultyId === facultyId && a.courseId === courseId)
    return facultyAssignments.map((a) => students.find((s) => s.id === a.studentId)).filter(Boolean)
  }

  // New: Get self-enrolled students for a course
  const getSelfEnrolledStudents = (courseId) => {
    const selfEnrollments = enrollments.filter((e) => e.courseId === courseId && e.type === "self")
    return selfEnrollments.map((e) => students.find((s) => s.id === e.studentId)).filter(Boolean)
  }

  const value = {
    students,
    faculty,
    courses,
    enrollments,
    assignments,
    addStudent,
    updateStudent,
    deleteStudent,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    addCourse,
    updateCourse,
    deleteCourse,
    enrollStudent,
    unenrollStudent,
    assignStudentsToFaculty,
    getStudentCourses,
    getCourseStudents,
    getAssignedStudents,
    getSelfEnrolledStudents,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
