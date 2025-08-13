"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Calendar, Users, Clock, CheckCircle, AlertTriangle, Play } from "lucide-react"

export default function ZoomIntegrationPage() {
  const [selectedMeeting, setSelectedMeeting] = useState(null)

  const meetings = [
    {
      id: "ZOOM-001",
      title: "Advanced Mathematics - Lecture 15",
      course: "Advanced Mathematics",
      meetingId: "123-456-789",
      status: "scheduled",
      startTime: "2025-06-18 10:00",
      duration: 90,
      participants: 45,
      host: "Dr. Sarah Johnson",
      type: "recurring",
      autoRecord: true,
    },
    {
      id: "ZOOM-002",
      title: "Physics Lab - Experiment Demo",
      course: "Physics Laboratory",
      meetingId: "987-654-321",
      status: "live",
      startTime: "2025-06-17 14:00",
      duration: 120,
      participants: 28,
      host: "Prof. Michael Chen",
      type: "one-time",
      autoRecord: true,
    },
    {
      id: "ZOOM-003",
      title: "CS Fundamentals - Q&A Session",
      course: "Computer Science Fundamentals",
      meetingId: "456-789-123",
      status: "scheduled",
      startTime: "2025-06-19 09:00",
      duration: 60,
      participants: 67,
      host: "Dr. Emily Rodriguez",
      type: "recurring",
      autoRecord: false,
    },
    {
      id: "ZOOM-004",
      title: "Biology Advanced - Review Session",
      course: "Biology Advanced",
      meetingId: "789-123-456",
      status: "error",
      startTime: "2025-06-18 16:00",
      duration: 75,
      participants: 28,
      host: "Dr. James Wilson",
      type: "one-time",
      autoRecord: true,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-red-500/20 text-red-500"
      case "scheduled":
        return "bg-white/20 text-white"
      case "completed":
        return "bg-white/20 text-white"
      case "error":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "live":
        return <Play className="w-4 h-4" />
      case "scheduled":
        return <Calendar className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ZOOM INTEGRATION</h1>
          <p className="text-sm text-neutral-400">Meeting management and video conferencing</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Create Meeting</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Sync Calendar</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL MEETINGS</p>
                <p className="text-2xl font-bold text-white font-mono">156</p>
              </div>
              <Video className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">LIVE NOW</p>
                <p className="text-2xl font-bold text-red-500 font-mono">3</p>
              </div>
              <Play className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">SCHEDULED TODAY</p>
                <p className="text-2xl font-bold text-white font-mono">18</p>
              </div>
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL PARTICIPANTS</p>
                <p className="text-2xl font-bold text-white font-mono">1,247</p>
              </div>
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="bg-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedMeeting(meeting)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-sm font-bold text-white tracking-wider">{meeting.title}</CardTitle>
                    <p className="text-xs text-neutral-400">{meeting.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">{getStatusIcon(meeting.status)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
                <Badge className="bg-neutral-800 text-neutral-300">{meeting.type.toUpperCase()}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Meeting ID:</span>
                  <span className="text-white font-mono">{meeting.meetingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Host:</span>
                  <span className="text-white">{meeting.host}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Start Time:</span>
                  <span className="text-white font-mono">{meeting.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Duration:</span>
                  <span className="text-white font-mono">{meeting.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Participants:</span>
                  <span className="text-white font-mono">{meeting.participants}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${meeting.autoRecord ? "bg-red-500" : "bg-neutral-500"}`}></div>
                  <span className="text-xs text-neutral-400">
                    {meeting.autoRecord ? "Auto Recording" : "No Recording"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-blue-500" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedMeeting.title}</CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedMeeting.id} • {selectedMeeting.course}
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
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">MEETING STATUS</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedMeeting.status)}
                      <Badge className={getStatusColor(selectedMeeting.status)}>
                        {selectedMeeting.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">MEETING DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Meeting ID:</span>
                        <span className="text-white font-mono">{selectedMeeting.meetingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Host:</span>
                        <span className="text-white">{selectedMeeting.host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Type:</span>
                        <span className="text-white">{selectedMeeting.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Auto Record:</span>
                        <span className="text-white">{selectedMeeting.autoRecord ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">SCHEDULE</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Start Time:</span>
                        <span className="text-white font-mono">{selectedMeeting.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Duration:</span>
                        <span className="text-white font-mono">{selectedMeeting.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Expected Participants:</span>
                        <span className="text-white font-mono">{selectedMeeting.participants}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">INTEGRATION</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-neutral-300">Auto-created from Moodle</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-neutral-300">Participants synced</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-neutral-300">Calendar updated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Join Meeting</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Edit Meeting
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
