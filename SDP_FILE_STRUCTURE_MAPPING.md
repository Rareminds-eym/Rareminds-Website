# SDP File Structure Mapping

## Current Files → New Structure Pattern

This document maps your EXISTING files to the NEW folder structure pattern you want to follow.

---

## 📁 Pages (src/pages/universities/sdp/)

### Pattern Structure:
```
src/pages/universities/sdp/
├── SDPLandingPage.tsx           # Grade selection page
├── ServiceCategoriesPage.tsx    # Categories listing
├── CoursesListingPage.tsx       # Courses by category
└── CourseDetailPage.tsx         # Individual course info
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Location |
|-----------------|-------------------|----------|
| `SDPLandingPage.tsx` | ❌ Not created yet | Should be in `src/pages/universities/sdp/` |
| `ServiceCategoriesPage.tsx` | `ServicesPage.tsx` | Currently in `src/pages/Universities/ServicesPage.tsx` |
| `CoursesListingPage.tsx` | `CourseList.tsx` | Currently in `src/components/universities/sdp/CourseList.tsx` |
| `CourseDetailPage.tsx` | `CourseDetail.tsx` | Currently in `src/components/universities/sdp/CourseDetail.tsx` |

---

## 🧩 Components (src/components/universities/sdp/)

### Pattern Structure:
```
src/components/universities/sdp/
├── GradeSelector.tsx
├── ServiceCategoryCard.tsx
├── CourseCard.tsx
├── CourseFilters.tsx
├── CourseEnrollmentModal.tsx
├── DownloadModal.tsx
└── shared/
    ├── LoadingSkeleton.tsx
    ├── ErrorBoundary.tsx
    └── LazyImage.tsx
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Location | Status |
|-----------------|-------------------|----------|--------|
| `GradeSelector.tsx` | `InstitutionTypeSelector.tsx` | `src/components/universities/sdp/` | ✅ Exists |
| `ServiceCategoryCard.tsx` | Part of `Services.tsx` | `src/components/universities/sdp/` | ⚠️ Extract from Services.tsx |
| `CourseCard.tsx` | Part of `CourseList.tsx` | `src/components/universities/sdp/` | ⚠️ Extract from CourseList.tsx |
| `CourseFilters.tsx` | ❌ Not created yet | Should be in `src/components/universities/sdp/` | 🆕 Create new |
| `CourseEnrollmentModal.tsx` | ❌ Not created yet | Should be in `src/components/universities/sdp/` | 🆕 Create new |
| `DownloadModal.tsx` | Part of `Services.tsx` (Modal) | `src/components/universities/sdp/` | ⚠️ Extract from Services.tsx |
| `shared/LoadingSkeleton.tsx` | ❌ Not created yet | Should be in `src/components/universities/sdp/shared/` | 🆕 Create new |
| `shared/ErrorBoundary.tsx` | `ErrorBoundary.tsx` | Currently in `src/components/ErrorBoundary.tsx` | ✅ Exists (move to shared/) |
| `shared/LazyImage.tsx` | ❌ Not created yet | Should be in `src/components/universities/sdp/shared/` | 🆕 Create new |

---

## 🔧 Services (src/services/sdp/)

### Pattern Structure:
```
src/services/sdp/
├── institutionService.ts
├── courseService.ts
└── enrollmentService.ts
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Status |
|-----------------|-------------------|--------|
| `institutionService.ts` | ❌ Not created yet | 🆕 Create new - Handle institution/grade logic |
| `courseService.ts` | Logic in `coursesData.ts` | 🆕 Create new - Extract from data file |
| `enrollmentService.ts` | ❌ Not created yet | 🆕 Create new - Handle enrollment/contact forms |

**Note:** Currently using `src/data/coursesData.ts` - should create service layer

---

## 🪝 Hooks (src/hooks/sdp/)

### Pattern Structure:
```
src/hooks/sdp/
├── useInstitutionGrades.ts
├── useCourses.ts
└── useCourseDetail.ts
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Status |
|-----------------|-------------------|--------|
| `useInstitutionGrades.ts` | ❌ Not created yet | 🆕 Create new - Manage institution selection |
| `useCourses.ts` | ❌ Not created yet | 🆕 Create new - Fetch/filter courses |
| `useCourseDetail.ts` | ❌ Not created yet | 🆕 Create new - Fetch single course details |

**Note:** Currently no custom hooks for SDP - logic is inline in components

---

## 📝 Types (src/types/sdp/)

