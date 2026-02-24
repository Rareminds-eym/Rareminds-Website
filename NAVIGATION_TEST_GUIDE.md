# Navigation Test Guide

## Quick Test Steps

Follow these exact steps to test navigation:

### Test 1: Basic Flow
1. Go to `/universities`
2. Click to navigate to `/universities/services`
3. **Verify:** You see 6 service cards
4. Click "Full Semester" card
5. **Verify:** URL changes to `/universities/full-semester/courses`
6. **Verify:** You see course list with 15 courses
7. Click "Back to Services" button (top left)
8. **Verify:** URL changes to `/universities/services`
9. **Verify:** You see 6 service cards again
10. **Verify:** Service cards are clickable

### Test 2: Course Detail Flow
1. Start at `/universities/services`
2. Click "Full Semester"
3. Click any course card
4. **Verify:** URL is `/universities/course/[course-slug]`
5. Click "Back to Courses" button
6. **Verify:** URL is `/universities/full-semester/courses`
7. Click "Back to Services" button
8. **Verify:** URL is `/universities/services`
9. **Verify:** Service cards work

## If Navigation Fails

### Symptom 1: Page doesn't load after clicking back
**Possible cause:** Route not found or component not rendering

**Debug:**
```javascript
// Open browser console and check:
console.log('Current URL:', window.location.pathname);
console.log('React Router location:', window.location);
```

### Symptom 2: Page loads but cards don't work
**Possible cause:** Event handlers not attached or component state issue

**Debug:**
```javascript
// Check if cards exist:
const cards = document.querySelectorAll('[class*="cursor-pointer"]');
console.log('Found cards:', cards.length);

// Check if onClick is attached:
cards.forEach((card, i) => {
  console.log(`Card ${i} has onclick:`, card.onclick !== null);
});
```

### Symptom 3: URL changes but page doesn't update
**Possible cause:** Component not remounting or lazy loading issue

**Debug:**
```javascript
// Check if Services component is mounted:
const servicesSection = document.querySelector('section');
console.log('Services section found:', servicesSection !== null);
```

## Browser Console Commands

Run these in your browser console while testing:

```javascript
// 1. Check current route
console.log('Current path:', window.location.pathname);

// 2. Check if Services component rendered
console.log('Service cards:', document.querySelectorAll('[class*="cursor-pointer"]').length);

// 3. Force navigation (test if navigate function works)
// Note: This only works if you have access to navigate function
// window.navigate('/universities/services');

// 4. Check React Router state
console.log('History state:', window.history.state);

// 5. Check for JavaScript errors
console.log('Check console for errors above');
```

## Common Issues & Solutions

### Issue 1: Lazy Loading Delay
**Symptom:** Page shows loading spinner briefly, then nothing

**Solution:** Check if `withSuspense` is working correctly

### Issue 2: Component Not Remounting
**Symptom:** Page looks the same, but URL changed

**Solution:** Add key prop to force remount:
```typescript
<Services key={location.pathname} />
```

### Issue 3: Event Handlers Lost
**Symptom:** Cards visible but not clickable

**Solution:** Check if Services component is using proper event delegation

### Issue 4: Browser Back vs UI Back
**Symptom:** Browser back button works differently than UI back button

**Solution:** This is expected - use UI back buttons for consistent behavior

## Expected Console Output

When navigation works correctly, you should see:

```
Current path: /universities/services
Service cards: 6
History state: {usr: {...}, key: "..."}
```

## If All Tests Pass But Issue Persists

The navigation is working correctly. The issue might be:

1. **User expectation mismatch** - User expects different behavior
2. **Specific browser issue** - Try different browser
3. **Cache issue** - Clear browser cache and reload
4. **Network delay** - Check network tab for slow requests

## Actual Navigation Flow (Correct)

```
/universities (Homepage)
    ↓
/universities/services (Services Page - 6 cards)
    ↓ Click "Full Semester"
/universities/full-semester/courses (Course List - 15 courses)
    ↓ Click a course
/universities/course/[slug] (Course Detail)
    ↓ Click "Back to Courses"
/universities/full-semester/courses (Course List)
    ↓ Click "Back to Services"
/universities/services (Services Page - 6 cards) ← Should work!
```

## Report Format

If issue persists, provide this information:

1. **Exact steps taken:**
   - Step 1: ...
   - Step 2: ...
   - Step 3: ...

2. **Expected behavior:**
   - What should happen

3. **Actual behavior:**
   - What actually happens

4. **Browser console output:**
   - Any errors?
   - Console.log results from debug commands

5. **URL at each step:**
   - Step 1 URL: ...
   - Step 2 URL: ...
   - Step 3 URL: ...

6. **Screenshots:**
   - Before clicking back
   - After clicking back

This will help identify the exact issue!
