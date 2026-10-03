/**
 * Arabic Translations
 * All Arabic UI text strings
 */

export const ar = {
  // Navigation & Basic
  schoolName: "مدرسة الشهيد محي الدين نوح شاهين",
  home: "الرئيسية",
  courses: "المقررات",
  teachers: "المعلمون",
  about: "عن المدرسة",
  contact: "تواصل معنا",
  signIn: "تسجيل الدخول",
  signUp: "إنشاء حساب",
  dashboard: "لوحة التحكم",
  signOut: "تسجيل الخروج",
  assignments: "الواجبات",
  grades: "الدرجات",
  schedule: "الجدول الدراسي",
  lessons: "الدروس",
  teacherPanel: "لوحة المعلم",
  parentPortal: "بوابة أولياء الأمور",

  // Common UI
  loading: "جاري التحميل...",
  noData: "لا توجد بيانات",
  save: "حفظ",
  cancel: "إلغاء",
  delete: "حذف",
  edit: "تعديل",
  add: "إضافة",
  submit: "إرسال",
  close: "إغلاق",
  error: "خطأ",
  success: "نجح",

  // Dashboard Sections
  myStudents: "طلابي",
  myGrades: "درجاتي",
  myCourses: "مقرراتي",
  messages: "الرسائل",
  studentDashboard: "لوحة الطالب",
  parentDashboard: "لوحة ولي الأمر",

  // Hero Section
  heroTitle: "مرحباً بكم في",
  heroSubtitle: "مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي",
  heroDesc: "منصة رقمية للتعريف بالمدرسة وخدماتها التعليمية ومجتمعها المحلي في ميت الرخا، مركز زفتى، محافظة الغربية.",
  startLearning: "ابدأ التعلم الآن",
  learnMore: "تعرف علينا",

  // Features Section
  features: "عن مدرسة الشهيد محي الدين نوح شاهين",
  featuresDesc: "مدرسة تعليم أساسي تخدم مجتمع ميت الرخا",

  // Stats
  students: "طالب مسجل",
  coursesCount: "مقرر دراسي",
  teachersCount: "معلم متميز",

  // Schedule
  examType: "امتحان",
  lessonType: "درس",
  eventType: "فعالية",
  sunday: "الأحد",
  monday: "الإثنين",
  tuesday: "الثلاثاء",
  wednesday: "الأربعاء",
  thursday: "الخميس",
  friday: "الجمعة",
  saturday: "السبت",

  // Onboarding Roles
  studentRole: "طالب",
  studentRoleDesc: "أريد التعلم ومتابعة المقررات",
  teacherRole: "معلم",
  teacherRoleDesc: "أريد تدريس وإنشاء المقررات",
  parentRole: "ولي أمر",
  parentRoleDesc: "أريد متابعة أداء أبنائي",

  // Toast Messages
  toastSaved: "تم الحفظ",
  toastDeleted: "تم الحذف",
  toastUpdated: "تم التحديث",
  toastCreated: "تمت الإضافة",
  toastGraded: "تم التصحيح",
  toastError: "حدث خطأ",
  toastLoading: "جاري المعالجة...",

  // About Page
  missionTitle: "رسالتنا",
  missionDesc: "تقديم تعليم أساسي عالي الجودة يخدم مجتمع ميت الرخا والمنطقة.",
  visionTitle: "رؤيتنا",
  visionDesc: "أن نكون مؤسسة تعليمية أساسية رائدة في المنطقة.",
  valuesTitle: "قيمنا",
  valuesDesc: "النزاهة، الجودة التعليمية، المشاركة المجتمعية، والتطوير المستمر.",

  // Contact Page
  phoneLabel: "الهاتف",
  emailLabel: "البريد الإلكتروني",
  addressLabel: "العنوان",
  hoursLabel: "ساعات العمل",
  responseTime: "نرد خلال 24 ساعة",
  officeHours: "8:00 ص - 4:00 م",
  workDays: "الأحد - الخميس",
} as const;

export type ArTranslation = typeof ar;
