"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PlayCircle, Download, Clock, Search, Filter, Eye, Share, LayoutGrid, List, Table } from "lucide-react"

export default function RecordingsPage() {
  const [selectedRecording, setSelectedRecording] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewFormat, setViewFormat] = useState("card")

  const recordings = [
    {
      id: "REC-001",
      title: "Advanced Mathematics - Lecture 15",
      course: "Advanced Mathematics",
      meetingId: "123-456-789",
      recordingDate: "2025-06-16",
      duration: "1h 32m",
      fileSize: "2.4 GB",
      views: 189,
      downloads: 45,
      host: "Dr. Sarah Johnson",
      status: "available",
      format: "MP4",
      quality: "HD",
      autoTranscript: true,
    },
    {
      id: "REC-002",
      title: "Physics Lab - Experiment Demo",
      course: "Physics Laboratory",
      meetingId: "987-654-321",
      recordingDate: "2025-06-15",
      duration: "2h 15m",
      fileSize: "3.8 GB",
      views: 156,
      downloads: 67,
      host: "Prof. Michael Chen",
      status: "available",
      format: "MP4",
      quality: "HD",
      autoTranscript: true,
    },
    {
      id: "REC-003",
      title: "CS Fundamentals - Q&A Session",
      course: "Computer Science Fundamentals",
      meetingId: "456-789-123",
      recordingDate: "2025-06-14",
      duration: "58m",
      fileSize: "1.2 GB",
      views: 234,
      downloads: 89,
      host: "Dr. Emily Rodriguez",
      status: "processing",
      format: "MP4",
      quality: "HD",
      autoTranscript: false,
    },
    {
      id: "REC-004",
      title: "Biology Advanced - Review Session",
      course: "Biology Advanced",
      meetingId: "789-123-456",
      recordingDate: "2025-06-13",
      duration: "1h 18m",
      fileSize: "2.1 GB",
      views: 98,
      downloads: 23,
      host: "Dr. James Wilson",
      status: "available",
      format: "MP4",
      quality: "HD",
      autoTranscript: true,
    },
    {
      id: "REC-005",
      title: "Chemistry Basics - Lab Safety",
      course: "Chemistry Basics",
      meetingId: "321-654-987",
      recordingDate: "2025-06-12",
      duration: "45m",
      fileSize: "890 MB",
      views: 67,
      downloads: 12,
      host: "Prof. Lisa Anderson",
      status: "available",
      format: "MP4",
      quality: "SD",
      autoTranscript: true,
    },
    {
      id: "REC-006",
      title: "English Literature - Discussion",
      course: "English Literature",
      meetingId: "654-987-321",
      recordingDate: "2025-06-11",
      duration: "1h 5m",
      fileSize: "1.5 GB",
      views: 45,
      downloads: 8,
      host: "Dr. Robert Taylor",
      status: "expired",
      format: "MP4",
      quality: "HD",
      autoTranscript: false,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-white/20 text-white"
      case "processing":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "expired":
        return "bg-red-500/20 text-red-500"
      case "error":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getQualityColor = (quality) => {
    switch (quality) {
      case "HD":
        return "bg-white/20 text-white"
      case "SD":
        return "bg-neutral-500/20 text-neutral-300"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const filteredRecordings = recordings.filter(
    (recording) =>
      recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.host.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">RECORDINGS</h1>
          <p className="text-sm text-neutral-400">Meeting recordings and media management</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Download className="w-4 h-4 mr-2" />
            Bulk Download
          </Button>
          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
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
                placeholder="Search recordings..."
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
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL RECORDINGS</p>
                <p className="text-2xl font-bold text-white font-mono">342</p>
              </div>
              <PlayCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL VIEWS</p>
                <p className="text-2xl font-bold text-white font-mono">12.4K</p>
              </div>
              <Eye className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">STORAGE USED</p>
                <p className="text-2xl font-bold text-white font-mono">847GB</p>
              </div>
              <Download className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recordings Display */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecordings.map((recording) => (
            <Card
              key={recording.id}
              className="bg-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedRecording(recording)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <CardTitle className="text-sm font-bold text-white tracking-wider">{recording.title}</CardTitle>
                      <p className="text-xs text-neutral-400">{recording.course}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(recording.status)}>{recording.status.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge className={getQualityColor(recording.quality)}>{recording.quality}</Badge>
                  <Badge className="bg-neutral-800 text-neutral-300">{recording.format}</Badge>
                  {recording.autoTranscript && <Badge className="bg-[#27d4ba]/20 text-[#27d4ba]">TRANSCRIPT</Badge>}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Recording Date:</span>
                    <span className="text-white font-mono">{recording.recordingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Duration:</span>
                    <span className="text-white font-mono">{recording.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">File Size:</span>
                    <span className="text-white font-mono">{recording.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Host:</span>
                    <span className="text-white">{recording.host}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white font-mono">{recording.views}</div>
                    <div className="text-neutral-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white font-mono">{recording.downloads}</div>
                    <div className="text-neutral-400">Downloads</div>
                  </div>
                </div>

                {recording.status === "available" && (
                  <div className="flex gap-2 pt-2 border-t border-neutral-700">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewFormat === "list" && (
        <div className="space-y-4">
          {filteredRecordings.map((recording) => (
            <Card
              key={recording.id}
              className="bg-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedRecording(recording)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <PlayCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wider">{recording.title}</h3>
                      <p className="text-xs text-neutral-400">
                        {recording.course} • {recording.host}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-white font-mono">{recording.duration}</div>
                      <div className="text-xs text-neutral-400">
                        {recording.views} views • {recording.fileSize}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(recording.status)}>{recording.status.toUpperCase()}</Badge>
                      <Badge className={getQualityColor(recording.quality)}>{recording.quality}</Badge>
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
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">RECORDING</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">HOST</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">DATE</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">DURATION</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">VIEWS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecordings.map((recording) => (
                    <tr
                      key={recording.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 cursor-pointer"
                      onClick={() => setSelectedRecording(recording)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-sm font-medium text-white">{recording.title}</div>
                            <div className="text-xs text-neutral-400">{recording.course}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white">{recording.host}</td>
                      <td className="p-4 text-sm text-white font-mono">{recording.recordingDate}</td>
                      <td className="p-4 text-sm text-white font-mono">{recording.duration}</td>
                      <td className="p-4 text-sm text-white font-mono">{recording.views}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(recording.status)}>{recording.status.toUpperCase()}</Badge>
                          <Badge className={getQualityColor(recording.quality)}>{recording.quality}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        {recording.status === "available" ? (
                          <div className="flex gap-1">
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                              <PlayCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" disabled className="bg-neutral-700 text-neutral-400">
                            Processing
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recording Detail Modal */}
      {selectedRecording && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-blue-500" />
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">
                    {selectedRecording.title}
                  </CardTitle>
                  <p className="text-sm text-neutral-400">
                    {selectedRecording.id} • {selectedRecording.course}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedRecording(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">RECORDING STATUS</h3>
                    <Badge className={getStatusColor(selectedRecording.status)}>
                      {selectedRecording.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">RECORDING DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Recording ID:</span>
                        <span className="text-white font-mono">{selectedRecording.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Meeting ID:</span>
                        <span className="text-white font-mono">{selectedRecording.meetingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Host:</span>
                        <span className="text-white">{selectedRecording.host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Recording Date:</span>
                        <span className="text-white font-mono">{selectedRecording.recordingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Duration:</span>
                        <span className="text-white font-mono">{selectedRecording.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">File Size:</span>
                        <span className="text-white font-mono">{selectedRecording.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">MEDIA INFORMATION</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Badge className={getQualityColor(selectedRecording.quality)}>
                          {selectedRecording.quality}
                        </Badge>
                        <Badge className="bg-neutral-800 text-neutral-300">{selectedRecording.format}</Badge>
                        {selectedRecording.autoTranscript && (
                          <Badge className="bg-[#27d4ba]/20 text-[#27d4ba]">TRANSCRIPT</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">USAGE STATISTICS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Total Views:</span>
                        <span className="text-white font-mono">{selectedRecording.views}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Downloads:</span>
                        <span className="text-white font-mono">{selectedRecording.downloads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Engagement Rate:</span>
                        <span className="text-white font-mono">
                          {Math.round((selectedRecording.views / 200) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">FEATURES</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-neutral-300">HD Video Quality</span>
                      </div>
                      {selectedRecording.autoTranscript && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
                          <span className="text-neutral-300">Auto-generated Transcript</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-neutral-300">Downloadable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                {selectedRecording.status === "available" && (
                  <>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Play Recording
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </>
                )}
                {selectedRecording.status === "processing" && (
                  <Button disabled className="bg-neutral-700 text-neutral-400">
                    <Clock className="w-4 h-4 mr-2" />
                    Processing...
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
