"use client"

import { useState, useEffect, useCallback } from "react"
import MoodleAPI, {
  type MoodleConfig,
  type MoodleUser,
  type MoodleCourse,
  type MoodleEnrollment,
  type MoodleAssignment,
} from "@/lib/moodle-api"
import { getMoodleConfig, validateMoodleConfig } from "@/lib/moodle-config"

interface UseMoodleReturn {
  api: MoodleAPI | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
  config: MoodleConfig
  testConnection: () => Promise<boolean>
  updateConfig: (newConfig: MoodleConfig) => void
  // Data fetching methods
  users: MoodleUser[]
  courses: MoodleCourse[]
  enrollments: MoodleEnrollment[]
  assignments: MoodleAssignment[]
  // Loading states
  usersLoading: boolean
  coursesLoading: boolean
  enrollmentsLoading: boolean
  assignmentsLoading: boolean
  // Fetch methods
  fetchUsers: () => Promise<void>
  fetchCourses: () => Promise<void>
  fetchEnrollments: () => Promise<void>
  fetchAssignments: () => Promise<void>
  // Statistics
  stats: {
    totalUsers: number
    totalCourses: number
    activeUsers: number
    totalEnrollments: number
  }
}

export function useMoodle(): UseMoodleReturn {
  const [config, setConfig] = useState<MoodleConfig>(getMoodleConfig())
  const [api, setApi] = useState<MoodleAPI | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data states
  const [users, setUsers] = useState<MoodleUser[]>([])
  const [courses, setCourses] = useState<MoodleCourse[]>([])
  const [enrollments, setEnrollments] = useState<MoodleEnrollment[]>([])
  const [assignments, setAssignments] = useState<MoodleAssignment[]>([])

  // Loading states
  const [usersLoading, setUsersLoading] = useState(false)
  const [coursesLoading, setCoursesLoading] = useState(false)
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false)
  const [assignmentsLoading, setAssignmentsLoading] = useState(false)

  // Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    totalEnrollments: 0,
  })

  // Initialize API when config changes
  useEffect(() => {
    if (validateMoodleConfig(config)) {
      const newApi = new MoodleAPI(config)
      setApi(newApi)
      setError(null)
    } else {
      setApi(null)
      setIsConnected(false)
      setError("Invalid Moodle configuration")
    }
  }, [config])

  // Test connection
  const testConnection = useCallback(async (): Promise<boolean> => {
    if (!api) return false

    setIsLoading(true)
    setError(null)

    try {
      const connected = await api.testConnection()
      setIsConnected(connected)

      if (!connected) {
        setError("Failed to connect to Moodle")
      }

      return connected
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed")
      setIsConnected(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [api])

  // Update configuration
  const updateConfig = useCallback((newConfig: MoodleConfig) => {
    setConfig(newConfig)
    setIsConnected(false)
  }, [])

  // Fetch users
  const fetchUsers = useCallback(async () => {
    if (!api || !isConnected) return

    setUsersLoading(true)
    try {
      const fetchedUsers = await api.getUsers()
      setUsers(fetchedUsers)
      setStats((prev) => ({ ...prev, totalUsers: fetchedUsers.length }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users")
    } finally {
      setUsersLoading(false)
    }
  }, [api, isConnected])

  // Fetch courses
  const fetchCourses = useCallback(async () => {
    if (!api || !isConnected) return

    setCoursesLoading(true)
    try {
      const fetchedCourses = await api.getCourses()
      setCourses(fetchedCourses)
      setStats((prev) => ({ ...prev, totalCourses: fetchedCourses.length }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses")
    } finally {
      setCoursesLoading(false)
    }
  }, [api, isConnected])

  // Fetch enrollments
  const fetchEnrollments = useCallback(async () => {
    if (!api || !isConnected) return

    setEnrollmentsLoading(true)
    try {
      const fetchedEnrollments = await api.getEnrollments()
      setEnrollments(fetchedEnrollments)
      setStats((prev) => ({ ...prev, totalEnrollments: fetchedEnrollments.length }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch enrollments")
    } finally {
      setEnrollmentsLoading(false)
    }
  }, [api, isConnected])

  // Fetch assignments
  const fetchAssignments = useCallback(async () => {
    if (!api || !isConnected) return

    setAssignmentsLoading(true)
    try {
      const fetchedAssignments = await api.getAssignments()
      setAssignments(fetchedAssignments)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch assignments")
    } finally {
      setAssignmentsLoading(false)
    }
  }, [api, isConnected])

  // Auto-test connection when API is ready
  useEffect(() => {
    if (api && !isConnected && !isLoading) {
      testConnection()
    }
  }, [api, isConnected, isLoading, testConnection])

  return {
    api,
    isConnected,
    isLoading,
    error,
    config,
    testConnection,
    updateConfig,
    users,
    courses,
    enrollments,
    assignments,
    usersLoading,
    coursesLoading,
    enrollmentsLoading,
    assignmentsLoading,
    fetchUsers,
    fetchCourses,
    fetchEnrollments,
    fetchAssignments,
    stats,
  }
}
