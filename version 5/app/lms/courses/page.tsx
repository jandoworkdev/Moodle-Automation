"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  GraduationCap,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Plus,
  LayoutGrid,
  List,
  Table,
} from "lucide-react"

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewFormat, setViewFormat] = useState("card")

  const courses = [
    {
      id: "COURSE-001",
      name: "Advanced Mathematics",
      category: "Mathematics",
      students: 245,
      status: "active",
      lastSync: "2 min ago",
      automations: ["auto-enrollment", "grade-sync", "meeting-creation"],
      teacher: "Dr. Sarah Johnson",
      nextClass: "2025-06-18 10:00",
      completion: 87,
      engagement: 92,
    },
    {
      id: "COURSE-002",
      name: "Physics Laboratory",
      category: "Science",
      students: 189,
      status: "active",
      lastSync: "5 min ago",
      automations: ["auto-enrollment", "meeting-creation"],
      teacher: "Prof. Michael Chen",
      nextClass: "2025-06-18 14:00",
      completion: 91,
      engagement: 88,
    },
    {
      id: "COURSE-003",
      name: "Computer Science Fundamentals",
      category: "Technology",
      students: 156,
      status: "syncing",
      lastSync: "syncing...",
      automations: ["auto-enrollment", "grade-sync", "meeting-creation", "attendance-tracking"],
      teacher: "Dr. Emily Rodriguez",
      nextClass: "2025-06-19 09:00",
      completion: 94,
      engagement: 89,
    },
    {
      id: "COURSE-004",
      name: "Biology Advanced",
      category: "Science",
      students: 134,
      status: "error",
      lastSync: "2 hours ago",
      automations: ["auto-enrollment"],
      teacher: "Dr. James Wilson",
      nextClass: "2025-06-18 16:00",
      completion: 83,
      engagement: 79,
    },
    {
      id: "COURSE-005",
      name: "Chemistry Basics",
      category: "Science",
      students: 98,
      status: "active",
      lastSync: "1 min ago",
      automations: ["auto-enrollment", "grade-sync", "meeting-creation"],
      teacher: "Prof. Lisa Anderson",
      nextClass: "2025-06-18 11:00",
      completion: 89,
      engagement: 85,
    },
    {
      id: "COURSE-006",
      name: "English Literature",
      category: "Humanities",
      students: 76,
      status: "active",
      lastSync: "3 min ago",
      automations: ["auto-enrollment", "meeting-creation"],
      teacher: "Dr. Robert Taylor",
      nextClass: "2025-06-18 15:00",
      completion: 92,
      engagement: 94,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "syncing":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "error":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "syncing":
        return <Clock className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">COURSES</h1>
          <p className="text-sm text-neutral-400">Course management and synchronization</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Sync All Courses</Button>
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
                placeholder="Search courses..."
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
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL COURSES</p>
                <p className="text-2xl font-bold text-white font-mono">247</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE STUDENTS</p>
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
                <p className="text-xs text-neutral-400 tracking-wider">AVG COMPLETION</p>
                <p className="text-2xl font-bold text-white font-mono">89%</p>
              </div>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Display */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#27d4ba]" />
                    <div>
                      <CardTitle className="text-sm font-bold text-white tracking-wider">{course.name}</CardTitle>
                      <p className="text-xs text-neutral-400">{course.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getStatusIcon(course.status)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(course.status)}>{course.status.toUpperCase()}</Badge>
                  <Badge className="bg-neutral-800 text-neutral-300">{course.students} students</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Teacher:</span>
                    <span className="text-white">{course.teacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Next Class:</span>
                    <span className="text-white font-mono">{course.nextClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Last Sync:</span>
                    <span className="text-white font-mono">{course.lastSync}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-neutral-400 mb-1">Completion</div>
                    <div className="text-white font-mono">{course.completion}%</div>
                    <div className="w-full bg-neutral-800 rounded-full h-1 mt-1">
                      <div
                        className="bg-white h-1 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-400 mb-1">Engagement</div>
                    <div className="text-white font-mono">{course.engagement}%</div>
                    <div className="w-full bg-neutral-800 rounded-full h-1 mt-1">
                      <div
                        className="bg-[#27d4ba] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${course.engagement}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 mb-2">Active Automations:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.automations.map((automation) => (
                      <Badge key={automation} className="bg-neutral-800 text-neutral-300 text-xs">
                        {automation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewFormat === "list" && (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <BookOpen className="w-5 h-5 text-[#27d4ba]" />
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wider">{course.name}</h3>
                      <p className="text-xs text-neutral-400">
                        {course.category} • {course.teacher}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-white font-mono">{course.students} students</div>
                      <div className="text-xs text-neutral-400">Next: {course.nextClass}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(course.status)}
                      <Badge className={getStatusColor(course.status)}>{course.status.toUpperCase()}</Badge>
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
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">COURSE</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">TEACHER</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">STUDENTS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">COMPLETION</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">NEXT CLASS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-[#27d4ba]" />
                          <div>
                            <div className="text-sm font-medium text-white">{course.name}</div>
                            <div className="text-xs text-neutral-400">{course.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white">{course.teacher}</td>
                      <td className="p-4 text-sm text-white font-mono">{course.students}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(course.status)}
                          <Badge className={getStatusColor(course.status)}>{course.status.toUpperCase()}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-neutral-800 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: `${course.completion}%` }}></div>
                          </div>
                          <span className="text-sm text-white font-mono">{course.completion}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white font-mono">{course.nextClass}</td>
                      <td className="p-4">
                        <Button size="sm" className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
                          View
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedCourse.name}</CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedCourse.id} • {selectedCourse.category}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedCourse(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">COURSE STATUS</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedCourse.status)}
                      <Badge className={getStatusColor(selectedCourse.status)}>
                        {selectedCourse.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">COURSE DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Teacher:</span>
                        <span className="text-white">{selectedCourse.teacher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Students:</span>
                        <span className="text-white font-mono">{selectedCourse.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Category:</span>
                        <span className="text-white">{selectedCourse.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Next Class:</span>
                        <span className="text-white font-mono">{selectedCourse.nextClass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Sync:</span>
                        <span className="text-white font-mono">{selectedCourse.lastSync}</span>
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
                          <span className="text-neutral-400">Completion Rate</span>
                          <span className="text-white font-mono">{selectedCourse.completion}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedCourse.completion}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">Engagement Rate</span>
                          <span className="text-white font-mono">{selectedCourse.engagement}%</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-[#27d4ba] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedCourse.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACTIVE AUTOMATIONS</h3>
                    <div className="space-y-2">
                      {selectedCourse.automations.map((automation) => (
                        <div key={automation} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                          <span className="text-neutral-300">{automation.replace("-", " ").toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Sync Now</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Students
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Configure Automations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
