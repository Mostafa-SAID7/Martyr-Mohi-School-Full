/**
 * Contact Information Constants
 * All contact-related configuration
 * 
 * NOTE: Phone, email, and specific address are not publicly published.
 * Using placeholder values to indicate unavailable information.
 */

export const CONTACT_INFO = {
  phone: null,
  phoneStatus: "not_published",
  phoneStatusAr: "غير منشور رسميًا",
  phoneStatusEn: "Not publicly published",
  
  email: null,
  emailStatus: "not_published",
  emailStatusAr: "غير منشور رسميًا",
  emailStatusEn: "Not publicly published",
  
  address: "Mit Al-Rakha, Zefta, Gharbia Governorate, Egypt",
  addressAr: "ميت الرخا، مركز زفتى، محافظة الغربية، مصر",
  
  plusCode: "J6CG+9F2",
  
  officeHours: "8:00 AM - 4:00 PM",
  officeHoursAr: "8:00 ص - 4:00 م",
  workDays: "Sunday - Thursday",
  workDaysAr: "الأحد - الخميس",
} as const;
