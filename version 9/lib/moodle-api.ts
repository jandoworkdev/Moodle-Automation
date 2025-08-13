import axios from "axios"

export interface MoodleConfig {
  url: string
  token: string
  loginMethod: "token" | "oauth" | "basic"
}

export interface MoodleUser {
  id: number
  username: string
  firstname: string
  lastname: string
  fullname: string
  email: string
  department?: string
  institution?: string
  city?: string
  country?: string
  profileimageurl?: string
  roles: MoodleRole[]
  lastaccess?: number
  suspended?: boolean
  confirmed?: boolean
}

export interface MoodleRole {
  roleid: number
  name: string
  shortname: string
  sortorder: number
}

export interface MoodleCourse {
  id: number
  fullname: string
  shortname: string
  categoryid: number
  categoryname?: string
  summary?: string
  summaryformat?: number
  format?: string
  showgrades?: boolean
  newsitems?: number
  startdate?: number
  enddate?: number
  maxbytes?: number
  showreports?: boolean
  visible?: boolean
  groupmode?: number
  groupmodeforce?: number
  defaultgroupingid?: number
  enablecompletion?: boolean
  completionnotify?: boolean
  lang?: string
  theme?: string
  marker?: number
  legacyfiles?: number
  calendartype?: string
  timecreated?: number
  timemodified?: number
  requested?: boolean
  cacherev?: number
  filters?: any[]
  courseformatoptions?: any[]
  enrolledusers?: number
}

export interface MoodleEnrollment {
  id: number
  courseid: number
  userid: number
  roleid: number
  timestart: number
  timeend: number
  modifierid: number
  timecreated: number
  timemodified: number
  status: number
  enrol: string
  coursename: string
  username: string
  userfullname: string
  rolename: string
}

export interface MoodleAssignment {
  id: number
  course: number
  name: string
  intro: string
  introformat: number
  alwaysshowdescription: boolean
  submissiondrafts: boolean
  sendnotifications: boolean
  sendlatenotifications: boolean
  sendstudentnotifications: boolean
  duedate: number
  allowsubmissionsfromdate: number
  grade: number
  timemodified: number
  completionsubmit: boolean
  cutoffdate: number
  gradingduedate: number
  teamsubmission: boolean
  requireallteammemberssubmit: boolean
  teamsubmissiongroupingid: number
  blindmarking: boolean
  hidegrader: boolean
  revealidentities: boolean
  attemptreopenmethod: string
  maxattempts: number
  markingworkflow: boolean
  markingallocation: boolean
  requiresubmissionstatement: boolean
  preventsubmissionnotingroup: boolean
  submissionstatement: string
  submissionstatementformat: number
  configs: any[]
  intro_files: any[]
  introattachments: any[]
}

class MoodleAPI {
  private config: MoodleConfig
  private baseURL: string

  constructor(config: MoodleConfig) {
    this.config = config
    this.baseURL = `${config.url}/webservice/rest/server.php`
  }

  private async makeRequest(wsfunction: string, params: any = {}) {
    try {
      const requestParams = {
        wstoken: this.config.token,
        wsfunction,
        moodlewsrestformat: "json",
        ...params,
      }

      const response = await axios.post(this.baseURL, null, {
        params: requestParams,
        timeout: 30000,
      })

      if (response.data.exception) {
        throw new Error(`Moodle API Error: ${response.data.message}`)
      }

      return response.data
    } catch (error) {
      console.error("Moodle API Request Error:", error)
      throw error
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest("core_webservice_get_site_info")
      return true
    } catch (error) {
      return false
    }
  }

  // Get site information
  async getSiteInfo() {
    return await this.makeRequest("core_webservice_get_site_info")
  }

  // User management
  async getUsers(criteria: any[] = []): Promise<MoodleUser[]> {
    const params = {
      "criteria[0][key]": "deleted",
      "criteria[0][value]": "0",
    }

    criteria.forEach((criterion, index) => {
      params[`criteria[${index + 1}][key]`] = criterion.key
      params[`criteria[${index + 1}][value]`] = criterion.value
    })

    const response = await this.makeRequest("core_user_get_users", params)
    return response.users || []
  }

