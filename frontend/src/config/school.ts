/**
 * School Identity Configuration
 * Single source of truth for verified school information
 * 
 * IMPORTANT: Only verified information is included.
 * Unverified or unavailable data is explicitly marked as such.
 */

export const SCHOOL = {
  /**
   * Official Names
   * Verified from historical and map references
   */
  nameAr: "مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي",
  nameEn: "Martyr Mohi El-Din Nouh Shaheen Basic Education School",

  /**
   * Common/Shortened Names
   * Used in recent map and report references
   */
  shortNameAr: "مدرسة الشهيد محيي الدين شاهين",
  shortNameEn: "Martyr Mohi El-Din Shaheen School",

  /**
   * Education Classification
   * Verified: Basic education school
   */
  educationTypeAr: "التعليم الأساسي",
  educationTypeEn: "Basic Education",

  /**
   * Location Components
   * All verified from historical and current map references
   */
  villageAr: "ميت الرخا",
  villageEn: "Mit Al-Rakha",

  centerAr: "مركز زفتى",
  centerEn: "Zefta",

  governorateAr: "محافظة الغربية",
  governorateEn: "Gharbia Governorate",

  countryAr: "مصر",
  countryEn: "Egypt",

  /**
   * Geographic Reference
   * Verified via Google Maps Plus Code
   */
  plusCode: "J6CG+9F2",

  /**
   * Full Addresses
   */
  addressAr: "ميت الرخا، مركز زفتى، محافظة الغربية، مصر",
  addressEn: "Mit Al-Rakha, Zefta, Gharbia Governorate, Egypt",

  /**
   * Contact Information Status
   * All marked as not published/unavailable
   * Do not invent contact details
   */
  phone: {
    value: null,
    status: "not_published" as const,
    statusAr: "غير منشور رسميًا",
    statusEn: "Not publicly published",
  },

  email: {
    value: null,
    status: "not_published" as const,
    statusAr: "غير منشور رسميًا",
    statusEn: "Not publicly published",
  },

  website: {
    value: null,
    status: "not_verified" as const,
    statusAr: "غير موثق",
    statusEn: "Not verified",
  },

  /**
   * Administrative Information
   * Status: Not verified / not published
   */
  principalName: {
    value: null,
    status: "not_published" as const,
  },

  schoolCode: {
    value: null,
    status: "not_published" as const,
  },

  establishmentDate: {
    value: null,
    status: "not_verified" as const,
  },

  /**
   * Current Statistics
   * Status: Not published
   * Do not invent numbers
   */
  currentStudentCount: {
    value: null,
    status: "not_published" as const,
    statusAr: "غير منشور رسميًا",
    statusEn: "Not publicly published",
  },

  currentTeacherCount: {
    value: null,
    status: "not_published" as const,
    statusAr: "غير منشور رسميًا",
    statusEn: "Not publicly published",
  },

  /**
   * Historical/Known Facts
   * Verified from research and reports
   */
  historicalNotes: {
    existingBasicEducationSchool: true,
    reportedIn2021: "A 2021 report mentioned Mit Al-Rakha and referenced a planned/additional building wing for the school",
    existingSince: "Historical references confirm the school exists as a basic education institution in Mit Al-Rakha",
  },

  /**
   * Office Hours
   * Generic - update if verified
   */
  officeHours: {
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    workDaysAr: "الأحد - الخميس",
    workDaysEn: "Sunday - Thursday",
  },

  /**
   * Helper method to get display name
   */
  getDisplayName: (language: "ar" | "en" = "ar") => {
    return language === "ar" ? SCHOOL.nameAr : SCHOOL.nameEn;
  },

  /**
   * Helper method to get full address
   */
  getFullAddress: (language: "ar" | "en" = "ar") => {
    return language === "ar" ? SCHOOL.addressAr : SCHOOL.addressEn;
  },

  /**
   * Helper method to get location summary
   */
  getLocation: (language: "ar" | "en" = "ar") => {
    return language === "ar"
      ? `${SCHOOL.villageAr} – ${SCHOOL.centerAr} – ${SCHOOL.governorateAr} – ${SCHOOL.countryAr}`
      : `${SCHOOL.villageEn} – ${SCHOOL.centerEn} – ${SCHOOL.governorateEn} – ${SCHOOL.countryEn}`;
  },
} as const;

/**
 * Placeholder text for unavailable information
 */
export const UNAVAILABLE_TEXT = {
  ar: "غير منشور رسميًا حاليًا",
  en: "Not publicly verified",
};

/**
 * Status indicators for UI
 */
export const INFO_STATUS = {
  verified: { ar: "موثق", en: "Verified" },
  unverified: { ar: "غير موثق", en: "Not verified" },
  pending: { ar: "قيد التحديث", en: "Pending update" },
  notPublished: { ar: "غير منشور رسميًا", en: "Not publicly published" },
} as const;
