"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, CheckCircle, Clock, AlertTriangle, Search, Plus, LayoutGrid, List, Table } from "lucide-react"

export default function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewFormat, setViewFormat] = useState("card")

  const assignments = [
    {
      id: "ASG-001",
      title: "Calculus Problem Set 5",
      course: "Advanced Mathematics",
      courseCode: "MATH-401",
      dueDate: "2025-06-20",
      status: "active",
      totalStudents: 245,
      submitted: 189,
      graded: 156,
      avgScore: 87.3,
      maxScore: 100,
      createdDate: "2025-06-10",
      description: "Solve integration problems using advanced techniques",
    },
    {
      id: "ASG-002",
      title: "Lab Report: Wave Interference",
      course: "Physics Laboratory",
      courseCode: "PHYS-301",
      dueDate: "2025-06-22",
      status: "active",
      totalStudents: 189,
      submitted: 134,
      graded: 89,
      avgScore: 91.2,
      maxScore: 100,
      createdDate: "2025-06-08",
      description: "Analyze wave interference patterns from laboratory experiment",
    },
    {
      id: "ASG-003",
      title: "Programming Project: Data Structures",
      course: "Computer Science Fundamentals",
      courseCode: "CS-101",
      dueDate: "2025-06-25",
      status: "active",
      totalStudents: 156,
      submitted: 98,
      graded: 45,
      avgScore: 89.7,
      maxScore: 100,
      createdDate: "2025-06-05",
      description: "Implement binary search tree with full CRUD operations",
    },
    {
      id: "ASG-004",
      title: "Essay: Genetic Engineering Ethics",
      course: "Biology Advanced",
      courseCode: "BIO-401",
      dueDate: "2025-06-18",
      status: "overdue",
      totalStudents: 134,
      submitted: 98,
      graded: 98,
      avgScore: 83.5,
      maxScore: 100,
      createdDate: "2025-06-01",
      description: "Discuss ethical implications of modern genetic engineering",
    },
    {
      id: "ASG-005",
      title: "Chemical Reactions Lab",
      course: "Chemistry Basics",
      courseCode: "CHEM-201",
      dueDate: "2025-06-28",
      status: "draft",
      totalStudents: 98,
      submitted: 0,
      graded: 0,
      avgScore: 0,
      maxScore: 100,
      createdDate: "2025-06-15",
      description: "Analyze chemical reaction rates and equilibrium constants",
    },
    {
      id: "ASG-006",
      title: "Literary Analysis: Shakespeare",
      course: "English Literature",
      courseCode: "ENG-301",
      dueDate: "2025-06-30",
      status: "active",
      totalStudents: 76,
      submitted: 23,
      graded: 12,
      avgScore: 92.1,
      maxScore: 100,
      createdDate: "2025-06-12",
      description: "Analyze themes and literary devices in Hamlet",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "draft":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "overdue":
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
      case "draft":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getSubmissionRate = (submitted, total) => {
    return total > 0 ? Math.round((submitted / total) * 100) : 0
  }

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ASSIGNMENTS</h1>
          <p className="text-sm text-neutral-400">Assignment management and grading overview</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Bulk Grade</Button>
          <div className="flex items-center gap-1 ml-4 p-1 bg-neutral-800 rounded">
            <Button
              size="sm"
              variant={viewFormat === "card" ? "default" : "ghost"}
              onClick={() => setViewFormat("card")}
              className={
                viewFormat === "card" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"
              }
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewFormat === "list" ? "default" : "ghost"}
              onClick={() => setViewFormat("list")}
              className={
                viewFormat === "list" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"
              }
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewFormat === "table" ? "default" : "ghost"}
              onClick={() => setViewFormat("table")}
              className={
                viewFormat === "table" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"
              }
            >
              <Table className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search assignments..."
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
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL ASSIGNMENTS</p>
                <p className="text-2xl font-bold text-white font-mono">342</p>
              </div>
              <FileText className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE</p>
                <p className="text-2xl font-bold text-white font-mono">156</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">OVERDUE</p>
                <p className="text-2xl font-bold text-red-500 font-mono">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Display */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#27d4ba]" />
                    <div>
                      <CardTitle className="text-sm font-bold text-white tracking-wider">{assignment.title}</CardTitle>
                      <p className="text-xs text-neutral-400">{assignment.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getStatusIcon(assignment.status)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(assignment.status)}>{assignment.status.toUpperCase()}</Badge>
                  <Badge className="bg-neutral-800 text-neutral-300">{assignment.courseCode}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Due Date:</span>
                    <span className="text-white font-mono">{assignment.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Students:</span>
                    <span className="text-white font-mono">{assignment.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Submitted:</span>
                    <span className="text-white font-mono">
                      {assignment.submitted}/{assignment.totalStudents}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Avg Score:</span>
                    <span className="text-white font-mono">{assignment.avgScore}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Submission Rate</span>
                    <span className="text-white font-mono">
                      {getSubmissionRate(assignment.submitted, assignment.totalStudents)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getSubmissionRate(assignment.submitted, assignment.totalStudents)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Grading Progress</span>
                    <span className="text-white font-mono">
                      {assignment.submitted > 0 ? Math.round((assignment.graded / assignment.submitted) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${assignment.submitted > 0 ? Math.round((assignment.graded / assignment.submitted) * 100) : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewFormat === "list" && (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-[#27d4ba]" />
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wider">{assignment.title}</h3>
                      <p className="text-xs text-neutral-400">
                        {assignment.course} • Due: {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-white font-mono">
                        {assignment.submitted}/{assignment.totalStudents}
                      </div>
                      <div className="text-xs text-neutral-400">Avg: {assignment.avgScore}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      <Badge className={getStatusColor(assignment.status)}>{assignment.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewFormat === "table" && (
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-700">
                  <tr className="text-left">
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">ASSIGNMENT</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">COURSE</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">DUE DATE</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">SUBMISSIONS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">AVG SCORE</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 cursor-pointer"
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-[#27d4ba]" />
                          <div>
                            <div className="text-sm font-medium text-white">{assignment.title}</div>
                            <div className="text-xs text-neutral-400">{assignment.courseCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white">{assignment.course}</td>
                      <td className="p-4 text-sm text-white font-mono">{assignment.dueDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.status)}
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status.toUpperCase()}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-white font-mono">
                          {assignment.submitted}/{assignment.totalStudents}
                        </div>
                        <div className="w-16 bg-neutral-800 rounded-full h-1 mt-1">
                          <div
                            className="bg-[#27d4ba] h-1 rounded-full"
                            style={{ width: `${getSubmissionRate(assignment.submitted, assignment.totalStudents)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white font-mono">{assignment.avgScore}%</td>
                      <td className="p-4">
                        <Button size="sm" className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
                          Grade
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">
                    {selectedAssignment.title}
                  </CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedAssignment.course} • {selectedAssignment.courseCode}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedAssignment(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ASSIGNMENT STATUS</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedAssignment.status)}
                      <Badge className={getStatusColor(selectedAssignment.status)}>
                        {selectedAssignment.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ASSIGNMENT DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Assignment ID:</span>
                        <span className="text-white font-mono">{selectedAssignment.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Created Date:</span>
                        <span className="text-white font-mono">{selectedAssignment.createdDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Due Date:</span>
                        <span className="text-white font-mono">{selectedAssignment.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Max Score:</span>
                        <span className="text-white font-mono">{selectedAssignment.maxScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Average Score:</span>
                        <span className="text-white font-mono">{selectedAssignment.avgScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">DESCRIPTION</h3>
                    <p className="text-sm text-neutral-300">{selectedAssignment.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">SUBMISSION STATISTICS</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Submission Rate</span>
                          <span className="text-white font-mono">
                            {getSubmissionRate(selectedAssignment.submitted, selectedAssignment.totalStudents)}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${getSubmissionRate(selectedAssignment.submitted, selectedAssignment.totalStudents)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          {selectedAssignment.submitted} of {selectedAssignment.totalStudents} students
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Grading Progress</span>
                          <span className="text-white font-mono">
                            {selectedAssignment.submitted > 0
                              ? Math.round((selectedAssignment.graded / selectedAssignment.submitted) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${selectedAssignment.submitted > 0 ? Math.round((selectedAssignment.graded / selectedAssignment.submitted) * 100) : 0}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          {selectedAssignment.graded} of {selectedAssignment.submitted} submissions graded
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">QUICK ACTIONS</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                        <span className="text-neutral-300">Auto-grade submissions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-neutral-300">Send reminders</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-neutral-300">Export grades</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Grade Submissions</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Submissions
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Send Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
