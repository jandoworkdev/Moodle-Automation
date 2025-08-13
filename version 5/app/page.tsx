"use client"

import { useState } from "react"
import {
  ChevronRight,
  Monitor,
  BarChart3,
  Workflow,
  BookOpen,
  Video,
  Bell,
  RefreshCw,
  GraduationCap,
  Users,
  UserPlus,
  FileText,
  Calendar,
  PlayCircle,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardPage from "./dashboard/page"
import OverviewPage from "./overview/page"
import AnalyticsPage from "./analytics/page"
import AutomationsPage from "./automations/page"
import CoursesPage from "./lms/courses/page"
import StudentsPage from "./lms/students/page"
import EnrollmentsPage from "./lms/enrollments/page"
import AssignmentsPage from "./lms/assignments/page"
import MeetingsPage from "./zoom/meetings/page"
import RecordingsPage from "./zoom/recordings/page"
import SchedulePage from "./zoom/schedule/page"
import AttendancePage from "./zoom/attendance/page"

export default function LMSAutomationDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", icon: Monitor, label: "DASHBOARD", type: "single" },
    { id: "overview", icon: BarChart3, label: "OVERVIEW", type: "single" },
    { id: "analytics", icon: BarChart3, label: "ANALYTICS", type: "single" },
    { id: "automations", icon: Workflow, label: "AUTOMATIONS", type: "single" },
    {
      id: "lms",
      icon: BookOpen,
      label: "LMS INTEGRATION",
      type: "group",
      children: [
        { id: "lms-courses", icon: GraduationCap, label: "Courses" },
        { id: "lms-students", icon: Users, label: "Students" },
        { id: "lms-enrollments", icon: UserPlus, label: "Enrollments" },
        { id: "lms-assignments", icon: FileText, label: "Assignments" },
      ],
    },
    {
      id: "zoom",
      icon: Video,
      label: "ZOOM INTEGRATION",
      type: "group",
      children: [
        { id: "zoom-meetings", icon: Video, label: "Meetings" },
        { id: "zoom-recordings", icon: PlayCircle, label: "Recordings" },
        { id: "zoom-schedule", icon: Calendar, label: "Schedule" },
        { id: "zoom-attendance", icon: UserCheck, label: "Attendance" },
      ],
    },
  ]

  const [expandedGroups, setExpandedGroups] = useState(["lms", "zoom"])

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardPage />
      case "overview":
        return <OverviewPage />
      case "analytics":
        return <AnalyticsPage />
      case "automations":
        return <AutomationsPage />
      case "lms-courses":
        return <CoursesPage />
      case "lms-students":
        return <StudentsPage />
      case "lms-enrollments":
        return <EnrollmentsPage />
      case "lms-assignments":
        return <AssignmentsPage />
      case "zoom-meetings":
        return <MeetingsPage />
      case "zoom-recordings":
        return <RecordingsPage />
      case "zoom-schedule":
        return <SchedulePage />
      case "zoom-attendance":
        return <AttendancePage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-72"} bg-neutral-900 border-r border-neutral-700 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full md:h-auto ${!sidebarCollapsed ? "md:block" : ""}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
              <h1 className="text-[#27d4ba] font-bold text-lg tracking-wider">LMS AUTOMATION</h1>
              <p className="text-neutral-500 text-xs">Moodle 4.5 + Zoom API</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-neutral-400 hover:text-[#27d4ba]"
            >
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`}
              />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.type === "single" ? (
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                      activeSection === item.id
                        ? "bg-[#27d4ba] text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleGroup(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                        expandedGroups.includes(item.id)
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              expandedGroups.includes(item.id) ? "rotate-90" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>
                    {!sidebarCollapsed && expandedGroups.includes(item.id) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setActiveSection(child.id)}
                            className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${
                              activeSection === child.id
                                ? "bg-[#27d4ba] text-white"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                            }`}
                          >
                            <child.icon className="w-4 h-4" />
                            <span className="text-sm">{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {!sidebarCollapsed && (
            <div className="mt-8 p-4 bg-neutral-800 border border-neutral-700 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs text-white">SYSTEM ONLINE</span>
              </div>
              <div className="text-xs text-neutral-500">
                <div>UPTIME: 99.8%</div>
                <div>ACTIVE COURSES: 247</div>
                <div>ZOOM MEETINGS: 18</div>
                <div>AUTOMATIONS: 12 RUNNING</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
        {/* Top Toolbar */}
        <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">
              LMS AUTOMATION / <span className="text-[#27d4ba]">DASHBOARD</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-neutral-500">LAST SYNC: 17/06/2025 14:30 UTC</div>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-[#27d4ba]">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-[#27d4ba]">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  )
}
