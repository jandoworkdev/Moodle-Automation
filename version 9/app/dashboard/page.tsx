"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, Users, Calendar, TrendingUp, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Integration Status */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">INTEGRATION STATUS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#27d4ba]" />
                  <div>
                    <div className="text-sm text-white font-medium">Moodle 4.5</div>
                    <div className="text-xs text-neutral-400">LMS Platform</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs text-white">CONNECTED</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-white font-medium">Zoom API</div>
                    <div className="text-xs text-neutral-400">Video Platform</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs text-white">CONNECTED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white font-mono">247</div>
                  <div className="text-xs text-neutral-500">Active Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white font-mono">1,834</div>
                  <div className="text-xs text-neutral-500">Students</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Automations */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">RECENT AUTOMATIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  time: "17/06/2025 14:25",
                  action: "Created Zoom meeting for",
                  course: "Advanced Mathematics",
                  status: "success",
                },
                {
                  time: "17/06/2025 14:20",
                  action: "Enrolled 23 students in",
                  course: "Physics Lab",
                  status: "success",
                },
                {
                  time: "17/06/2025 14:15",
                  action: "Updated meeting link for",
                  course: "Chemistry Basics",
                  status: "success",
                },
                {
                  time: "17/06/2025 14:10",
                  action: "Failed to create meeting for",
                  course: "Biology Advanced",
                  status: "error",
                },
                {
                  time: "17/06/2025 14:05",
                  action: "Synchronized grades for",
                  course: "Computer Science",
                  status: "success",
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="text-xs border-l-2 border-[#27d4ba] pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
                >
                  <div className="text-neutral-500 font-mono">{log.time}</div>
                  <div className="text-white">
                    {log.action} <span className="text-[#27d4ba] font-medium">{log.course}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        log.status === "success" ? "bg-white/20 text-white" : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Connection Monitor */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              API CONNECTION MONITOR
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Connection Visualization */}
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 border-2 border-[#27d4ba] rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-2 border border-white rounded-full opacity-40"></div>
              <div className="absolute inset-4 border border-blue-500 rounded-full opacity-20"></div>
              {/* Connection lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white opacity-30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-white opacity-30"></div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span># API Status Monitor</span>
              </div>
              <div className="text-white">{"> [MOODLE] ::: Connected >> Response: 120ms"}</div>
              <div className="text-blue-500">{"> [ZOOM] ::: Connected >> Response: 89ms"}</div>
              <div className="text-white">{"> SYNC STATUS: ACTIVE"}</div>
              <div className="text-neutral-400">{"> Last sync: 17/06/2025 14:30:15 UTC"}</div>
            </div>
          </CardContent>
        </Card>

        {/* Automation Performance Chart */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              AUTOMATION PERFORMANCE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#27d4ba"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-500 -ml-8 font-mono">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 -mb-6 font-mono">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-[#27d4ba]"></div>
                  <span className="text-neutral-400">Success Rate</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-blue-500 border-dashed"></div>
                  <span className="text-neutral-400">Response Time</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">QUICK STATS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Today's Meetings</span>
                </div>
                <span className="text-sm text-white font-mono">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Active Students</span>
                </div>
                <span className="text-sm text-white font-mono">1,247</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Success Rate</span>
                </div>
                <span className="text-sm text-white font-mono">98.7%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Automations Running</span>
                </div>
                <span className="text-sm text-white font-mono">12</span>
              </div>

              <div className="pt-4 border-t border-neutral-700">
                <div className="text-xs text-neutral-400 mb-2">System Health</div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[98%]"></div>
                </div>
                <div className="text-xs text-white font-mono mt-1">98% Operational</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
