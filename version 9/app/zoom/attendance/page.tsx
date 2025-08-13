"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle, Search, Download, Filter } from "lucide-react"

export default function AttendancePage() {
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const attendanceData = [
    {
      id: "ATT-001",
      meetingTitle: "Advanced Mathematics - Lecture 15",
      course: "Advanced Mathematics",
      date: "2025-06-16",
      time: "10:00",
      duration: "1h 32m",
      totalStudents: 245,
      present: 189,
      late: 23,
      absent: 33,
      attendanceRate: 77.1,
      host: "Dr. Sarah Johnson",
      avgDuration: "1h 28m",
      students: [
        { name: "Alice Johnson", status: "present", joinTime: "10:02", duration: "1h 30m" },
        { name: "Bob Smith", status: "late", joinTime: "10:15", duration: "1h 17m" },
        { name: "Carol Davis", status: "absent", joinTime: "-", duration: "-" },
      ],
    },
    {
      id: "ATT-002",
      meetingTitle: "Physics Lab - Experiment Demo",
      course: "Physics Laboratory",
      date: "2025-06-15",
      time: "14:00",
      duration: "2h 15m",
      totalStudents: 189,
      present: 167,
      late: 12,
      absent: 10,
      attendanceRate: 88.4,
      host: "Prof. Michael Chen",
      avgDuration: "2h 8m",
      students: [
        { name: "David Wilson", status: "present", joinTime: "14:01", duration: "2h 14m" },
        { name: "Emma Brown", status: "present", joinTime: "13:58", duration: "2h 17m" },
        { name: "Frank Miller", status: "late", joinTime: "14:20", duration: "1h 55m" },
      ],
    },
    {
      id: "ATT-003",
      meetingTitle: "CS Fundamentals - Q&A Session",
      course: "Computer Science Fundamentals",
      date: "2025-06-14",
      time: "09:00",
      duration: "58m",
      totalStudents: 156,
      present: 134,
      late: 8,
      absent: 14,
      attendanceRate: 85.9,
      host: "Dr. Emily Rodriguez",
      avgDuration: "52m",
      students: [
        { name: "Grace Lee", status: "present", joinTime: "09:03", duration: "55m" },
        { name: "Henry Taylor", status: "present", joinTime: "08:59", duration: "58m" },
        { name: "Ivy Chen", status: "absent", joinTime: "-", duration: "-" },
      ],
    },
    {
      id: "ATT-004",
      meetingTitle: "Biology Advanced - Review Session",
      course: "Biology Advanced",
      date: "2025-06-13",
      time: "16:00",
      duration: "1h 18m",
      totalStudents: 134,
      present: 98,
      late: 15,
      absent: 21,
      attendanceRate: 73.1,
      host: "Dr. James Wilson",
      avgDuration: "1h 12m",
      students: [
        { name: "Jack Anderson", status: "present", joinTime: "16:02", duration: "1h 16m" },
        { name: "Kate Martinez", status: "late", joinTime: "16:25", duration: "53m" },
        { name: "Liam Garcia", status: "absent", joinTime: "-", duration: "-" },
      ],
    },
    {
      id: "ATT-005",
      meetingTitle: "Chemistry Basics - Lab Safety",
      course: "Chemistry Basics",
      date: "2025-06-12",
      time: "11:00",
      duration: "45m",
      totalStudents: 98,
      present: 89,
      late: 4,
      absent: 5,
      attendanceRate: 90.8,
      host: "Prof. Lisa Anderson",
      avgDuration: "43m",
      students: [
        { name: "Maya Rodriguez", status: "present", joinTime: "11:01", duration: "44m" },
        { name: "Noah Thompson", status: "present", joinTime: "10:58", duration: "47m" },
        { name: "Olivia White", status: "late", joinTime: "11:12", duration: "33m" },
      ],
    },
  ]

  const getAttendanceColor = (rate) => {
    if (rate >= 85) return "text-white"
    if (rate >= 70) return "text-[#27d4ba]"
    return "text-red-500"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-white/20 text-white"
      case "late":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "absent":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4" />
      case "late":
        return <Clock className="w-4 h-4" />
      case "absent":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const filteredAttendance = attendanceData.filter(
    (record) =>
      record.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.host.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalStudents = attendanceData.reduce((sum, record) => sum + record.totalStudents, 0)
  const totalPresent = attendanceData.reduce((sum, record) => sum + record.present, 0)
  const avgAttendance = totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ATTENDANCE</h1>
          <p className="text-sm text-neutral-400">Student attendance tracking and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
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
                placeholder="Search attendance records..."
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
                <p className="text-xs text-neutral-400 tracking-wider">AVG ATTENDANCE</p>
                <p className="text-2xl font-bold text-white font-mono">{avgAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#27d4ba]" />
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
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">MEETINGS TRACKED</p>
                <p className="text-2xl font-bold text-white font-mono">156</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Meetings */}
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white tracking-wider">RECENT MEETINGS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAttendance.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-neutral-800 rounded border border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedMeeting(record)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wider">{record.meetingTitle}</h3>
                      <p className="text-xs text-neutral-400">{record.course}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold font-mono ${getAttendanceColor(record.attendanceRate)}`}>
                        {record.attendanceRate}%
                      </div>
                      <div className="text-xs text-neutral-400">attendance</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle className="w-3 h-3 text-white" />
                        <span className="text-xs text-neutral-400">Present</span>
                      </div>
                      <div className="text-sm font-bold text-white font-mono">{record.present}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-[#27d4ba]" />
                        <span className="text-xs text-neutral-400">Late</span>
                      </div>
                      <div className="text-sm font-bold text-[#27d4ba] font-mono">{record.late}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <XCircle className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-neutral-400">Absent</span>
                      </div>
                      <div className="text-sm font-bold text-red-500 font-mono">{record.absent}</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>
                      {record.date} at {record.time}
                    </span>
                    <span>Duration: {record.duration}</span>
                  </div>

                  <div className="w-full bg-neutral-700 rounded-full h-2 mt-3">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${record.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trends */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white tracking-wider">ATTENDANCE TRENDS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono mb-2">{avgAttendance}%</div>
                <div className="text-sm text-neutral-400">Average Attendance Rate</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-[#27d4ba]" />
                  <span className="text-xs text-[#27d4ba]">+2.3% from last week</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">This Week</span>
                    <span className="text-white font-mono">89.2%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-[#27d4ba] h-2 rounded-full" style={{ width: "89.2%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Last Week</span>
                    <span className="text-white font-mono">86.9%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "86.9%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Last Month</span>
                    <span className="text-white font-mono">84.1%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-neutral-600 h-2 rounded-full" style={{ width: "84.1%" }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-700">
                <h4 className="text-sm font-medium text-neutral-300 mb-3">Top Performing Courses</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Chemistry Basics</span>
                    <span className="text-white font-mono">90.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Physics Laboratory</span>
                    <span className="text-white font-mono">88.4%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">CS Fundamentals</span>
                    <span className="text-white font-mono">85.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">
                    {selectedMeeting.meetingTitle}
                  </CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedMeeting.course} • {selectedMeeting.date}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedMeeting(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ATTENDANCE SUMMARY</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-neutral-800 rounded">
                        <CheckCircle className="w-6 h-6 text-white mx-auto mb-1" />
                        <div className="text-lg font-bold text-white font-mono">{selectedMeeting.present}</div>
                        <div className="text-xs text-neutral-400">Present</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800 rounded">
                        <Clock className="w-6 h-6 text-[#27d4ba] mx-auto mb-1" />
                        <div className="text-lg font-bold text-[#27d4ba] font-mono">{selectedMeeting.late}</div>
                        <div className="text-xs text-neutral-400">Late</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-800 rounded">
                        <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-red-500 font-mono">{selectedMeeting.absent}</div>
                        <div className="text-xs text-neutral-400">Absent</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">MEETING DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Host:</span>
                        <span className="text-white">{selectedMeeting.host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Date & Time:</span>
                        <span className="text-white font-mono">
                          {selectedMeeting.date} {selectedMeeting.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Duration:</span>
                        <span className="text-white font-mono">{selectedMeeting.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Avg Duration:</span>
                        <span className="text-white font-mono">{selectedMeeting.avgDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Attendance Rate:</span>
                        <span className={`font-mono ${getAttendanceColor(selectedMeeting.attendanceRate)}`}>
                          {selectedMeeting.attendanceRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">STUDENT ATTENDANCE</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedMeeting.students.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(student.status)}
                            <span className="text-sm text-white">{student.name}</span>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(student.status)}>{student.status.toUpperCase()}</Badge>
                            <div className="text-xs text-neutral-400 mt-1">
                              {student.joinTime !== "-" ? `Joined: ${student.joinTime}` : "Did not join"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Attendance
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Send Reminders
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Recording
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