### Pattern Structure:
```
src/types/sdp/
├── institution.types.ts
├── course.types.ts
└── enrollment.types.ts
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Status |
|-----------------|-------------------|--------|
| `institution.types.ts` | ❌ Not created yet | 🆕 Create new - Institution/grade types |
| `course.types.ts` | Interfaces in `coursesData.ts` | ⚠️ Extract from data file |
| `enrollment.types.ts` | ❌ Not created yet | 🆕 Create new - Enrollment form types |

**Note:** Currently types are defined inline in `src/data/coursesData.ts`:
- `Module` interface
- `Instructor` interface  
- `Course` interface

---

## 🌐 Context (src/context/)

### Pattern Structure:
```
src/context/
└── SDPContext.tsx    # Global SDP state
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Status |
|-----------------|-------------------|--------|
| `SDPContext.tsx` | ❌ Not created yet | 🆕 Create new - Global state management |

**Note:** Currently no context for SDP - state is local to components

---

## 🛠️ Utils (src/utils/sdp/)

### Pattern Structure:
```
src/utils/sdp/
├── lazyLoadHelpers.ts
└── imageOptimization.ts
```

### Current Files Mapping:
| New Pattern File | Current Equivalent | Status |
|-----------------|-------------------|--------|
| `lazyLoadHelpers.ts` | ❌ Not created yet | 🆕 Create new - Lazy loading utilities |
| `imageOptimization.ts` | ❌ Not created yet | 🆕 Create new - Image optimization helpers |

---

## 📊 Summary

### ✅ Files That Already Exist (Keep As-Is)
1. `src/components/universities/sdp/InstitutionTypeSelector.tsx` → Maps to `GradeSelector.tsx`
2. `src/components/ErrorBoundary.tsx` → Can be moved to `shared/`
3. `src/data/coursesData.ts` → Contains types and data (extract to services/types)

### ⚠️ Files That Need Refactoring (Extract Components)
1. `src/components/universities/sdp/Services.tsx` → Extract `ServiceCategoryCard` and `DownloadModal`
2. `src/components/universities/sdp/CourseList.tsx` → Extract `CourseCard` component
3. `src/pages/Universities/ServicesPage.tsx` → Rename/move to pattern structure

### 🆕 Files That Need to Be Created
**Pages:**
- `src/pages/universities/sdp/SDPLandingPage.tsx`

**Components:**
- `src/components/universities/sdp/CourseFilters.tsx`
- `src/components/universities/sdp/CourseEnrollmentModal.tsx`
- `src/components/universities/sdp/shared/LoadingSkeleton.tsx`
- `src/components/universities/sdp/shared/LazyImage.tsx`

**Services:**
- `src/services/sdp/institutionService.ts`
- `src/services/sdp/courseService.ts`
- `src/services/sdp/enrollmentService.ts`

**Hooks:**
- `src/hooks/sdp/useInstitutionGrades.ts`
- `src/hooks/sdp/useCourses.ts`
- `src/hooks/sdp/useCourseDetail.ts`

**Types:**
- `src/types/sdp/institution.types.ts`
- `src/types/sdp/course.types.ts`
- `src/types/sdp/enrollment.types.ts`

**Context:**
- `src/context/SDPContext.tsx`

**Utils:**
- `src/utils/sdp/lazyLoadHelpers.ts`
- `src/utils/sdp/imageOptimization.ts`

---

## 🎯 Action Plan

When you're ready to implement the new structure, follow this order:

1. **Create Types First** (foundation)
   - Extract interfaces from `coursesData.ts`
   - Create new type files

2. **Create Services** (data layer)
   - Move data fetching logic
   - Create API service functions

3. **Create Hooks** (business logic)
   - Implement custom hooks using services
   - Handle state management

4. **Create Context** (global state)
   - Set up SDP context provider
   - Define global state shape

5. **Create Shared Components** (reusable UI)
   - LoadingSkeleton
   - ErrorBoundary (move existing)
   - LazyImage

6. **Extract/Create Components** (UI layer)
   - Extract card components
   - Create filter components
   - Create modal components

7. **Create/Refactor Pages** (routes)
   - Create landing page
   - Refactor existing pages to use new structure

8. **Create Utils** (helpers)
   - Lazy loading helpers
   - Image optimization

---

## 📌 Notes

- **DO NOT DELETE** existing files until new structure is fully implemented and tested
- **KEEP BOTH** old and new files during migration
- **TEST THOROUGHLY** before removing old files
- **UPDATE ROUTES** in `src/routes.tsx` to point to new page locations
- **MAINTAIN BACKWARDS COMPATIBILITY** during transition

---

This mapping document serves as your reference guide for restructuring the SDP section according to the new pattern.
