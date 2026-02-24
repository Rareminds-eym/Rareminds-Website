# ServicePage.tsx - Complete Explanation

## 📍 FILE LOCATION
`src/components/universities/sdp/ServicePage.tsx`

---

## 🎯 PURPOSE

ServicePage.tsx is a **detailed service information page** that displays comprehensive information about individual university services. It acts as a **deep-dive page** for each service listed in the Services component.

---

## 🔗 WHERE IT'S USED

### Route Configuration (from routes.tsx):
```typescript
{
  path: "/service/:id",
  element: (
    <Suspense fallback={<LoaderComponent />}>
      <ServicePage />
    </Suspense>
  ),
}
```

### Navigation Flow:
1. **Universities Main Page** (`/universities`)
   ↓
2. **Services Section** (InstitutionTypeSelector → Services component)
   ↓
3. **Services.tsx** - User clicks on a service card
   ↓
4. **ServicePage.tsx** (`/service/:id`) ← YOU ARE HERE
   
   OR (for full-semester only)
   ↓
5. **CourseList.tsx** (`/universities/full-semester/courses`)

---

## 🚀 HOW USERS REACH THIS PAGE

### From Services.tsx:
```typescript
// In Services.tsx component
onClick={() => {
  if (service.id === 'full-semester') {
    navigate(`/universities/${service.id}/courses`);  // Goes to CourseList
  } else {
    navigate(`/service/${service.id}`);  // Goes to ServicePage ← HERE
  }
}}
```

### Services that use ServicePage:
- ✅ Pre-Placement Accelerator (`/service/pre-placement`)
- ✅ Bridge Courses (`/service/bridge-courses`)
- ✅ Skill-Based Training (`/service/skill-based`)
- ✅ Faculty Development (`/service/faculty-development`)
- ✅ Internship & Placement (`/service/internship-placement`)

### Service that DOESN'T use ServicePage:
- ❌ Full Semester Skill Program - Goes directly to CourseList instead

---

## 📊 WHAT IT DISPLAYS

### 1. Header Banner Section
- Service image (from `service.servicesimg`)
- Service name and subtitle
- Back button to Services page
- Gradient overlay for text readability

### 2. About The Course Section
- Detailed description (`service.whatitis`)
- Explains what the service is and how it works
- For full-semester only: "View All Courses" button

### 3. Contents Table (Right Sidebar on Desktop)
- Interactive table of all programs/modules
- Clickable rows to select a program
- Shows Sl. No and Program Title
- Scrollable if content exceeds height

### 4. Program Details (Dynamic)
- Changes based on selected program from Contents Table
- **Key Focus Areas**: Main topics covered
- **Customization by Academic Stream**: How it's tailored for different departments
- **Job Roles / Outcomes**: Career opportunities after completion

### 5. Program Benefits Section
- List of benefits with checkmark icons
- Animated entrance effects
- Gradient background for visual appeal

### 6. Explore Other Services (Bookmark)
- Quick navigation to other services
- Excludes current service
- Clickable list with bullet points

---

## 🗂️ DATA STRUCTURE

### Program Tables Object:
```typescript
const programTables: Record<string, Array<any>> = {
  'full-semester': [ /* 16 programs */ ],
  'pre-placement': [ /* 15 modules */ ],
  'bridge-courses': [ /* 12 foundation programs */ ],
  'skill-based': [ /* 37 skill programs */ ],
  'faculty-development': [ /* 8 FDP programs */ ],
  'internship-placement': [ /* 10 placement programs */ ]
};
```

### Each Program Object Contains:
```typescript
{
  slNo: number,           // Serial number
  title: string,          // Program name
  keyFocus: string,       // Main topics (comma-separated)
  customization: string,  // Stream-specific details (semicolon/period-separated)
  outcomes: string        // Career outcomes (comma-separated)
}
```

---

## 💡 KEY FEATURES

### 1. Dynamic Content Loading
- Uses `useParams()` to get service ID from URL
- Fetches service data from Services.tsx export
- Loads corresponding program table data

### 2. Interactive Program Selection
- Click any row in Contents Table
- Program Details section updates instantly
- Selected row highlighted with blue background

### 3. Responsive Layout
**Mobile:**
- Vertical stack layout
- Contents Table → Program Details → Benefits → Other Services

**Desktop:**
- Two-column layout
- Left: About + Program Details + Benefits
- Right: Other Services + Contents Table (sticky)

### 4. Navigation Integration
- Back button to Services page
- Links to other services
- For full-semester: Button to view all courses

### 5. Visual Enhancements
- Framer Motion animations
- Gradient backgrounds
- Hover effects on interactive elements
- Smooth transitions

---

## 🔄 USER INTERACTION FLOW

