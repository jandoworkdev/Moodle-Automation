"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Video,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Search,
  Plus,
  LayoutGrid,
  List,
  Table,
  CloudDownload,
} from "lucide-react"

type Meeting = {
  id: string;
  title: string;
  course: string;
  meetingId: string;
  status: string;
  startTime: string;
  duration: number;
  participants: number;
  joined: number;
  host: string;
  type: string;
  autoRecord: boolean;
  password: string;
};

export default function GeneratePage() {
  // CSV Upload Modal State and Handlers (moved above return)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvError, setCsvError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError("")
    setUploadResult(null)
    const files = e.target.files;
    if (!files || files.length === 0) {
      setCsvFile(null);
      return;
    }
    const file = files[0];
    if (file && file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setCsvError("Por favor selecciona un archivo CSV válido.");
      setCsvFile(null);
      return;
    }
    setCsvFile(file);
  }

  const handleCsvUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCsvError("")
    setUploadResult(null)
    if (!csvFile) {
      setCsvError("Selecciona un archivo CSV.")
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', csvFile)
      const res = await fetch('http://localhost:4000/api/zoom-bulk-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al subir el archivo')
      setUploadResult(data)
    } catch (err: any) {
      setUploadResult({ error: err.message })
    } finally {
      setUploading(false)
    }
  }

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewFormat, setViewFormat] = useState("card")

  const meetings = [
    {
      id: "ZOOM-001",
      title: "Advanced Mathematics - Lecture 15",
      course: "Advanced Mathematics",
      meetingId: "123-456-789",
      status: "scheduled",
      startTime: "2025-06-18 10:00",
      duration: 90,
      participants: 245,
      joined: 0,
      host: "Dr. Sarah Johnson",
      type: "recurring",
      autoRecord: true,
      password: "math2025",
    },
    {
      id: "ZOOM-002",
      title: "Physics Lab - Experiment Demo",
      course: "Physics Laboratory",
      meetingId: "987-654-321",
      status: "live",
      startTime: "2025-06-17 14:00",
      duration: 120,
      participants: 189,
      joined: 167,
      host: "Prof. Michael Chen",
      type: "one-time",
      autoRecord: true,
      password: "physics123",
    },
    {
      id: "ZOOM-003",
      title: "CS Fundamentals - Q&A Session",
      course: "Computer Science Fundamentals",
      meetingId: "456-789-123",
      status: "scheduled",
      startTime: "2025-06-19 09:00",
      duration: 60,
      participants: 156,
      joined: 0,
      host: "Dr. Emily Rodriguez",
      type: "recurring",
      autoRecord: false,
      password: "cs2025",
    },
    {
      id: "ZOOM-004",
      title: "Biology Advanced - Review Session",
      course: "Biology Advanced",
      meetingId: "789-123-456",
      status: "completed",
      startTime: "2025-06-16 16:00",
      duration: 75,
      participants: 134,
      joined: 128,
      host: "Dr. James Wilson",
      type: "one-time",
      autoRecord: true,
      password: "bio2025",
    },
    {
      id: "ZOOM-005",
      title: "Chemistry Basics - Lab Safety",
      course: "Chemistry Basics",
      meetingId: "321-654-987",
      status: "scheduled",
      startTime: "2025-06-18 11:00",
      duration: 45,
      participants: 98,
      joined: 0,
      host: "Prof. Lisa Anderson",
      type: "one-time",
      autoRecord: true,
      password: "chem2025",
    },
    {
      id: "ZOOM-006",
      title: "English Literature - Discussion",
      course: "English Literature",
      meetingId: "654-987-321",
      status: "cancelled",
      startTime: "2025-06-17 15:00",
      duration: 60,
      participants: 76,
      joined: 0,
      host: "Dr. Robert Taylor",
      type: "recurring",
      autoRecord: false,
      password: "eng2025",
    },
  ]

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Play className="w-4 h-4" />
      case "scheduled":
        return <Calendar className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.host.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">GENERAR SESIONES</h1>
          <p className="text-sm text-neutral-400">Gestión y programación de reuniones de Zoom</p>
        </div>
        <div className="flex gap-2">
          {/* CSV Upload Button and Modal */}
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setShowUploadModal(true)}
          >
            <CloudDownload className="w-4 h-4 mr-2" />
            Subir Sesiones
          </Button>
          {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg w-full max-w-xs p-6 relative mx-2">
                <button
                  className="absolute top-2 right-2 text-neutral-400 hover:text-white text-xl"
                  onClick={() => {
                    setShowUploadModal(false)
                    setCsvError("")
                    setCsvFile(null)
                    setUploadResult(null)
                  }}
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CloudDownload className="w-5 h-5 text-blue-500" />
                  Subir archivo CSV de sesiones
                </h2>
                <form onSubmit={handleCsvUpload} className="space-y-4">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  {csvError && <div className="text-red-500 text-xs">{csvError}</div>}
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                      onClick={() => {
                        setShowUploadModal(false)
                        setCsvError("")
                        setCsvFile(null)
                        setUploadResult(null)
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={!csvFile || uploading}
                    >
                      {uploading ? 'Subiendo...' : 'Subir'}
                    </Button>
                  </div>
                </form>
                {uploading && (
                  <div className="mt-2 text-blue-400 text-xs">Subiendo archivo, por favor espera...</div>
                )}
                {uploadResult && (
                  <div className={`mt-4 text-sm text-center ${uploadResult.error ? 'text-red-500' : 'text-green-500'}`}>
                    {uploadResult.error
                      ? `Error: ${uploadResult.error}`
                      : `✅ ${uploadResult.created?.length || 0} reuniones creadas correctamente.`}
                  </div>
                )}
              </div>
            </div>
          )}

          <Button className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">Sync Calendar</Button>
        </div>
        <div className="flex items-center gap-1 ml-4 p-1 bg-neutral-800 rounded">
          <Button
            size="sm"
            variant={viewFormat === "card" ? "default" : "ghost"}
            onClick={() => setViewFormat("card")}
            className={viewFormat === "card" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewFormat === "list" ? "default" : "ghost"}
            onClick={() => setViewFormat("list")}
            className={viewFormat === "list" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewFormat === "table" ? "default" : "ghost"}
            onClick={() => setViewFormat("table")}
            className={viewFormat === "table" ? "bg-[#27d4ba] hover:bg-[#1fb5a0]" : "text-neutral-400 hover:text-white"}
          >
            <Table className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search meetings..."
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
      </div>

      {/* Meetings Display */}
      {viewFormat === "card" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
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
                    <span className="text-white font-mono">
                      {meeting.status === "live" ? `${meeting.joined}/${meeting.participants}` : meeting.participants}
                    </span>
                  </div>
                </div>

                {meeting.status === "live" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Attendance</span>
                      <span className="text-white font-mono">
                        {Math.round((meeting.joined / meeting.participants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round((meeting.joined / meeting.participants) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${meeting.autoRecord ? "bg-red-500" : "bg-neutral-500"}`}
                    ></div>
                    <span className="text-xs text-neutral-400">
                      {meeting.autoRecord ? "Auto Recording" : "No Recording"}
                    </span>
                  </div>
                  {meeting.status === "live" && (
                    <Badge className="bg-red-500/20 text-red-500 animate-pulse">LIVE</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewFormat === "list" && (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <Card
              key={meeting.id}
              className="bg-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedMeeting(meeting)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Video className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wider">{meeting.title}</h3>
                      <p className="text-xs text-neutral-400">
                        {meeting.course} • {meeting.host}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-white font-mono">{meeting.startTime}</div>
                      <div className="text-xs text-neutral-400">
                        {meeting.duration} min • {meeting.participants} participants
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(meeting.status)}
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
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
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">MEETING</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">HOST</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">START TIME</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">DURATION</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">PARTICIPANTS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">STATUS</th>
                    <th className="p-4 text-xs font-medium text-neutral-400 tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeetings.map((meeting) => (
                    <tr
                      key={meeting.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 cursor-pointer"
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Video className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-sm font-medium text-white">{meeting.title}</div>
                            <div className="text-xs text-neutral-400">{meeting.course}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white">{meeting.host}</td>
                      <td className="p-4 text-sm text-white font-mono">{meeting.startTime}</td>
                      <td className="p-4 text-sm text-white font-mono">{meeting.duration} min</td>
                      <td className="p-4 text-sm text-white font-mono">
                        {meeting.status === "live" ? `${meeting.joined}/${meeting.participants}` : meeting.participants}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(meeting.status)}
                          <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        {meeting.status === "live" ? (
                          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                            Join
                          </Button>
                        ) : meeting.status === "scheduled" ? (
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            Start
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-[#27d4ba] hover:bg-[#1fb5a0] text-white">
                            View
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
                        <span className="text-neutral-400">Password:</span>
                        <span className="text-white font-mono">{selectedMeeting.password}</span>
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
                      {selectedMeeting.status === "live" && (
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Currently Joined:</span>
                          <span className="text-white font-mono">{selectedMeeting.joined}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">INTEGRATION</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-[#27d4ba] rounded-full"></div>
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
                {selectedMeeting.status === "live" ? (
                  <Button className="bg-red-500 hover:bg-red-600 text-white">Join Meeting</Button>
                ) : selectedMeeting.status === "scheduled" ? (
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">Start Meeting</Button>
                ) : (
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">View Recording</Button>
                )}
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
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
