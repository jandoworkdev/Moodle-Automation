"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, BookOpen, Video, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ANALYTICS DASHBOARD</h1>
          <p className="text-sm text-neutral-400">Comprehensive data analysis and insights</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter Data
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ENGAGEMENT RATE</p>
                <p className="text-2xl font-bold text-white font-mono">87.3%</p>
                <p className="text-xs text-[#27d4ba]">+5.2% vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">COMPLETION RATE</p>
                <p className="text-2xl font-bold text-white font-mono">92.1%</p>
                <p className="text-xs text-[#27d4ba]">+2.8% vs last month</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">AVG SESSION TIME</p>
                <p className="text-2xl font-bold text-white font-mono">45m</p>
                <p className="text-xs text-[#27d4ba]">+12% vs last month</p>
              </div>
              <Video className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE LEARNERS</p>
                <p className="text-2xl font-bold text-white font-mono">1,834</p>
                <p className="text-xs text-[#27d4ba]">+156 this week</p>
              </div>
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">USAGE TRENDS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-7 grid-rows-8 opacity-20">
                {Array.from({ length: 56 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,200 50,180 100,160 150,140 200,120 250,100 300,80"
                  fill="none"
                  stroke="#27d4ba"
                  strokeWidth="3"
                />
                <polyline
                  points="0,220 50,210 100,190 150,170 200,150 250,130 300,110"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-[#27d4ba]"></div>
                  <span className="text-neutral-400">Course Engagement</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span className="text-neutral-400">Meeting Attendance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              TOP PERFORMING COURSES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Advanced Mathematics", students: 245, completion: 94, engagement: 89 },
                { name: "Computer Science Fundamentals", students: 189, completion: 91, engagement: 87 },
                { name: "Physics Laboratory", students: 156, completion: 88, engagement: 85 },
                { name: "Chemistry Basics", students: 134, completion: 86, engagement: 82 },
                { name: "Biology Advanced", students: 98, completion: 83, engagement: 79 },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">{course.name}</span>
                    <Badge className="bg-[#27d4ba]/20 text-[#27d4ba]">{course.students} students</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Completion</span>
                        <span className="text-white font-mono">{course.completion}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-1">
                        <div className="bg-white h-1 rounded-full" style={{ width: `${course.completion}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Engagement</span>
                        <span className="text-white font-mono">{course.engagement}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-1">
                        <div className="bg-[#27d4ba] h-1 rounded-full" style={{ width: `${course.engagement}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting Analytics */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">MEETING ANALYTICS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono">156</div>
                <div className="text-xs text-neutral-400">Total Meetings This Month</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Average Duration</span>
                  <span className="text-white font-mono">47 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Attendance Rate</span>
                  <span className="text-white font-mono">89.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Recording Usage</span>
                  <span className="text-white font-mono">76.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Peak Hours</span>
                  <span className="text-white font-mono">10-12 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">STUDENT ENGAGEMENT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#27d4ba] font-mono">87.3%</div>
                <div className="text-xs text-neutral-400">Overall Engagement Score</div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Daily Active Users</span>
                    <span className="text-white font-mono">1,247</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-[#27d4ba] h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Assignment Completion</span>
                    <span className="text-white font-mono">92.1%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Forum Participation</span>
                    <span className="text-white font-mono">68.4%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[68%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SYSTEM PERFORMANCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-mono">99.8%</div>
                <div className="text-xs text-neutral-400">System Uptime</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">API Response Time</span>
                  <span className="text-white font-mono">120ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Database Performance</span>
                  <span className="text-white font-mono">95.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Automation Success</span>
                  <span className="text-white font-mono">98.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Error Rate</span>
                  <span className="text-red-500 font-mono">0.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
