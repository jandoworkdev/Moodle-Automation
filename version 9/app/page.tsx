"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Bot,
  BookOpen,
  Users,
  UserPlus,
  FileText,
  Video,
  Calendar,
  UserCheck,
  Settings,
  Shield,
  Zap,
  Database,
  Monitor,
  ChevronDown,
  ChevronRight,
  Home,
  Eye,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  status?: "active" | "warning" | "error"
  subItems?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Main control center overview",
  },
  {
    name: "Overview",
    href: "/overview",
    icon: Eye,
    description: "System-wide status and metrics",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
    description: "Performance analytics and insights",
  },
  {
    name: "Automations",
    href: "/automations",
    icon: Bot,
    description: "Automated workflow management",
  },
  {
    name: "LMS Integration",
    href: "#",
    icon: BookOpen,
    description: "Learning Management System",
    subItems: [
      {
        name: "Courses",
        href: "/lms/courses",
        icon: BookOpen,
        description: "Course management and tracking",
      },
      {
        name: "Users",
        href: "/lms/users",
        icon: Users,
        description: "Student, teacher, and admin management",
      },
      {
        name: "Enrollments",
        href: "/lms/enrollments",
        icon: UserPlus,
        description: "Enrollment tracking and management",
      },
      {
        name: "Assignments",
        href: "/lms/assignments",
        icon: FileText,
        description: "Assignment distribution and grading",
      },
    ],
  },
  {
    name: "Zoom Integration",
    href: "#",
    icon: Video,
    description: "Video conferencing platform",
    subItems: [
      {
        name: "Meetings",
        href: "/zoom/meetings",
        icon: Video,
        description: "Meeting management and controls",
      },
      {
        name: "Recordings",
        href: "/zoom/recordings",
        icon: Database,
        description: "Recording storage and access",
      },
      {
        name: "Schedule",
        href: "/zoom/schedule",
        icon: Calendar,
        description: "Meeting scheduling and calendar",
      },
      {
        name: "Attendance",
        href: "/zoom/attendance",
        icon: UserCheck,
        description: "Attendance tracking and reports",
      },
    ],
  },
]

export default function TacticalDashboard() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["LMS Integration", "Zoom Integration"])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-[#27d4ba]"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-[#27d4ba]" />
                <div>
                  <h1 className="text-2xl font-bold text-[#27d4ba]">TACTICAL COMMAND</h1>
                  <p className="text-sm text-gray-400">Educational Platform Control Center</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-[#27d4ba]/30 text-[#27d4ba]">
                <Activity className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Mission Control Interface</h2>
          <p className="text-gray-400">
            Access and manage all educational platform operations from this central command center.
          </p>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">LMS Status</p>
                  <p className="text-2xl font-bold text-[#27d4ba]">Online</p>
                </div>
                <BookOpen className="h-8 w-8 text-[#27d4ba]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Zoom Integration</p>
                  <p className="text-2xl font-bold text-green-400">Active</p>
                </div>
                <Video className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Automations</p>
                  <p className="text-2xl font-bold text-blue-400">Running</p>
                </div>
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">System Load</p>
                  <p className="text-2xl font-bold text-yellow-400">Normal</p>
                </div>
                <Monitor className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Grid */}
        <div className="space-y-6">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300">
                  <CardHeader>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpanded(item.name)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#27d4ba]/20 rounded-lg border border-[#27d4ba]/30">
                          <item.icon className="h-6 w-6 text-[#27d4ba]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">{item.name}</CardTitle>
                          <p className="text-gray-400 mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-[#27d4ba]/30 text-[#27d4ba]">
                          {item.subItems.length} modules
                        </Badge>
                        {expandedItems.includes(item.name) ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedItems.includes(item.name) && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-[#27d4ba]/30">
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href}>
                            <Card className="bg-gray-800/50 border-gray-700 hover:border-[#27d4ba]/50 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-[#27d4ba]/20 transition-colors">
                                    <subItem.icon className="h-5 w-5 text-gray-400 group-hover:text-[#27d4ba] transition-colors" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-white group-hover:text-[#27d4ba] transition-colors">
                                      {subItem.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">{subItem.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ) : (
                <Link href={item.href}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-[#27d4ba]/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-[#27d4ba]/20 rounded-lg border border-[#27d4ba]/30 group-hover:bg-[#27d4ba]/30 transition-colors">
                            <item.icon className="h-6 w-6 text-[#27d4ba]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-[#27d4ba] transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.status && <div className={`h-3 w-3 rounded-full ${getStatusColor(item.status)}`} />}
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#27d4ba] transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="h-16 bg-[#27d4ba]/20 border border-[#27d4ba]/30 text-[#27d4ba] hover:bg-[#27d4ba]/30 transition-all duration-300"
              variant="outline"
            >
              <Zap className="h-5 w-5 mr-2" />
              Run System Diagnostics
            </Button>
            <Button
              className="h-16 bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
              variant="outline"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Generate Reports
            </Button>
            <Button
              className="h-16 bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all duration-300"
              variant="outline"
            >
              <Settings className="h-5 w-5 mr-2" />
              System Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
