"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, TrendingUp, Search, Plus, Mail, UserCheck } from "lucide-react"

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const students = [
    {
      id: "STU-001",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      status: "active",
      enrolledCourses: 4,
      completedCourses: 12,
      totalCredits: 48,
      gpa: 3.8,
      lastActivity: "2 hours ago",
      courses: ["Advanced Mathematics", "Physics Laboratory", "Computer Science", "Chemistry Basics"],
      progress: 87,
      attendance: 94,
    },
    {
      id: "STU-002",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      status: "active",
      enrolledCourses: 3,
      completedCourses: 8,
      totalCredits: 32,
      gpa: 3.2,
      lastActivity: "1 day ago",
      courses: ["Biology Advanced", "Chemistry Basics", "English Literature"],
      progress: 72,
      attendance: 89,
    },
    {
      id: "STU-003",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      status: "active",
      enrolledCourses: 5,
      completedCourses: 15,
      totalCredits: 60,
      gpa: 3.9,
      lastActivity: "30 min ago",
      courses: [
        "Advanced Mathematics",
        "Physics Laboratory",
        "Computer Science",
        "Biology Advanced",
        "English Literature",
      ],
      progress: 93,
      attendance: 97,
    },
    {
      id: "STU-004",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      status: "inactive",
      enrolledCourses: 2,
      completedCourses: 5,
      totalCredits: 20,
      gpa: 2.8,
      lastActivity: "1 week ago",
      courses: ["Chemistry Basics", "English Literature"],
      progress: 45,
      attendance: 67,
    },
    {
      id: "STU-005",
      name: "Emma Brown",
      email: "emma.brown@university.edu",
      status: "active",
      enrolledCourses: 4,
      completedCourses: 10,
      totalCredits: 40,
      gpa: 3.6,
      lastActivity: "4 hours ago",
      courses: ["Advanced Mathematics", "Computer Science", "Biology Advanced", "Physics Laboratory"],
      progress: 81,
      attendance: 91,
    },
    {
      id: "STU-006",
      name: "Frank Miller",
      email: "frank.miller@university.edu",
      status: "active",
      enrolledCourses: 3,
      completedCourses: 7,
      totalCredits: 28,
      gpa: 3.4,
      lastActivity: "6 hours ago",
      courses: ["Computer Science", "Chemistry Basics", "English Literature"],
      progress: 76,
      attendance: 85,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "inactive":
        return "bg-red-500/20 text-red-500"
      case "suspended":
        return "bg-orange-500/20 text-orange-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getGPAColor = (gpa) => {
    if (gpa >= 3.5) return "text-white"
    if (gpa >= 3.0) return "text-[#27d4ba]"
    if (gpa >= 2.5) return "text-orange-500"
    return "text-red-500"
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">STUDENTS</h1>
          <p className="text-sm text-neutral-400">Student management and performance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Mail className="w-4 h-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL STUDENTS</p>
                <p className="text-2xl font-bold text-white font-mono">1,834</p>
              </div>
              <Users className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE STUDENTS</p>
                <p className="text-2xl font-bold text-white font-mono">1,687</p>
              </div>
              <UserCheck className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">AVG GPA</p>
                <p className="text-2xl font-bold text-white font-mono">3.4</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">STUDENT ROSTER</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">STUDENT</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">COURSES</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">GPA</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">PROGRESS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    ATTENDANCE
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    LAST ACTIVITY
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm text-white font-medium">{student.name}</div>
                        <div className="text-xs text-neutral-400">{student.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(student.status)}>{student.status.toUpperCase()}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-white font-mono">{student.enrolledCourses}</div>
                      <div className="text-xs text-neutral-400">enrolled</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`text-sm font-mono ${getGPAColor(student.gpa)}`}>{student.gpa}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white font-mono">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white font-mono">{student.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-300 font-mono">{student.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedStudent.name}</CardTitle>
                  <p className="text-sm text-neutral-400">{selectedStudent.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedStudent(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">STUDENT STATUS</h3>
                    <Badge className={getStatusColor(selectedStudent.status)}>
                      {selectedStudent.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACADEMIC INFORMATION</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Student ID:</span>
                        <span className="text-white font-mono">{selectedStudent.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Enrolled Courses:</span>
                        <span className="text-white font-mono">{selectedStudent.enrolledCourses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Completed Courses:</span>
                        <span className="text-white font-mono">{selectedStudent.completedCourses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Total Credits:</span>
                        <span className="text-white font-mono">{selectedStudent.totalCredits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">GPA:</span>
                        <span className={`font-mono ${getGPAColor(selectedStudent.gpa)}`}>{selectedStudent.gpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Activity:</span>
                        <span className="text-white font-mono">{selectedStudent.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">PERFORMANCE METRICS</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Overall Progress</span>
                          <span className="text-white font-mono">{selectedStudent.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedStudent.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Attendance Rate</span>
                          <span className="text-white font-mono">{selectedStudent.attendance}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedStudent.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ENROLLED COURSES</h3>
                    <div className="space-y-2">
                      {selectedStudent.courses.map((course, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                          <span className="text-neutral-300">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">View Grades</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