  async getUserById(userid: number): Promise<MoodleUser> {
    const response = await this.makeRequest("core_user_get_users_by_field", {
      field: "id",
      "values[0]": userid,
    })
    return response[0]
  }

  async getUsersByRole(roleid: number): Promise<MoodleUser[]> {
    return await this.getUsers([{ key: "roleid", value: roleid.toString() }])
  }

  // Course management
  async getCourses(): Promise<MoodleCourse[]> {
    const response = await this.makeRequest("core_course_get_courses")
    return response || []
  }

  async getCourseById(courseid: number): Promise<MoodleCourse> {
    const response = await this.makeRequest("core_course_get_courses", {
      "options[ids][0]": courseid,
    })
    return response[0]
  }

  async getCoursesByCategory(categoryid: number): Promise<MoodleCourse[]> {
    const response = await this.makeRequest("core_course_get_courses_by_field", {
      field: "category",
      value: categoryid,
    })
    return response.courses || []
  }

  // Enrollment management
  async getEnrollments(courseid?: number): Promise<MoodleEnrollment[]> {
    if (courseid) {
      const response = await this.makeRequest("core_enrol_get_enrolled_users", {
        courseid,
      })
      return response || []
    } else {
      // Get all enrollments (this might need custom web service)
      const courses = await this.getCourses()
      const allEnrollments: MoodleEnrollment[] = []

      for (const course of courses) {
        try {
          const enrollments = await this.makeRequest("core_enrol_get_enrolled_users", {
            courseid: course.id,
          })
          allEnrollments.push(
            ...enrollments.map((enrollment: any) => ({
              ...enrollment,
              courseid: course.id,
              coursename: course.fullname,
            })),
          )
        } catch (error) {
          console.warn(`Failed to get enrollments for course ${course.id}:`, error)
        }
      }

      return allEnrollments
    }
  }

  async enrollUser(courseid: number, userid: number, roleid = 5) {
    return await this.makeRequest("enrol_manual_enrol_users", {
      "enrolments[0][courseid]": courseid,
      "enrolments[0][userid]": userid,
      "enrolments[0][roleid]": roleid,
    })
  }

  async unenrollUser(courseid: number, userid: number) {
    return await this.makeRequest("enrol_manual_unenrol_users", {
      "enrolments[0][courseid]": courseid,
      "enrolments[0][userid]": userid,
    })
  }

  // Assignment management
  async getAssignments(courseids: number[] = []): Promise<MoodleAssignment[]> {
    if (courseids.length === 0) {
      const courses = await this.getCourses()
      courseids = courses.map((course) => course.id)
    }

    const params: any = {}
    courseids.forEach((courseid, index) => {
      params[`courseids[${index}]`] = courseid
    })

    const response = await this.makeRequest("mod_assign_get_assignments", params)

    const assignments: MoodleAssignment[] = []
    if (response.courses) {
      response.courses.forEach((course: any) => {
        if (course.assignments) {
          assignments.push(...course.assignments)
        }
      })
    }

    return assignments
  }

  async getAssignmentSubmissions(assignmentid: number) {
    return await this.makeRequest("mod_assign_get_submissions", {
      assignmentid,
    })
  }

  // Categories
  async getCategories() {
    return await this.makeRequest("core_course_get_categories")
  }

  // Roles
  async getRoles() {
    return await this.makeRequest("core_role_get_assignable_roles", {
      contextlevel: "course",
      contextid: 1,
    })
  }

  // Statistics
  async getUserCount(): Promise<number> {
    const users = await this.getUsers()
    return users.length
  }

  async getCourseCount(): Promise<number> {
    const courses = await this.getCourses()
    return courses.length
  }

  async getActiveUsersCount(): Promise<number> {
    const users = await this.getUsers()
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
    return users.filter((user) => user.lastaccess && user.lastaccess > thirtyDaysAgo).length
  }
}

export default MoodleAPI
