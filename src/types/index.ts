export interface User {
  id: string
  name: string
  email: string
  role: "student" | "faculty" | "admin"
  profileImage?: string
}

export interface Course {
  id: string
  name: string
  courseId: string
  description: string
  createdBy: string
  enabled: boolean
  createdAt: string
}

export interface Student {
  id: string
  name: string
  rollNumber: string
  email: string
  department: string
  password: string
  mobile?: string
  year?: string
  createdAt: string
}

export interface Faculty {
  id: string
  name: string
  facultyId: string
  email: string
  department: string
  password: string
  mobile?: string
  createdAt: string
}