/**
 * Contact & Location Data
 * Contact details and information
 * 
 * NOTE: Phone and email are not publicly published.
 * This page shows verified location information only.
 */

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const CONTACT_DETAILS = [
  {
    icon: MapPin,
    titleAr: "العنوان",
    titleEn: "Address",
    value: "Mit Al-Rakha, Zefta, Gharbia Governorate, Egypt",
    descriptionAr: "ميت الرخا، مركز زفتى، محافظة الغربية، مصر",
    descriptionEn: "Plus Code: J6CG+9F2",
  },
  {
    icon: Phone,
    titleAr: "الهاتف",
    titleEn: "Phone",
    value: "غير منشور رسميًا",
    descriptionAr: "رقم الهاتف غير منشور رسميًا حاليًا",
    descriptionEn: "Not publicly published at this time",
  },
  {
    icon: Mail,
    titleAr: "البريد الإلكتروني",
    titleEn: "Email",
    value: "غير منشور رسميًا",
    descriptionAr: "البريد الإلكتروني غير منشور رسميًا حاليًا",
    descriptionEn: "Not publicly published at this time",
  },
  {
    icon: Clock,
    titleAr: "ساعات العمل",
    titleEn: "Working Hours",
    value: "Sunday - Thursday",
    descriptionAr: "8:00 ص - 4:00 م",
    descriptionEn: "8:00 AM - 4:00 PM",
  },
];
