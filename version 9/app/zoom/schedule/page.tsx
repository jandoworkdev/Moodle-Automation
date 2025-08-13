"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Clock, Video, Users, Plus } from "lucide-react"

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  const meetings = [
    {
      id: "ZOOM-001",
      title: "Advanced Mathematics - Lecture 15",
      course: "Advanced Mathematics",
      time: "10:00",
      duration: 90,
      participants: 245,
      host: "Dr. Sarah Johnson",
      status: "scheduled",
      recurring: true,
      room: "Virtual Room A",
      date: "2025-06-18",
    },
    {
      id: "ZOOM-002",
      title: "Physics Lab - Experiment Demo",
      course: "Physics Laboratory",
      time: "14:00",
      duration: 120,
      participants: 189,
      host: "Prof. Michael Chen",
      status: "live",
      recurring: false,
      room: "Virtual Room B",
      date: "2025-06-17",
    },
    {
      id: "ZOOM-003",
      title: "CS Fundamentals - Q&A Session",
      course: "Computer Science Fundamentals",
      time: "09:00",
      duration: 60,
      participants: 156,
      host: "Dr. Emily Rodriguez",
      status: "scheduled",
      recurring: true,
      room: "Virtual Room C",
      date: "2025-06-19",
    },
    {
      id: "ZOOM-004",
      title: "Biology Advanced - Review Session",
      course: "Biology Advanced",
      time: "16:00",
      duration: 75,
      participants: 134,
      host: "Dr. James Wilson",
      status: "completed",
      recurring: false,
      room: "Virtual Room D",
      date: "2025-06-16",
    },
    {
      id: "ZOOM-005",
      title: "Chemistry Basics - Lab Safety",
      course: "Chemistry Basics",
      time: "11:00",
      duration: 45,
      participants: 98,
      host: "Prof. Lisa Anderson",
      status: "scheduled",
      recurring: false,
      room: "Virtual Room E",
      date: "2025-06-18",
    },
  ]

  const getWeekDays = (date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1)
    startDate.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getWeekDays(currentWeek)
  const today = new Date().toDateString()

  const getMeetingsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0]
    return meetings.filter((meeting) => meeting.date === dateStr)
  }

  const todaysMeetings = getMeetingsForDate(new Date())
  const upcomingMeetings = meetings
    .filter((meeting) => {
      const meetingDate = new Date(meeting.date)
      const now = new Date()
      return meetingDate >= now
    })
    .slice(0, 5)

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-red-500/20 text-red-500"
      case "scheduled":
        return "bg-white/20 text-white"
      case "completed":
        return "bg-white/20 text-white"
      case "cancelled":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SCHEDULE</h1>
          <p className="text-sm text-neutral-400">Meeting schedule and calendar management</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Sync Calendar</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TODAY'S MEETINGS</p>
                <p className="text-2xl font-bold text-white font-mono">{todaysMeetings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">THIS WEEK</p>
                <p className="text-2xl font-bold text-white font-mono">24</p>
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
                <p className="text-2xl font-bold text-red-500 font-mono">2</p>
              </div>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL PARTICIPANTS</p>
                <p className="text-2xl font-bold text-white font-mono">1.2K</p>
              </div>
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white tracking-wider">WEEKLY SCHEDULE</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newWeek = new Date(currentWeek)
                    newWeek.setDate(currentWeek.getDate() - 7)
                    setCurrentWeek(newWeek)
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-neutral-300 font-mono">
                  {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newWeek = new Date(currentWeek)
                    newWeek.setDate(currentWeek.getDate() + 7)
                    setCurrentWeek(newWeek)
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-neutral-400 mb-2">{day}</div>
                  <div
                    className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                      weekDays[index].toDateString() === today
                        ? "bg-[#27d4ba] text-black font-bold"
                        : "text-neutral-300 hover:bg-neutral-800"
                    }`}
                    onClick={() => setSelectedDate(weekDays[index])}
                  >
                    {weekDays[index].getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                <div key={hour} className="flex items-center gap-4 py-2 border-b border-neutral-800">
                  <div className="w-16 text-xs text-neutral-400 font-mono">{hour.toString().padStart(2, "0")}:00</div>
                  <div className="flex-1 grid grid-cols-7 gap-1">
                    {weekDays.map((day, dayIndex) => {
                      const dayMeetings = getMeetingsForDate(day).filter(
                        (meeting) => Number.parseInt(meeting.time.split(":")[0]) === hour,
                      )
                      return (
                        <div key={dayIndex} className="min-h-8">
                          {dayMeetings.map((meeting) => (
                            <div
                              key={meeting.id}
                              className={`text-xs p-1 rounded mb-1 cursor-pointer ${
                                meeting.status === "live"
                                  ? "bg-red-500/20 text-red-500 border border-red-500/50"
                                  : "bg-blue-500/20 text-blue-500 border border-blue-500/50"
                              }`}
                              title={meeting.title}
                            >
                              <div className="truncate">{meeting.course}</div>
                              <div className="text-xs opacity-75">{meeting.time}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white tracking-wider">TODAY'S SCHEDULE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysMeetings.length > 0 ? (
                todaysMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-3 bg-neutral-800 rounded border border-neutral-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-white">{meeting.title}</div>
                        <div className="text-xs text-neutral-400">{meeting.course}</div>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {meeting.time} ({meeting.duration}min)
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {meeting.participants} participants
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-3 h-3" />
                        {meeting.room}
                      </div>
                    </div>
                    {meeting.status === "live" && (
                      <Button size="sm" className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white">
                        Join Meeting
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-neutral-400 py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No meetings scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white tracking-wider">UPCOMING MEETINGS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                    <div>
                      <div className="text-sm text-white">{meeting.course}</div>
                      <div className="text-xs text-neutral-400">
                        {meeting.date} at {meeting.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {meeting.recurring && <Badge className="bg-[#27d4ba]/20 text-[#27d4ba] text-xs">RECURRING</Badge>}
                      <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
