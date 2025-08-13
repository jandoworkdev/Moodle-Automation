"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, Users, Activity, CheckCircle, AlertTriangle } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SYSTEM OVERVIEW</h1>
          <p className="text-sm text-neutral-400">Complete system status and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Generate Report</Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Export Data</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL USERS</p>
                <p className="text-2xl font-bold text-white font-mono">2,847</p>
                <p className="text-xs text-[#27d4ba]">+12% this month</p>
              </div>
              <Users className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE COURSES</p>
                <p className="text-2xl font-bold text-white font-mono">247</p>
                <p className="text-xs text-[#27d4ba]">+8% this month</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">MEETINGS TODAY</p>
                <p className="text-2xl font-bold text-white font-mono">18</p>
                <p className="text-xs text-[#27d4ba]">3 in progress</p>
              </div>
              <Video className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">SYSTEM UPTIME</p>
                <p className="text-2xl font-bold text-white font-mono">99.8%</p>
                <p className="text-xs text-white">247 days</p>
              </div>
              <Activity className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Status */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PLATFORM STATUS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-sm text-white font-medium">Moodle LMS</div>
                    <div className="text-xs text-neutral-400">All services operational</div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">ONLINE</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-sm text-white font-medium">Zoom Integration</div>
                    <div className="text-xs text-neutral-400">API responding normally</div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">ONLINE</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-white font-medium">Automation Engine</div>
                    <div className="text-xs text-neutral-400">High CPU usage detected</div>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-500">WARNING</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-sm text-white font-medium">Database Cluster</div>
                    <div className="text-xs text-neutral-400">Performance optimal</div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">ONLINE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">RECENT ACTIVITY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  time: "14:25",
                  type: "automation",
                  message: "Course enrollment automation completed",
                  status: "success",
                },
                {
                  time: "14:20",
                  type: "meeting",
                  message: "Zoom meeting created for Advanced Math",
                  status: "success",
                },
                {
                  time: "14:15",
                  type: "sync",
                  message: "Grade synchronization completed",
                  status: "success",
                },
                {
                  time: "14:10",
                  type: "error",
                  message: "Failed to create meeting for Biology",
                  status: "error",
                },
                {
                  time: "14:05",
                  type: "user",
                  message: "23 new students enrolled",
                  status: "info",
                },
                {
                  time: "14:00",
                  type: "system",
                  message: "System health check completed",
                  status: "success",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 hover:bg-neutral-800 rounded transition-colors">
                  <div className="text-xs text-neutral-500 font-mono w-12">{activity.time}</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">{activity.message}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`text-xs ${
                          activity.status === "success"
                            ? "bg-white/20 text-white"
                            : activity.status === "error"
                              ? "bg-red-500/20 text-red-500"
                              : activity.status === "info"
                                ? "bg-[#27d4ba]/20 text-[#27d4ba]"
                                : "bg-neutral-500/20 text-neutral-300"
                        }`}
                      >
                        {activity.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PERFORMANCE METRICS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">API Response Time</span>
                  <span className="text-white font-mono">120ms</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-[#27d4ba] h-2 rounded-full w-[75%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">Database Performance</span>
                  <span className="text-white font-mono">95%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">Automation Success</span>
                  <span className="text-white font-mono">98.7%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[98%]"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">2,847</div>
                <div className="text-xs text-neutral-400">Total API Calls Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#27d4ba] font-mono">156</div>
                <div className="text-xs text-neutral-400">Automations Executed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">18</div>
                <div className="text-xs text-neutral-400">Active Meetings</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-xs text-neutral-400">System Health: Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                <span className="text-xs text-neutral-400">Integration Status: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-neutral-400">Zoom API: Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-neutral-400">Maintenance: Scheduled</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
