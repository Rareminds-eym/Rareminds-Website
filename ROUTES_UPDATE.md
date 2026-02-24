# Routes Configuration Update

## Add These Routes to `src/routes.tsx`

### 1. Import the new ServiceDetailPage

Add to the lazy imports section (around line 40):

```typescript
const ServiceDetailPage = lazy(() => import("./pages/universities/sdp/ServiceDetailPage"));
```

### 2. Add Routes in UniversitiesLayout Children

Find the UniversitiesLayout section and add these routes:

```typescript
{
  element: (
    <>
      <ScrollToTop />
      <UniversitiesLayout>
        <Outlet />
      </UniversitiesLayout>
    </>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    {
      path: "/universities",
      element: withSuspense(Universities),
    },
    {
      path: "/universities/services",
      element: withSuspense(ServiceCategoriesPage),
    },
    
    // ✅ ADD THIS - Service Detail Page for non-engineering categories
    {
      path: "/universities/sdp/:categorySlug",
      element: withSuspense(ServiceDetailPage),
    },
    
    // ✅ UPDATE THIS - Change from dynamic :serviceId to hardcoded 'engineering'
    {
      path: "/universities/engineering/courses",
      element: withSuspense(CoursesListingPage),
    },
    
    // Keep existing course detail route
    {
      path: "/universities/course/:courseSlug",
      element: withSuspense(CourseDetailPage),
    },
    
    // ... rest of existing routes
  ],
}
```

---

## Complete Routes Section for Reference

Here's the complete UniversitiesLayout routes section with all changes:

```typescript
{
  element: (
    <>
      <ScrollToTop />
      <UniversitiesLayout>
        <Outlet />
      </UniversitiesLayout>
    </>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    {
      path: "/universities",
      element: withSuspense(Universities),
    },
    {
      path: "/universities/services",
      element: withSuspense(ServiceCategoriesPage),
    },
    {
      path: "/service/:id",
      element: (
        <Suspense fallback={<LoaderComponent />}>
          <ServiceCategoryCard />
        </Suspense>
      ),
    },
    // NEW: Service Detail Page
    {
      path: "/universities/sdp/:categorySlug",
      element: withSuspense(ServiceDetailPage),
    },
    // UPDATED: Engineering courses only
    {
      path: "/universities/engineering/courses",
      element: withSuspense(CoursesListingPage),
    },
    {
      path: "/universities/course/:courseSlug",
      element: withSuspense(CourseDetailPage),
    },
    {
      path: "/universities/fdp",
      element: withSuspense(FDP),
    },
    {
      path: "/universities/communication-personality-development",
      element: <CommunicationPersonalityDevelopment />,
    },
    {
      path: "/universities/mental-health-counseling-fdp",
      element: <MentalHealthCounselingFDP />,
    },
    {
      path: "/universities/domain-specific-programs",
      element: <DomainSpecificPrograms />,
    },
    {
      path: "/universities/leadership-career-growth",
      element: <LeadershipCareerGrowth />,
    },
    {
      path: "/universities/institutional-value-added-services",
      element: <InstitutionalValueAdded />,
    },
    // Blog routes
    {
      path: "/universities/blogs",
      element: withSuspense(BlogListing),
    },
    {
      path: "/universities/blogs/:slug",
      element: withSuspense(InstitutionsBlogDetail),
    },
    {
      path: "/universities/sdp/blogs",
      element: withSuspense(BlogListing),
    },
    {
      path: "/universities/sdp/blogs/:slug",
      element: withSuspense(InstitutionsBlogDetail),
    },
    {
      path: "/universities/fdp/blogs",
      element: withSuspense(BlogListing),
    },
    {
      path: "/universities/fdp/blogs/:slug",
      element: withSuspense(InstitutionsBlogDetail),
    },
    {
     path: "/universities/skill-passport",
      element: withSuspense(UniversitiesPassport),
    }
  ],
}
```

---

## URL Structure After Changes

| Old URL | New URL | Page |
|---------|---------|------|
| `/universities/:serviceId/courses` | `/universities/engineering/courses` | Courses Listing (Engineering only) |
| N/A | `/universities/sdp/arts-science` | Service Detail (Arts & Science) |
| N/A | `/universities/sdp/management-business` | Service Detail (Management) |
| N/A | `/universities/sdp/corporate-faculty-training` | Service Detail (Corporate/Faculty) |
| N/A | `/universities/sdp/bsc-skill-based` | Service Detail (BSc Skill-Based) |
| `/universities/course/:courseSlug` | `/universities/course/:courseSlug` | Course Detail (unchanged) |

---

## Testing URLs

After implementation, test these URLs:

1. ✅ `/universities/services` - Should show 5 new categories
2. ✅ `/universities/engineering/courses` - Should show engineering courses
3. ✅ `/universities/sdp/arts-science` - Should show Arts & Science service detail
4. ✅ `/universities/sdp/management-business` - Should show Management service detail
5. ✅ `/universities/sdp/corporate-faculty-training` - Should show Corporate/Faculty service detail
6. ✅ `/universities/sdp/bsc-skill-based` - Should show BSc service detail
7. ✅ `/universities/course/good-manufacturing-practices-quality-assurance` - Should show course detail

---

## Implementation Steps

1. Add `ServiceDetailPage` import to routes.tsx
2. Add `/universities/sdp/:categorySlug` route
3. Change `/universities/:serviceId/courses` to `/universities/engineering/courses`
4. Test all navigation flows
5. Verify no broken links

Done! ✅
