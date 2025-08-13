"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  UserCheck,
  Search,
  Grid3X3,
  List,
  Table,
  Eye,
  Edit,
  Mail,
  MapPin,
  BookOpen,
  TrendingUp,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useMoodle } from "@/hooks/use-moodle"
import { MoodleConfigModal } from "@/components/moodle-config-modal"
import type { MoodleUser } from "@/lib/moodle-api"

type ViewFormat = "card" | "list" | "table"
type UserRole = "all" | "student" | "teacher" | "admin"

export default function UsersPage() {
  const {
    users,
    usersLoading,
    isConnected,
    isLoading,
    error,
    config,
    updateConfig,
    testConnection,
    fetchUsers,
    stats,
  } = useMoodle()

  const [viewFormat, setViewFormat] = useState<ViewFormat>("card")
  const [selectedRole, setSelectedRole] = useState<UserRole>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<MoodleUser | null>(null)

  // Fetch users when connected
  useEffect(() => {
    if (isConnected && users.length === 0) {
      fetchUsers()
    }
  }, [isConnected, users.length, fetchUsers])

  // Filter users based on search, role, and letter
  const filteredUsers = useMemo(() => {
    let filtered = users

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by role
    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => {
        const hasRole = user.roles?.some((role) => {
          switch (selectedRole) {
            case "student":
              return role.shortname === "student"
            case "teacher":
              return role.shortname === "teacher" || role.shortname === "editingteacher"
            case "admin":
              return role.shortname === "manager" || role.shortname === "admin"
            default:
              return false
          }
        })
        return hasRole
      })
    }

    // Filter by letter
    if (selectedLetter) {
      filtered = filtered.filter((user) => user.fullname.charAt(0).toUpperCase() === selectedLetter)
    }

    return filtered
  }, [users, searchTerm, selectedRole, selectedLetter])

  // Generate alphabet for filtering
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  // Get user role display
  const getUserRole = (user: MoodleUser): string => {
    if (!user.roles || user.roles.length === 0) return "User"

    const role = user.roles[0]
    switch (role.shortname) {
      case "student":
        return "Student"
      case "teacher":
      case "editingteacher":
        return "Teacher"
      case "manager":
      case "admin":
        return "Administrator"
      default:
        return role.name || "User"
    }
  }

  // Get role icon
  const getRoleIcon = (user: MoodleUser) => {
    const role = getUserRole(user)
    switch (role) {
      case "Student":
        return <GraduationCap className="w-4 h-4" />
      case "Teacher":
        return <BookOpen className="w-4 h-4" />
      case "Administrator":
        return <UserCheck className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  // Get role color
  const getRoleColor = (user: MoodleUser): string => {
    const role = getUserRole(user)
    switch (role) {
      case "Student":
        return "bg-blue-500/20 text-blue-400"
      case "Teacher":
        return "bg-[#27d4ba]/20 text-[#27d4ba]"
      case "Administrator":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-neutral-500/20 text-neutral-400"
    }
  }

  // Get role statistics
  const roleStats = useMemo(() => {
    const students = users.filter((user) => user.roles?.some((role) => role.shortname === "student")).length

    const teachers = users.filter((user) =>
      user.roles?.some((role) => role.shortname === "teacher" || role.shortname === "editingteacher"),
    ).length

    const admins = users.filter((user) =>
      user.roles?.some((role) => role.shortname === "manager" || role.shortname === "admin"),
    ).length

    return { students, teachers, admins }
  }, [users])

  // Format last access date
  const formatLastAccess = (timestamp?: number): string => {
    if (!timestamp) return "Never"
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
  }

  // Render user card
  const renderUserCard = (user: MoodleUser) => (
    <Card
      key={user.id}
      className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#27d4ba]/20 rounded-full flex items-center justify-center">
              {getRoleIcon(user)}
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-white tracking-wider">{user.fullname}</CardTitle>
              <p className="text-xs text-neutral-400">@{user.username}</p>
            </div>
          </div>
          <Badge className={getRoleColor(user)}>{getUserRole(user)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-300 truncate">{user.email}</span>
          </div>
          {user.department && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span className="text-neutral-300">{user.department}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-300">Last: {formatLastAccess(user.lastaccess)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${user.suspended ? "bg-red-500" : "bg-green-500"}`} />
            <span className="text-xs text-neutral-400">{user.suspended ? "Suspended" : "Active"}</span>
          </div>
          <Button size="sm" variant="ghost" className="text-[#27d4ba] hover:bg-[#27d4ba]/20">
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Render user list item
  const renderUserListItem = (user: MoodleUser) => (
    <Card
      key={user.id}
      className="bg-neutral-900 border-neutral-700 hover:border-[#27d4ba]/50 transition-colors cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#27d4ba]/20 rounded-full flex items-center justify-center">
              {getRoleIcon(user)}
            </div>
            <div>
              <h3 className="font-semibold text-white">{user.fullname}</h3>
              <p className="text-sm text-neutral-400">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getRoleColor(user)}>{getUserRole(user)}</Badge>
            <div className="text-right">
              <p className="text-sm text-neutral-300">{user.department || "No Department"}</p>
              <p className="text-xs text-neutral-500">Last: {formatLastAccess(user.lastaccess)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${user.suspended ? "bg-red-500" : "bg-green-500"}`} />
              <Button size="sm" variant="ghost" className="text-[#27d4ba] hover:bg-[#27d4ba]/20">
                <Eye className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Render user table row
  const renderUserTableRow = (user: MoodleUser) => (
    <tr
      key={user.id}
      className="border-b border-neutral-700 hover:bg-neutral-800/50 cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#27d4ba]/20 rounded-full flex items-center justify-center">
            {getRoleIcon(user)}
          </div>
          <div>
            <p className="font-medium text-white">{user.fullname}</p>
            <p className="text-sm text-neutral-400">@{user.username}</p>
          </div>
        </div>
      </td>
      <td className="p-4 text-neutral-300">{user.email}</td>
      <td className="p-4">
        <Badge className={getRoleColor(user)}>{getUserRole(user)}</Badge>
      </td>
      <td className="p-4 text-neutral-300">{user.department || "—"}</td>
      <td className="p-4 text-neutral-300">{formatLastAccess(user.lastaccess)}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${user.suspended ? "bg-red-500" : "bg-green-500"}`} />
          <span className="text-sm text-neutral-400">{user.suspended ? "Suspended" : "Active"}</span>
        </div>
      </td>
      <td className="p-4">
        <Button size="sm" variant="ghost" className="text-[#27d4ba] hover:bg-[#27d4ba]/20">
          <Eye className="w-3 h-3" />
        </Button>
      </td>
    </tr>
  )

  if (!isConnected) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">USER MANAGEMENT</h1>
            <p className="text-sm text-neutral-400">Manage students, teachers, and administrators</p>
          </div>
          <MoodleConfigModal
            config={config}
            isConnected={isConnected}
            isLoading={isLoading}
            error={error}
            onConfigUpdate={updateConfig}
            onTestConnection={testConnection}
          />
        </div>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Moodle Not Connected</h3>
            <p className="text-neutral-400 mb-4">Configure your Moodle connection to manage users</p>
            <MoodleConfigModal
              config={config}
              isConnected={isConnected}
              isLoading={isLoading}
              error={error}
              onConfigUpdate={updateConfig}
              onTestConnection={testConnection}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">USER MANAGEMENT</h1>
          <p className="text-sm text-neutral-400">Manage students, teachers, and administrators</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchUsers}
            disabled={usersLoading}
            className="bg-[#27d4ba] hover:bg-[#27d4ba]/80 text-white"
          >
            {usersLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          <MoodleConfigModal
            config={config}
            isConnected={isConnected}
            isLoading={isLoading}
            error={error}
            onConfigUpdate={updateConfig}
            onTestConnection={testConnection}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL USERS</p>
                <p className="text-2xl font-bold text-white font-mono">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">STUDENTS</p>
                <p className="text-2xl font-bold text-blue-400 font-mono">{roleStats.students}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TEACHERS</p>
                <p className="text-2xl font-bold text-[#27d4ba] font-mono">{roleStats.teachers}</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#27d4ba]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ADMINISTRATORS</p>
                <p className="text-2xl font-bold text-purple-400 font-mono">{roleStats.admins}</p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        {/* Search and View Format */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewFormat === "card" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewFormat("card")}
              className={
                viewFormat === "card"
                  ? "bg-[#27d4ba] text-white"
                  : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
              }
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewFormat === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewFormat("list")}
              className={
                viewFormat === "list"
                  ? "bg-[#27d4ba] text-white"
                  : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
              }
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewFormat === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewFormat("table")}
              className={
                viewFormat === "table"
                  ? "bg-[#27d4ba] text-white"
                  : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
              }
            >
              <Table className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRole === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("all")}
            className={
              selectedRole === "all"
                ? "bg-[#27d4ba] text-white"
                : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
            }
          >
            <Users className="w-4 h-4 mr-2" />
            All Users ({users.length})
          </Button>
          <Button
            variant={selectedRole === "student" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("student")}
            className={
              selectedRole === "student"
                ? "bg-blue-500 text-white"
                : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
            }
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Students ({roleStats.students})
          </Button>
          <Button
            variant={selectedRole === "teacher" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("teacher")}
            className={
              selectedRole === "teacher"
                ? "bg-[#27d4ba] text-white"
                : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
            }
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Teachers ({roleStats.teachers})
          </Button>
          <Button
            variant={selectedRole === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("admin")}
            className={
              selectedRole === "admin"
                ? "bg-purple-500 text-white"
                : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent"
            }
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Administrators ({roleStats.admins})
          </Button>
        </div>

        {/* Alphabetical Filter */}
        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedLetter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter("")}
            className={
              selectedLetter === ""
                ? "bg-[#27d4ba] text-white"
                : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent text-xs"
            }
          >
            All
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              className={
                selectedLetter === letter
                  ? "bg-[#27d4ba] text-white"
                  : "border-neutral-700 text-neutral-400 hover:bg-neutral-800 bg-transparent text-xs w-8 h-8 p-0"
              }
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        {(searchTerm || selectedRole !== "all" || selectedLetter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setSelectedRole("all")
              setSelectedLetter("")
            }}
            className="text-neutral-400 hover:text-white"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Users Display */}
      {usersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-neutral-900 border-neutral-700">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-neutral-700 rounded w-32" />
                      <div className="h-3 bg-neutral-700 rounded w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-700 rounded w-full" />
                    <div className="h-3 bg-neutral-700 rounded w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredUsers.length === 0 ? (
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
            <p className="text-neutral-400">
              {searchTerm || selectedRole !== "all" || selectedLetter
                ? "Try adjusting your filters"
                : "No users available"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewFormat === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(renderUserCard)}
            </div>
          )}

          {viewFormat === "list" && <div className="space-y-4">{filteredUsers.map(renderUserListItem)}</div>}

          {viewFormat === "table" && (
            <Card className="bg-neutral-900 border-neutral-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-neutral-700">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">USER</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">EMAIL</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">ROLE</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">DEPARTMENT</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">LAST ACCESS</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">STATUS</th>
                        <th className="p-4 text-sm font-medium text-neutral-300 tracking-wider">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>{filteredUsers.map(renderUserTableRow)}</tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#27d4ba]/20 rounded-full flex items-center justify-center">
                  {getRoleIcon(selectedUser)}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedUser.fullname}</CardTitle>
                  <p className="text-sm text-neutral-400">
                    @{selectedUser.username} • {getUserRole(selectedUser)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">CONTACT INFORMATION</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-400" />
                        <span className="text-white">{selectedUser.email}</span>
                      </div>
                      {selectedUser.city && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          <span className="text-white">
                            {selectedUser.city}, {selectedUser.country}
                          </span>
                        </div>
                      )}
                      {selectedUser.institution && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-neutral-400" />
                          <span className="text-white">{selectedUser.institution}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACCOUNT STATUS</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedUser.suspended ? "bg-red-500" : "bg-green-500"}`}
                        />
                        <span className="text-sm text-white">{selectedUser.suspended ? "Suspended" : "Active"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedUser.confirmed ? "bg-green-500" : "bg-yellow-500"}`}
                        />
                        <span className="text-sm text-white">
                          {selectedUser.confirmed ? "Confirmed" : "Unconfirmed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">USER ROLES</h3>
                    <div className="space-y-2">
                      {selectedUser.roles?.map((role) => (
                        <Badge key={role.roleid} className="bg-neutral-800 text-neutral-300">
                          {role.name}
                        </Badge>
                      )) || <span className="text-sm text-neutral-400">No roles assigned</span>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACTIVITY</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Last Access:</span>
                        <span className="text-white">{formatLastAccess(selectedUser.lastaccess)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">User ID:</span>
                        <span className="text-white font-mono">{selectedUser.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-[#27d4ba] hover:bg-[#27d4ba]/80 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
