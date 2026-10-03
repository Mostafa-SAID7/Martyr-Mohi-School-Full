# Data Integrity Guidelines

## Overview

This document defines what information is verified, what is unavailable, and what is demo data.

## Verified Information ✅

All information sourced from official references and authoritative sources.

### School Identity
- **Official Name:** مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي
- **English Name:** Martyr Mohi El-Din Nouh Shaheen Basic Education School
- **Common Name:** مدرسة الشهيد محيي الدين شاهين

### Location
- **Village:** ميت الرخا (Mit Al-Rakha)
- **District/Center:** مركز زفتى (Zefta)
- **Governorate:** محافظة الغربية (Gharbia Governorate)
- **Country:** مصر (Egypt)
- **Full Address:** ميت الرخا، مركز زفتى، محافظة الغربية، مصر

### Geographic Reference
- **Plus Code:** J6CG+9F2
- **Source:** Google Maps verified

### Education Classification
- **Type:** التعليم الأساسي (Basic Education)
- **Level:** Primary & Middle School

### Historical Facts
- **Status:** Existing school (verified from historical records)
- **Reference:** 2021 report mentioned Mit Al-Rakha with planned building expansion
- **Community:** Serves local Mit Al-Rakha community

## Unavailable Information ⚠️

Information not yet publicly published or not officially available.

### Contact Details
- **Phone:** ❌ Not publicly published
- **Email:** ❌ Not publicly published
- **Website:** ❌ Not verified
- **UI Display:** "غير منشور رسميًا" / "Not publicly published"

### Administration
- **Principal Name:** ❌ Not published
- **School Code:** ❌ Not published
- **Establishment Date:** ❌ Not verified

### Statistics
- **Current Student Count:** ❌ Not published
- **Current Teacher Count:** ❌ Not published
- **Number of Classrooms:** ❌ Not published
- **Current Results:** ❌ Not published
- **UI Display:** `null` values in database, status: "not_published"

## Demo/Sample Data 🎨

Demonstration content for platform functionality. NOT school facts.

### Courses
- **Purpose:** Demonstrate curriculum structure
- **Status:** Marked as "Demo Sample"
- **Content:** Sample courses (Math, Arabic, Science, English)
- **Student Counts:** `null` (marked as demo)
- **Ratings:** `null` (marked as demo)
- **Notice:** COURSES_DEMO_NOTICE constant displayed
- **Disclaimer:** "البيانات الفعلية للمدرسة ستكون متاحة عند توفر مصدر رسمي"

### Teachers
- **Purpose:** Show platform's faculty management capability
- **Status:** Empty array with empty state message
- **Message:** "سيتم نشر بيانات هيئة التدريس عند توفر مصدر رسمي"
- **Architecture:** Ready to add real faculty data when available

### Statistics on Homepage
- **Purpose:** Show platform features/capacity
- **Values:** Set to `null`
- **NOT:** School fact claims
- **Distinction:** Clearly separated from verified data

### Features Section
- **Content:** Generic LMS platform features
- **Validity:** Generic descriptions (search, assignments, etc.)
- **NOT:** School-specific claims

## Content Rules

### ✅ DO

1. **Display verified information** proudly
2. **Mark unavailable data** with status indicators
3. **Clearly label demo data** as sample/demo
4. **Use Arabic as primary** language
5. **Provide English translations** for all content
6. **Update when official sources** provide new information
7. **Document information sources** in comments

### ❌ DON'T

1. **Invent phone numbers** or email addresses
2. **Fabricate teacher profiles** or names
3. **Create fake statistics** (student counts, success rates)
4. **Claim unsupported achievements** (20+ years, 98% success)
5. **Use stock photos** as school building
6. **Represent demo courses** as official curriculum
7. **Leave unverified data** unmarked
8. **Mix verified with fictional** data

## Implementation

### In Code

#### School Identity
```typescript
// frontend/src/config/school.ts
export const SCHOOL = {
  nameAr: "مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي",
  phone: {
    value: null,
    status: "not_published" as const,
    statusAr: "غير منشور رسميًا",
  },
  // ...
}
```

#### Unavailable Information
```typescript
// Display in UI
const status = "not_published"; // Shows: "غير منشور رسميًا"
const value = null; // Component renders status instead
```

#### Demo Data
```typescript
// frontend/src/data/courses.ts
export const COURSES_DEMO_NOTICE = {
  messageAr: "المقررات المعروضة هنا نماذج توضيحية للمنصة",
  messageEn: "The courses shown here are demo samples for the platform",
}
```

### In UI Components

**Example: Contact Page**
```typescript
// Verified: Location
<p>{lang === "ar" 
  ? "ميت الرخا، مركز زفتى، محافظة الغربية، مصر"
  : "Mit Al-Rakha, Zefta, Gharbia, Egypt"
}</p>

// Unavailable: Phone
<p>{lang === "ar" ? "غير منشور رسميًا" : "Not published"}</p>

// Demo: Courses
<Notice>{COURSES_DEMO_NOTICE.message}</Notice>
```

## Maintenance

### When New Information Becomes Available

1. **Verify source** (official documentation/communication)
2. **Update in `config/school.ts`** or appropriate data file
3. **Change status** from "not_published" to verified
4. **Add documentation comment** with source
5. **Update this file** to reflect new verified data
6. **Commit with clear message:** "data: add verified [information]"

### Regular Audits

- Monthly: Check for duplicate/outdated information
- Quarterly: Verify all displayed information is current
- Yearly: Review with school administration

## FAQ

**Q: Can we show fake statistics to look better?**  
A: No. It damages credibility. Use demo label instead.

**Q: What if we don't know something?**  
A: Mark it as "not published" / "not verified". Don't guess.

**Q: Should teacher photos be real?**  
A: Only authorized/verified photos. Generic images okay if labeled.

**Q: Can we claim "trusted by 500+ students"?**  
A: Only if verified. Otherwise use "Join our learning community."

## References

- **School Configuration:** `frontend/src/config/school.ts`
- **Contact Data:** `frontend/src/data/contact.ts`
- **About Data:** `frontend/src/data/about.ts`
- **Courses:** `frontend/src/data/courses.ts`
- **Teachers:** `frontend/src/data/teachers.ts`
- **FAQ:** `frontend/src/data/faqs.ts`
