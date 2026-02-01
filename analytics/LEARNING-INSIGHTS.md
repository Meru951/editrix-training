# Learning Insights System

## Purpose

Track HOW human editors learn so we can:
1. Improve the curriculum (fix what's not working)
2. Feed insights to Mary (AI knows what humans find hard)
3. Identify patterns in editorial mistakes
4. Build a feedback loop that gets smarter over time

---

## What We Track

### 1. Error-Level Data
For every exercise and test:
```json
{
  "student_id": "xxx",
  "exercise_id": "2.1",
  "item_id": 15,
  "error_type": "comma_splice",
  "student_answer": "correct",
  "actual_answer": "incorrect",
  "result": "false_negative",
  "time_spent_seconds": 45,
  "attempt_number": 1
}
```

**Categories:**
- `true_positive` — correctly identified an error
- `true_negative` — correctly left correct text alone
- `false_positive` — marked correct text as wrong (overcorrection)
- `false_negative` — missed an actual error

### 2. Error Type Patterns
Track accuracy BY error type across all students:

| Error Type | Avg Accuracy | Common Mistake |
|------------|--------------|----------------|
| comma_splice | 72% | Missed — don't see it as error |
| its_vs_its | 85% | Often correct |
| dialogue_punctuation | 68% | Full stop vs comma confusion |
| compound_adjective | 61% | Don't recognize hyphen needed |
| which_vs_that | 58% | Restrictive clause confusion |
| double_space | 91% | Easy to spot |
| em_dash_spacing | 55% | House style unfamiliar |

### 3. Learning Curves
Track how accuracy changes over the 10 days:
- Day 1 baseline
- Improvement rate per error type
- Plateau points (where learning stalls)
- Breakthrough moments

### 4. Time vs Accuracy
- Does rushing cause more errors?
- Which error types need more time?
- Optimal pace for accuracy

### 5. False Positive Patterns
What do students INCORRECTLY mark as errors?
- Style preferences vs actual errors
- Overcorrection tendencies
- "Fixing" author voice

### 6. Nudge Effectiveness
- Which nudge messages get responses?
- Completion rate after each nudge type
- Optimal timing for nudges

---

## Data Collection Points

### During Exercises
```javascript
// Track each answer
logAnswer({
  student_id,
  exercise_id,
  item_id,
  error_type,
  student_answer,
  correct_answer,
  time_spent,
  timestamp
});
```

### During Tests
```javascript
// Track passage markup
logMarkup({
  student_id,
  test_id,
  paragraph,
  marked_errors: [...],
  actual_errors: [...],
  false_positives: [...],
  false_negatives: [...],
  style_sheet_quality,
  total_time
});
```

### After Completion
```javascript
// Aggregate student journey
summarizeJourney({
  student_id,
  total_days,
  completion_status,
  accuracy_by_day: [...],
  accuracy_by_type: {...},
  improvement_rate,
  struggle_areas: [...],
  strengths: [...]
});
```

---

## Insights We Generate

### Weekly Report (for Meru)
```
EDITOR TRAINING INSIGHTS — Week of [date]

Students Active: 12
Completed: 3
Dropped: 2

HARDEST ERROR TYPES THIS WEEK:
1. Which vs That (54% accuracy) — students don't understand restrictive clauses
2. Compound adjectives (62%) — miss hyphens before nouns
3. Dialogue punctuation (67%) — comma vs full stop confusion

CURRICULUM RECOMMENDATIONS:
- Add more which/that practice in Stage 2
- Create visual guide for compound adjectives
- Add dialogue punctuation drill

NUDGE PERFORMANCE:
- 12h nudge: 60% continue
- 24h "Are you still in?": 45% continue
- 48h identity appeal: 30% continue
- Best performing: The identity appeal converts the most committed students

TOP STUDENT: [Name] — 94% accuracy, completed in 8 days
WATCH LIST: [Name] — struggling with punctuation, may need extra support
```

### Insights for Mary (AI Proofreader)
```
HUMAN EDITOR PATTERNS — Feed to Mary

Humans frequently MISS:
- Compound adjectives without hyphens (61% miss rate)
- Which without comma in non-restrictive clauses (58%)
- Inconsistent em-dash spacing (55%)

Humans frequently OVERCORRECT:
- Stylistic comma usage (not errors)
- Author voice quirks
- Acceptable spelling variants

RECOMMENDATION FOR MARY:
- Flag compound adjectives with HIGH confidence
- Explain which/that rules in queries
- Don't flag stylistic choices humans accept
```

---

## Storage Structure

```
/analytics/
  /raw/
    submissions-2026-02.jsonl      # Raw submission data
    journeys-2026-02.jsonl         # Student journeys
  /aggregated/
    error-type-accuracy.json       # Accuracy by error type
    learning-curves.json           # Day-by-day improvement
    nudge-effectiveness.json       # Which nudges work
  /reports/
    weekly-2026-02-01.md           # Weekly insight report
    mary-insights-2026-02.md       # Insights for AI proofreader
  LEARNING-INSIGHTS.md             # This file
```

---

## Implementation Plan

### Phase 1: Basic Tracking (Now)
- [ ] Add submission logging to tracker.json
- [ ] Track error types in exercises
- [ ] Record time spent per item

### Phase 2: Analytics Dashboard (Week 2)
- [ ] Build aggregation scripts
- [ ] Generate weekly reports
- [ ] Visualize learning curves

### Phase 3: Mary Integration (Week 3)
- [ ] Feed insights to Mary's rubrics
- [ ] Adjust AI confidence based on human patterns
- [ ] Create human-AI alignment metrics

---

## Key Questions We'll Answer

1. **What errors do humans miss most?** → Train harder on these
2. **What do humans overcorrect?** → Tell Mary to be cautious here
3. **Where do students plateau?** → Redesign that stage
4. **Which nudges work?** → Optimize retention
5. **How does speed affect accuracy?** → Set realistic time targets
6. **What predicts completion?** → Identify at-risk students early

---

*This system makes Diana smarter over time, and helps Mary understand human editors better.*
