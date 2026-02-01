# Editrix Academy: Interactive Proofreading Trainer

## Concept

A web-based platform where students proofread PDFs directly in the browser, get real-time feedback, and learn through gamified discovery.

---

## User Flow

1. **Select Manuscript**
   - See catalog with difficulty ratings
   - "The Netherfield Ball" 🟢 Easy — 75 errors to find

2. **Read Instructions**
   - "This manuscript contains 75 deliberate errors"
   - "Mark each error using the annotation tools"
   - "Ask for hints if you're stuck"

3. **Proofread**
   - PDF viewer with annotation tools
   - Progress bar: "Found: 23/75 errors"
   - Timer (optional, for advanced students)

4. **Get Hints** (if stuck)
   - "Hint: There's a spelling error in paragraph 3"
   - "Hint: Check the dialogue punctuation on page 2"
   - Hints don't penalize score — the goal is learning

5. **Submit & Grade**
   - Compare student marks to answer key
   - Show what they found vs what they missed
   - Detailed feedback on each error type

6. **Review & Learn**
   - See the correct answer key
   - Understand WHY each error was wrong
   - Track weak areas for future practice

---

## Interface Design

```
┌─────────────────────────────────────────────────────────────┐
│  THE NETHERFIELD BALL                    Found: 23/75  🔍   │
│  🟢 Easy | Pride and Prejudice                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐  ┌───────────────┐ │
│ │                                     │  │ TOOLS         │ │
│ │         PDF VIEWER                  │  │ ✏️ Highlight   │ │
│ │                                     │  │ ✂️ Strikethrough│ │
│ │    [manuscript content]             │  │ 📝 Replace     │ │
│ │                                     │  │ ➕ Insert      │ │
│ │                                     │  │ 💬 Query       │ │
│ │                                     │  ├───────────────┤ │
│ │                                     │  │ PROGRESS      │ │
│ │                                     │  │ ████████░░ 31%│ │
│ │                                     │  │ 23/75 found   │ │
│ │                                     │  ├───────────────┤ │
│ │                                     │  │ [💡 Get Hint] │ │
│ │                                     │  │ [✅ Submit]   │ │
│ └─────────────────────────────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Stack

### Frontend
- **PDF.js** — Mozilla's PDF viewer (open source)
- **React** or vanilla JS
- **LocalStorage** — save progress between sessions
- Custom annotation layer over PDF

### Answer Key Format
```json
{
  "manuscript": "EA-01",
  "title": "The Netherfield Ball",
  "total_errors": 75,
  "errors": [
    {
      "id": 1,
      "page": 1,
      "line": 3,
      "type": "spelling",
      "incorrect": "universaly",
      "correct": "universally",
      "hint": "Check the spelling of the adverb in the famous opening line",
      "difficulty": "easy"
    },
    {
      "id": 2,
      "page": 1,
      "line": 7,
      "type": "consistency",
      "incorrect": "Bennett",
      "correct": "Bennet",
      "hint": "The family name changes spelling somewhere on this page",
      "difficulty": "medium"
    }
  ]
}
```

### Grading Logic
```javascript
function gradeSubmission(studentMarks, answerKey) {
  const results = {
    found: [],      // Errors correctly identified
    missed: [],     // Errors not found
    false_positives: [],  // Student marked something that wasn't an error
    score: 0
  };
  
  // Match student marks to answer key by location
  for (const error of answerKey.errors) {
    const match = findMatchingMark(studentMarks, error);
    if (match) {
      results.found.push({ error, mark: match });
    } else {
      results.missed.push(error);
    }
  }
  
  // Calculate score
  results.score = (results.found.length / answerKey.total_errors) * 100;
  
  return results;
}
```

---

## Hint System

### Hint Levels
1. **Vague hint:** "There's a spelling error on page 2"
2. **Medium hint:** "Check the word 'recieve' on page 2"
3. **Direct hint:** "Line 15: 'recieve' should be 'receive'"

### Hint Philosophy
- Hints don't penalize score
- Goal is LEARNING, not testing
- Students can ask for as many hints as they need
- Track hint usage to identify weak areas

---

## Gamification Elements

### Progress Tracking
- Error counter: "23/75 found"
- Progress bar with percentage
- "Keep going! You're 31% there"

### Achievements
- 🌟 "First Find" — Mark your first error
- 🔥 "On Fire" — Find 10 errors in a row
- 🎯 "Eagle Eye" — Find a hard error without hints
- 🏆 "Perfect Proof" — Find all errors in a manuscript
- 📚 "Bookworm" — Complete all 5 manuscripts

### Leaderboard (optional)
- Fastest completion times
- Fewest hints used
- Streak tracking

---

## Error Feedback

When student submits, show:

### Found ✅
> **Error #23: Spelling**
> You correctly identified "recieve" → "receive"
> This is a common misspelling. The rule: "i before e, except after c"

### Missed ❌
> **Error #45: Hyphenation**
> You missed: "well known author" → "well-known author"
> Compound adjectives before nouns need hyphens.
> [Learn more about hyphenation →]

---

## MVP Scope

### Phase 1: Basic Trainer
- [ ] PDF viewer with highlight tool
- [ ] Error counter
- [ ] Submit button
- [ ] Basic grading (match highlights to answer key)
- [ ] Show results

### Phase 2: Full Features
- [ ] All annotation tools
- [ ] Hint system
- [ ] Detailed feedback
- [ ] Progress saving
- [ ] Multiple manuscripts

### Phase 3: Gamification
- [ ] Achievements
- [ ] Leaderboard
- [ ] Analytics dashboard
- [ ] Weak area tracking

---

## File Structure

```
portal/training-app/
├── index.html          # Landing page
├── train.html          # Training interface
├── results.html        # Results page
├── css/
│   └── styles.css
├── js/
│   ├── pdf-viewer.js   # PDF.js wrapper
│   ├── annotations.js  # Annotation tools
│   ├── grader.js       # Grading logic
│   └── hints.js        # Hint system
├── data/
│   ├── EA-01-key.json  # Answer keys
│   ├── EA-02-key.json
│   └── ...
└── pdfs/
    ├── EA-01-proof.pdf
    └── ...
```

---

## Next Steps

1. Build MVP with PDF.js and basic annotation
2. Create JSON answer keys from manuscript error lists
3. Implement grading logic
4. Add hint system
5. Deploy to GitHub Pages

---

*The goal is not to catch them out. The goal is to teach them to see.*