```
1. User on Universities page
   ↓
2. Scrolls to Services section
   ↓
3. Clicks on "Pre-Placement Accelerator" card
   ↓
4. ServicePage loads with URL: /service/pre-placement
   ↓
5. Sees header banner with service image
   ↓
6. Reads "About The Course" description
   ↓
7. Clicks on "Aptitude & Logical Reasoning Mastery" in Contents Table
   ↓
8. Program Details section updates to show:
   - Key Focus: Quantitative aptitude, reasoning, verbal ability
   - Customization: Engineering vs Arts vs Commerce approaches
   - Outcomes: Aptitude Test Ready Candidates
   ↓
9. Scrolls down to see Program Benefits
   ↓
10. Clicks "Explore Other Services" to see more options
```

---

## 🎨 STYLING APPROACH

### Color Scheme:
- Primary: Blue (`blue-600`, `blue-700`, `blue-100`)
- Accent: Indigo (`indigo-100`)
- Success: Green (`green-500`)
- Background: White, Gray-50

### Card Styles:
- White background
- Blue border (`border-blue-100`)
- Rounded corners (`rounded-2xl`)
- Shadow effects
- Hover states with blue tint

### Typography:
- Headings: Bold, Black text
- Body: Gray-700, Gray-800
- Links: Blue-900
- Emphasis: Blue-700

---

## 🔧 TECHNICAL IMPLEMENTATION

### State Management:
```typescript
const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
```
- Tracks which program is currently selected
- Defaults to first program (index 0)

### URL Parameter Handling:
```typescript
const { id } = useParams();
const service = services.find(s => s.id === id);
const tableData = programTables[id as string] || [];
```

### Error Handling:
```typescript
if (!service) {
  return (
    <div>Service not found</div>
  );
}
```

### Navigation:
```typescript
const navigate = useNavigate();
// Used for:
- Back button: navigate('/universities/services')
- Other services: navigate(`/service/${s.id}`)
- View courses: navigate(`/universities/${id}/courses`)
```

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 768px):
- Single column layout
- Sections stacked vertically
- Full-width components
- Smaller text sizes
- Compact spacing

### Desktop (≥ 768px):
- Two-column layout
- Fixed-width sidebar (370px)
- Larger text sizes
- More generous spacing
- Sticky sidebar (Contents Table stays visible)

---

## 🎯 WHY THIS DESIGN?

### 1. Information Architecture
- Progressive disclosure: Overview → Details → Benefits
- Users can explore at their own pace
- Interactive table allows quick navigation

### 2. User Experience
- Clear visual hierarchy
- Easy navigation back to services
- Related services always visible
- Mobile-first responsive design

### 3. Content Organization
- Separates general info from specific program details
- Allows comparison between programs
- Shows customization for different academic streams
- Highlights career outcomes

### 4. Conversion Optimization
- Benefits section reinforces value
- Multiple navigation options
- Clear call-to-action (View All Courses for full-semester)
- Easy access to related services

---

## 🔗 RELATIONSHIP WITH OTHER COMPONENTS

### Services.tsx (Parent)
- Exports `services` array
- Provides navigation to ServicePage
- ServicePage imports and uses this data

### CourseList.tsx (Sibling)
- Alternative destination for full-semester service
- Shows list of courses instead of program details
- Uses similar navigation patterns

### CourseDetail.tsx (Cousin)
- Shows individual course information
- Accessed from CourseList
- Similar detail page structure

---

## 📝 CONTENT EXAMPLES

### Full Semester Service:
- 16 programs covering GMP, Medical Coding, Food Safety, AI, Digital Marketing, etc.
- Mix of student and faculty programs
- Industry-aligned certifications

### Pre-Placement Accelerator:
- 15 modules for final-year students
- Focus on aptitude, interviews, soft skills
- Placement-ready outcomes

### Bridge Courses:
- 12 foundation programs for first-year students
- Communication, digital literacy, emotional intelligence
- Campus orientation and academic systems

### Skill-Based Training:
- 37 diverse skill programs
- Credit-linked add-on courses
- From digital marketing to sustainability

### Faculty Development:
- 8 specialized FDP programs
- NEP alignment, digital pedagogy
- Research and mentorship skills

### Internship & Placement:
- 10 industry connect programs
- Resume building, mock interviews
- Career counseling and placement drives

---

## ✅ KEY TAKEAWAYS

1. **ServicePage is a detail page** for individual university services
2. **Accessed via URL parameter** `/service/:id`
3. **Displays comprehensive information** about programs, customization, and outcomes
4. **Interactive Contents Table** allows users to explore different programs
5. **Responsive design** adapts to mobile and desktop
6. **Navigation hub** with links to other services and back to main services page
7. **NOT used for full-semester service** - that goes to CourseList instead
8. **Contains extensive program data** (100+ programs across all services)
9. **Focuses on employability** - shows job roles and career outcomes
10. **Customization-focused** - explains how programs adapt to different academic streams

---

## 🚨 IMPORTANT NOTES

- ServicePage is **NOT** the same as ServicesPage.tsx (which shows all services)
- Full-semester service **bypasses** ServicePage and goes to CourseList
- Program data is **hardcoded** in the component (not from API)
- Contents Table is **interactive** - clicking changes Program Details
- Layout **completely changes** between mobile and desktop
- Each service has **different number of programs** (8 to 37)
- Customization section shows **stream-specific** adaptations (Engineering, Arts, Commerce, etc.)
