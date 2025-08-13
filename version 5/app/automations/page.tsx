"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Workflow, Play, Pause, CheckCircle, Clock, AlertTriangle, ArrowRight, Plus } from "lucide-react"

export default function AutomationsPage() {
  const [selectedFlow, setSelectedFlow] = useState(null)

  const automationFlows = [
    {
      id: "FLOW-001",
      name: "Course Enrollment & Meeting Creation",
      description: "Automatically create Zoom meetings when students enroll in courses",
      status: "active",
      trigger: "Student Enrollment",
      actions: ["Create Zoom Meeting", "Send Calendar Invite", "Update Course Page"],
      lastRun: "2 min ago",
      successRate: 98.5,
      totalRuns: 247,
      avgDuration: "1.2s",
    },
    {
      id: "FLOW-002",
      name: "Grade Synchronization",
      description: "Sync grades from Zoom attendance to Moodle gradebook",
      status: "active",
      trigger: "Meeting End",
      actions: ["Calculate Attendance", "Update Gradebook", "Send Notifications"],
      lastRun: "5 min ago",
      successRate: 96.8,
      totalRuns: 189,
      avgDuration: "2.1s",
    },
    {
      id: "FLOW-003",
      name: "Recording Distribution",
      description: "Automatically distribute meeting recordings to enrolled students",
      status: "paused",
      trigger: "Recording Available",
      actions: ["Process Recording", "Upload to Moodle", "Notify Students"],
      lastRun: "2 hours ago",
      successRate: 94.2,
      totalRuns: 156,
      avgDuration: "15.3s",
    },
    {
      id: "FLOW-004",
      name: "Attendance Tracking",
      description: "Track student attendance and update Moodle records",
      status: "error",
      trigger: "Meeting Start",
      actions: ["Monitor Participants", "Log Attendance", "Generate Reports"],
      lastRun: "1 hour ago",
      successRate: 87.3,
      totalRuns: 98,
      avgDuration: "0.8s",
    },
    {
      id: "FLOW-005",
      name: "Course Completion Workflow",
      description: "Handle course completion certificates and final assessments",
      status: "active",
      trigger: "Course Progress 100%",
      actions: ["Generate Certificate", "Schedule Final Meeting", "Send Completion Email"],
      lastRun: "30 min ago",
      successRate: 99.1,
      totalRuns: 67,
      avgDuration: "3.4s",
    },
    {
      id: "FLOW-006",
      name: "Assignment Reminder System",
      description: "Send automated reminders for upcoming assignments",
      status: "active",
      trigger: "Assignment Due Date",
      actions: ["Check Submissions", "Send Reminders", "Update Dashboard"],
      lastRun: "15 min ago",
      successRate: 97.2,
      totalRuns: 234,
      avgDuration: "0.9s",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "paused":
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
        return <Play className="w-4 h-4" />
      case "paused":
        return <Pause className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getSuccessRateColor = (rate) => {
    if (rate >= 95) return "text-white"
    if (rate >= 90) return "text-[#27d4ba]"
    return "text-red-500"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">AUTOMATION FLOWS</h1>
          <p className="text-sm text-neutral-400">Workflow management and process automation</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Flow
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Import Template</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE FLOWS</p>
                <p className="text-2xl font-bold text-white font-mono">12</p>
              </div>
              <Workflow className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL EXECUTIONS</p>
                <p className="text-2xl font-bold text-white font-mono">2,847</p>
              </div>
              <Play className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">SUCCESS RATE</p>
                <p className="text-2xl font-bold text-white font-mono">96.8%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ERRORS</p>
                <p className="text-2xl font-bold text-red-500 font-mono">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Flows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automationFlows.map((flow) => (
          <Card
            key={flow.id}
            className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
            onClick={() => setSelectedFlow(flow)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Workflow className="w-5 h-5 text-[#27d4ba]" />
                  <div>
                    <CardTitle className="text-sm font-bold text-white tracking-wider">{flow.name}</CardTitle>
                    <p className="text-xs text-neutral-400">{flow.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(flow.status)}
                  <Badge className={getStatusColor(flow.status)}>{flow.status.toUpperCase()}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-neutral-300">{flow.description}</p>

              <div className="space-y-2">
                <div className="text-xs text-neutral-400">WORKFLOW:</div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge className="bg-blue-500/20 text-blue-500">{flow.trigger}</Badge>
                  <ArrowRight className="w-3 h-3 text-neutral-400" />
                  <div className="flex flex-wrap gap-1">
                    {flow.actions.slice(0, 2).map((action, index) => (
                      <Badge key={index} className="bg-neutral-800 text-neutral-300">
                        {action}
                      </Badge>
                    ))}
                    {flow.actions.length > 2 && (
                      <Badge className="bg-neutral-800 text-neutral-300">+{flow.actions.length - 2} more</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-neutral-400 mb-1">Success Rate</div>
                  <div className={`font-mono ${getSuccessRateColor(flow.successRate)}`}>{flow.successRate}%</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Total Runs</div>
                  <div className="text-white font-mono">{flow.totalRuns}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Avg Duration</div>
                  <div className="text-white font-mono">{flow.avgDuration}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Last Run</div>
                  <div className="text-white font-mono">{flow.lastRun}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flow Detail Modal */}
      {selectedFlow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Workflow className="w-6 h-6 text-[#27d4ba]" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedFlow.name}</CardTitle>
                  <p className="text-sm text-neutral-400">{selectedFlow.id}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedFlow(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">FLOW STATUS</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedFlow.status)}
                      <Badge className={getStatusColor(selectedFlow.status)}>{selectedFlow.status.toUpperCase()}</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">PERFORMANCE METRICS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Success Rate:</span>
                        <span className={`font-mono ${getSuccessRateColor(selectedFlow.successRate)}`}>
                          {selectedFlow.successRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Total Runs:</span>
                        <span className="text-white font-mono">{selectedFlow.totalRuns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Avg Duration:</span>
                        <span className="text-white font-mono">{selectedFlow.avgDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Run:</span>
                        <span className="text-white font-mono">{selectedFlow.lastRun}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">WORKFLOW STEPS</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                          T
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">Trigger</div>
                          <div className="text-xs text-neutral-400">{selectedFlow.trigger}</div>
                        </div>
                      </div>

                      {selectedFlow.actions.map((action, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-neutral-800 rounded">
                          <div className="w-6 h-6 bg-[#27d4ba] rounded-full flex items-center justify-center text-xs text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-sm text-white">{action}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">DESCRIPTION</h3>
                <p className="text-sm text-neutral-300">{selectedFlow.description}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
                  {selectedFlow.status === "active" ? "Pause Flow" : "Start Flow"}
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Edit Flow
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
