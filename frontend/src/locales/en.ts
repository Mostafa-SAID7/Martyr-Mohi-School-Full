/**
 * English Translations
 * All English UI text strings
 */

export const en = {
  // Navigation & Basic
  schoolName: "Martyr Mohi El-Din Shaheen School",
  home: "Home",
  courses: "Courses",
  teachers: "Teachers",
  about: "About",
  contact: "Contact",
  signIn: "Sign In",
  signUp: "Sign Up",
  dashboard: "Dashboard",
  signOut: "Sign Out",
  assignments: "Assignments",
  grades: "Grades",
  schedule: "Schedule",
  lessons: "Lessons",
  teacherPanel: "Teacher Panel",
  parentPortal: "Parent Portal",

  // Common UI
  loading: "Loading...",
  noData: "No data available",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  add: "Add",
  submit: "Submit",
  close: "Close",
  error: "Error",
  success: "Success",

  // Dashboard Sections
  myStudents: "My Students",
  myGrades: "My Grades",
  myCourses: "My Courses",
  messages: "Messages",
  studentDashboard: "Student Dashboard",
  parentDashboard: "Parent Dashboard",

  // Hero Section
  heroTitle: "Welcome to",
  heroSubtitle: "Martyr Mohi El-Din Shaheen School",
  heroDesc: "A digital platform introducing the school, its educational services, and community in Mit Al-Rakha, Zefta, Gharbia.",
  startLearning: "Start Learning Now",
  learnMore: "Learn More",

  // Features Section
  features: "About Martyr Mohi El-Din Shaheen School",
  featuresDesc: "A basic education school serving the community of Mit Al-Rakha",

  // Stats
  students: "Enrolled Students",
  coursesCount: "Courses",
  teachersCount: "Expert Teachers",

  // Schedule
  examType: "Exam",
  lessonType: "Lesson",
  eventType: "Event",
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",

  // Onboarding Roles
  studentRole: "Student",
  studentRoleDesc: "I want to learn and follow courses",
  teacherRole: "Teacher",
  teacherRoleDesc: "I want to teach and create courses",
  parentRole: "Parent",
  parentRoleDesc: "I want to track my children's performance",

  // Toast Messages
  toastSaved: "Saved!",
  toastDeleted: "Deleted!",
  toastUpdated: "Updated!",
  toastCreated: "Added!",
  toastGraded: "Graded!",
  toastError: "Error",
  toastLoading: "Processing...",

  // About Page
  missionTitle: "Our Mission",
  missionDesc: "To provide quality basic education serving the community of Mit Al-Rakha and the region.",
  visionTitle: "Our Vision",
  visionDesc: "To be a leading basic education institution in the region.",
  valuesTitle: "Our Values",
  valuesDesc: "Integrity, quality education, community engagement, and continuous improvement.",

  // Contact Page
  phoneLabel: "Phone",
  emailLabel: "Email",
  addressLabel: "Address",
  hoursLabel: "Working Hours",
  responseTime: "We respond within 24 hours",
  officeHours: "8:00 AM - 4:00 PM",
  workDays: "Sunday - Thursday",
} as const;

export type EnTranslation = typeof en;
