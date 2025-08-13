"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, GraduationCap, Settings, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function MoodleIntegrationPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  const courses = [
    {
      id: "COURSE-001",
      name: "Advanced Mathematics",
      category: "Mathematics",
      students: 45,
      status: "active",
      lastSync: "2 min ago",
      automations: ["auto-enrollment", "grade-sync", "meeting-creation"],
      teacher: "Dr. Sarah Johnson",
      nextClass: "2025-06-18 10:00",
    },
    {
      id: "COURSE-002",
      name: "Physics Laboratory",
      category: "Science",
      students: 32,
      status: "active",
      lastSync: "5 min ago",
      automations: ["auto-enrollment", "meeting-creation"],
      teacher: "Prof. Michael Chen",
      nextClass: "2025-06-18 14:00",
    },
    {
      id: "COURSE-003",
      name: "Computer Science Fundamentals",
      category: "Technology",
      students: 67,
      status: "syncing",
      lastSync: "syncing...",
      automations: ["auto-enrollment", "grade-sync", "meeting-creation", "attendance-tracking"],
      teacher: "Dr. Emily Rodriguez",
      nextClass: "2025-06-19 09:00",
    },
    {
      id: "COURSE-004",
      name: "Biology Advanced",
      category: "Science",
      students: 28,
      status: "error",
      lastSync: "2 hours ago",
      automations: ["auto-enrollment"],
      teacher: "Dr. James Wilson",
      nextClass: "2025-06-18 16:00",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "syncing":
        return "bg-orange-500/20 text-orange-500"
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">MOODLE INTEGRATION</h1>
          <p className="text-sm text-neutral-400">Course management and synchronization</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Sync All Courses</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Configure API</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL COURSES</p>
                <p className="text-2xl font-bold text-white font-mono">247</p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-500" />
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
                <p className="text-xs text-neutral-400 tracking-wider">TEACHERS</p>
                <p className="text-2xl font-bold text-white font-mono">89</p>
              </div>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">SYNC ERRORS</p>
                <p className="text-2xl font-bold text-red-500 font-mono">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="bg-neutral-900 border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-orange-500" />
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
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Students:</span>
                  <span className="text-white font-mono">{course.students}</span>
                </div>
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-orange-500" />
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
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACTIVE AUTOMATIONS</h3>
                    <div className="space-y-2">
                      {selectedCourse.automations.map((automation) => (
                        <div key={automation} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-neutral-300">{automation.replace("-", " ").toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">SYNC STATISTICS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Success Rate:</span>
                        <span className="text-white font-mono">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Error:</span>
                        <span className="text-neutral-300">None</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Avg Response:</span>
                        <span className="text-white font-mono">120ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Sync Now</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Logs
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
