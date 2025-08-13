"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Plus, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function EnrollmentsPage() {
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const enrollments = [
    {
      id: "ENR-001",
      studentName: "Alice Johnson",
      studentEmail: "alice.johnson@university.edu",
      courseName: "Advanced Mathematics",
      courseCode: "MATH-401",
      enrollmentDate: "2025-06-01",
      status: "active",
      progress: 87,
      lastActivity: "2 hours ago",
      grade: "A-",
      attendance: 94,
      automationStatus: "enabled",
    },
    {
      id: "ENR-002",
      studentName: "Bob Smith",
      studentEmail: "bob.smith@university.edu",
      courseName: "Physics Laboratory",
      courseCode: "PHYS-301",
      enrollmentDate: "2025-06-02",
      status: "active",
      progress: 72,
      lastActivity: "1 day ago",
      grade: "B+",
      attendance: 89,
      automationStatus: "enabled",
    },
    {
      id: "ENR-003",
      studentName: "Carol Davis",
      studentEmail: "carol.davis@university.edu",
      courseName: "Computer Science Fundamentals",
      courseCode: "CS-101",
      enrollmentDate: "2025-06-01",
      status: "active",
      progress: 93,
      lastActivity: "30 min ago",
      grade: "A",
      attendance: 97,
      automationStatus: "enabled",
    },
    {
      id: "ENR-004",
      studentName: "David Wilson",
      studentEmail: "david.wilson@university.edu",
      courseName: "Biology Advanced",
      courseCode: "BIO-401",
      enrollmentDate: "2025-05-28",
      status: "pending",
      progress: 0,
      lastActivity: "Never",
      grade: "-",
      attendance: 0,
      automationStatus: "pending",
    },
    {
      id: "ENR-005",
      studentName: "Emma Brown",
      studentEmail: "emma.brown@university.edu",
      courseName: "Chemistry Basics",
      courseCode: "CHEM-201",
      enrollmentDate: "2025-06-03",
      status: "active",
      progress: 81,
      lastActivity: "4 hours ago",
      grade: "B+",
      attendance: 91,
      automationStatus: "enabled",
    },
    {
      id: "ENR-006",
      studentName: "Frank Miller",
      studentEmail: "frank.miller@university.edu",
      courseName: "English Literature",
      courseCode: "ENG-301",
      enrollmentDate: "2025-06-04",
      status: "dropped",
      progress: 45,
      lastActivity: "1 week ago",
      grade: "W",
      attendance: 67,
      automationStatus: "disabled",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "pending":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "dropped":
        return "bg-red-500/20 text-red-500"
      case "completed":
        return "bg-white/20 text-white"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "dropped":
        return <AlertTriangle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getAutomationColor = (status) => {
    switch (status) {
      case "enabled":
        return "bg-white/20 text-white"
      case "pending":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "disabled":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ENROLLMENTS</h1>
          <p className="text-sm text-neutral-400">Student enrollment management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Enrollment
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Bulk Enroll</Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search enrollments..."
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
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL ENROLLMENTS</p>
                <p className="text-2xl font-bold text-white font-mono">4,521</p>
              </div>
              <UserPlus className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE</p>
                <p className="text-2xl font-bold text-white font-mono">4,234</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">PENDING</p>
                <p className="text-2xl font-bold text-[#27d4ba] font-mono">156</p>
              </div>
              <Clock className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments Table */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ENROLLMENT RECORDS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">STUDENT</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">COURSE</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">PROGRESS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">GRADE</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    ATTENDANCE
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    AUTOMATION
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">ENROLLED</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment, index) => (
                  <tr
                    key={enrollment.id}
                    className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
                    }`}
                    onClick={() => setSelectedEnrollment(enrollment)}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm text-white font-medium">{enrollment.studentName}</div>
                        <div className="text-xs text-neutral-400">{enrollment.studentEmail}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm text-white font-medium">{enrollment.courseName}</div>
                        <div className="text-xs text-neutral-400">{enrollment.courseCode}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(enrollment.status)}
                        <Badge className={getStatusColor(enrollment.status)}>{enrollment.status.toUpperCase()}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white font-mono">{enrollment.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white font-mono">{enrollment.grade}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white font-mono">{enrollment.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getAutomationColor(enrollment.automationStatus)}>
                        {enrollment.automationStatus.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-300 font-mono">{enrollment.enrollmentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">
                    {selectedEnrollment.studentName}
                  </CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedEnrollment.courseName} • {selectedEnrollment.courseCode}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedEnrollment(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ENROLLMENT STATUS</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedEnrollment.status)}
                      <Badge className={getStatusColor(selectedEnrollment.status)}>
                        {selectedEnrollment.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ENROLLMENT DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Enrollment ID:</span>
                        <span className="text-white font-mono">{selectedEnrollment.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Student Email:</span>
                        <span className="text-white">{selectedEnrollment.studentEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Course Code:</span>
                        <span className="text-white font-mono">{selectedEnrollment.courseCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Enrollment Date:</span>
                        <span className="text-white font-mono">{selectedEnrollment.enrollmentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Activity:</span>
                        <span className="text-white font-mono">{selectedEnrollment.lastActivity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Current Grade:</span>
                        <span className="text-white font-mono">{selectedEnrollment.grade}</span>
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
                          <span className="text-neutral-400">Course Progress</span>
                          <span className="text-white font-mono">{selectedEnrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedEnrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Attendance Rate</span>
                          <span className="text-white font-mono">{selectedEnrollment.attendance}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedEnrollment.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">AUTOMATION STATUS</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getAutomationColor(selectedEnrollment.automationStatus)}>
                        {selectedEnrollment.automationStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                        <span className="text-neutral-300">Auto Meeting Creation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-neutral-300">Grade Synchronization</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-neutral-300">Attendance Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Update Enrollment</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Grades
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
