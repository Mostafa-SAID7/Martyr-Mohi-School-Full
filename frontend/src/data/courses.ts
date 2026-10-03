/**
 * Courses Data
 * 
 * NOTE: These courses represent a sample/demo curriculum structure.
 * Actual school curriculum data should be obtained from official school sources.
 * Student counts and ratings are placeholder values.
 */

import mathImg from "@/assets/course-math.jpg";
import arabicImg from "@/assets/course-arabic.jpg";
import scienceImg from "@/assets/course-science.jpg";
import englishImg from "@/assets/course-english.jpg";

export const COURSES_DEMO_NOTICE = {
  titleAr: "ملاحظة مهمة",
  titleEn: "Important Note",
  messageAr: "المقررات المعروضة هنا نماذج توضيحية للمنصة. البيانات الفعلية للمدرسة ستكون متاحة عند توفر مصدر رسمي.",
  messageEn: "The courses shown here are demo samples for the platform. Official school curriculum data will be available from verified sources.",
} as const;

export const COURSES = [
  {
    title: "الرياضيات",
    titleEn: "Mathematics",
    description: "أساسيات الرياضيات والجبر والهندسة للمراحل المختلفة.",
    descriptionEn: "Algebra, geometry and more for all levels.",
    students: null,
    studentsStatus: "demo",
    duration: "12 أسبوع",
    durationEn: "12 weeks",
    rating: null,
    ratingStatus: "demo",
    image: mathImg,
    icon: "🔢",
    gradient: "from-blue-600/80 to-blue-900/90",
    level: "متوسط",
    levelEn: "Intermediate",
  },
  {
    title: "اللغة العربية",
    titleEn: "Arabic Language",
    description: "قواعد اللغة العربية والنحو والصرف والأدب.",
    descriptionEn: "Arabic grammar, syntax and literature.",
    students: null,
    studentsStatus: "demo",
    duration: "16 أسبوع",
    durationEn: "16 weeks",
    rating: null,
    ratingStatus: "demo",
    image: arabicImg,
    icon: "📖",
    gradient: "from-emerald-600/80 to-emerald-900/90",
    level: "جميع المستويات",
    levelEn: "All Levels",
  },
  {
    title: "العلوم",
    titleEn: "Science",
    description: "الفيزياء والكيمياء والأحياء بأسلوب تفاعلي وممتع.",
    descriptionEn: "Physics, chemistry and biology interactively.",
    students: null,
    studentsStatus: "demo",
    duration: "14 أسبوع",
    durationEn: "14 weeks",
    rating: null,
    ratingStatus: "demo",
    image: scienceImg,
    icon: "🔬",
    gradient: "from-purple-600/80 to-purple-900/90",
    level: "متقدم",
    levelEn: "Advanced",
  },
  {
    title: "اللغة الإنجليزية",
    titleEn: "English Language",
    description: "تعلم اللغة الإنجليزية من المستوى المبتدئ إلى المتقدم.",
    descriptionEn: "From beginner to advanced level.",
    students: null,
    studentsStatus: "demo",
    duration: "20 أسبوع",
    durationEn: "20 weeks",
    rating: null,
    ratingStatus: "demo",
    image: englishImg,
    icon: "🗣",
    gradient: "from-orange-500/80 to-orange-800/90",
    level: "مبتدئ",
    levelEn: "Beginner",
  },
] as const;
