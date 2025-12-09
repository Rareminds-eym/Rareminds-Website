# PDF Download Buttons Reference

## Download Section IDs and Links

### 1. Resume Checklist Download
- **Section ID:** `resume-checklist-download`
- **Location:** Hero Section (Top banner - "Still Reading Resumes?")
- **Component:** `src/pages/Corporate/Passport/components/HeroSection.tsx`
- **PDF File:** `public/passport/pdf/Resume checklist.pdf`
- **Direct Link:** `https://rareminds.in/corporate/recruitment#resume-checklist-download`
- **Download Type:** "Resume Checklist"

**To link to this section:**
```html
<a href="/corporate/recruitment#resume-checklist-download">Download Resume Checklist</a>
```

---

### 2. Habit Card Download
- **Section ID:** `habit-card-download`
- **Location:** Problem Section ("It's Not the Employability Gap — It's the Visibility Gap")
- **Component:** `src/pages/Corporate/Passport/components/problemSection.tsx`
- **PDF File:** `public/passport/pdf/Habit Card_Website.pdf`
- **Direct Link:** `https://rareminds.in/corporate/recruitment#habit-card-download`
- **Download Type:** "Habit Card"

**To link to this section:**
```html
<a href="/corporate/recruitment#habit-card-download">Download Habit Card</a>
```

---

### 3. Daily Learning Download
- **Section ID:** `daily-learning-download`
- **Location:** CTA Section ("Talent isn't missing — it's just not mapped")
- **Component:** `src/pages/Corporate/Passport/components/CTASection.tsx`
- **PDF File:** `public/passport/pdf/Daily Learning.pdf`
- **Direct Link:** `https://rareminds.in/corporate/recruitment#daily-learning-download`
- **Download Type:** "Daily Learning"

**To link to this section:**
```html
<a href="/corporate/recruitment#daily-learning-download">Download Daily Learning</a>
```

---

## Usage Examples

### JavaScript
```javascript
// Scroll to and click a download button
document.getElementById('resume-checklist-download').scrollIntoView({ behavior: 'smooth' });
document.getElementById('resume-checklist-download').click();
```

### React Router Link
```jsx
import { Link } from 'react-router-dom';

<Link to="/corporate/recruitment#resume-checklist-download">
  Download Resume Checklist
</Link>
```

### External Link (Email, Social Media)
```
Resume Checklist: https://rareminds.in/corporate/recruitment#resume-checklist-download
Habit Card: https://rareminds.in/corporate/recruitment#habit-card-download
Daily Learning: https://rareminds.in/corporate/recruitment#daily-learning-download
```

---

## Form Fields Collected

All download forms collect:
- Name
- Company
- Email
- Phone Number
- Role to Hire
- Message

Data is stored in: `pdf_downloads` table
Email notifications sent to: `marketing@rareminds.in`

---

## Testing Links

You can test each button by visiting:
1. `http://localhost:5173/corporate/recruitment#resume-checklist-download`
2. `http://localhost:5173/corporate/recruitment#habit-card-download`
3. `http://localhost:5173/corporate/recruitment#daily-learning-download`

The page will automatically scroll to the button when using the hash link.
