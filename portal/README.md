# Proofreading Course Portal — MVP Specification

## Overview
A simple, self-paced 10-day proofreading course delivered via:
1. Daily email with lesson content
2. Web portal for exercises and tests

## Technical Stack (MVP)
- **Static HTML + JavaScript** — No backend needed
- **JSON exercise files** — Already created
- **Local storage** — Track progress in browser
- **Email** — AgentMail for drip sequence

## Portal Pages

### 1. Landing Page (`index.html`)
- Course description
- "Start Course" button → collects email
- Price: Free (initially)

### 2. Dashboard (`dashboard.html`)
- Shows all 10 days/5 stages
- Progress indicators (locked/available/completed)
- Current lesson link

### 3. Lesson Page (`lesson.html?day=1`)
- Displays lesson markdown (rendered)
- "Start Exercises" button

### 4. Exercise Page (`exercise.html?stage=1&ex=1`)
- Loads exercise from JSON
- Interactive:
  - For "spot-errors": highlight text to mark errors
  - For "fix-errors": text input with corrections
  - For "mcq": radio buttons
- Scoring: Compare to expected answers
- Feedback: Show correct answers after submission

### 5. Test Page (`test.html?stage=1`)
- Gate test for each stage
- Must pass to unlock next stage
- Pass threshold: 80%

## File Structure
```
portal/
├── index.html
├── dashboard.html
├── lesson.html
├── exercise.html
├── test.html
├── css/
│   └── style.css
├── js/
│   ├── app.js          # Main application logic
│   ├── exercises.js    # Exercise rendering/scoring
│   └── progress.js     # Local storage progress tracking
└── data/               # Symlink or copy from curriculum/
```

## Exercise Interaction Patterns

### Spot Errors
- Display passage
- Student clicks/highlights errors
- Score: % of errors found, minus false positives

### Fix Errors
- Display passage with numbered error markers
- Text inputs for corrections
- Score: Exact or close match to expected

### Multiple Choice
- Standard radio buttons
- Immediate feedback

### Style Sheet Building
- Student fills in template
- Compare to expected style sheet
- Score on completeness

## Progress Tracking
```javascript
// Local storage structure
{
  "email": "student@example.com",
  "startDate": "2026-01-31",
  "stages": {
    "1": { "lessons": ["day1", "day2"], "exercises": {...}, "test": "passed" },
    "2": { "lessons": [], "exercises": {...}, "test": null }
  }
}
```

## Email Sequence (10 emails)
| Day | Subject | Content |
|-----|---------|---------|
| 0 | Welcome to the Proofreading Course | Course overview, login link |
| 1 | Day 1: What Proofreaders Actually Do | Lesson summary, exercise link |
| 2 | Day 2: Training Your Eye | Lesson summary, exercise link |
| 3 | Day 3: Punctuation Rules | Stage 1 test reminder |
| 4 | Day 4: Dialogue & Dashes | Lesson + exercises |
| 5 | Day 5: Consistency & Style Sheets | Stage 2 test reminder |
| 6 | Day 6: The Style Sheet | Lesson + exercises |
| 7 | Day 7: Integration | Stage 3 test reminder |
| 8 | Day 8: Queries & Judgment | Lesson + exercises |
| 9 | Day 9: Speed Without Sacrifice | Stage 4 test reminder |
| 10 | Day 10: Final Assessment | Final test link, completion certificate |

## Next Steps
1. Build basic HTML templates
2. Create exercise.js with scoring logic
3. Test with Stage 1 exercises
4. Set up email automation
