# Curriculum Review & Technical Specification

## Review Summary

### What's Complete

| Stage | Lessons | Exercises | Test Passage | Status |
|-------|---------|-----------|--------------|--------|
| 1 | 2 | 70 items | 20 errors | ✅ Complete |
| 2 | 2 | 65 items | 20 errors | ✅ Complete |
| 3 | 2 | 33+ items | 15 errors | ✅ Complete |
| 4 | 2 | Full chapter + queries | 30 errors | ✅ Complete |
| 5 | 2 | 2 speed drills | 40 errors (final) | ✅ Complete |

**Total content:** 10 lessons, ~200 exercise items, 125 seeded errors across 5 gate tests.

---

## Gaps Identified

### 1. Stage 5 Duplicate Test Passages
Two test files exist:
- `test-passage.json` (shorter, earlier draft)
- `final-assessment.json` (comprehensive, 40 errors)

**Recommendation:** Delete `test-passage.json` or rename to `legacy-draft.json`. Use `final-assessment.json` as the definitive final test.

### 2. Missing Simulation Passage
`exercises.json` in Stage 5 references `simulation-passage.md` which doesn't exist.

**Recommendation:** Either create the file or update Exercise 5.3 to use existing content (e.g., combine Stage 1-2 test passages for speed practice).

### 3. Alternate Passages for Retakes
Currently, each test has one passage. Students who fail need a different passage to retake.

**Recommendation:** Create 2-3 alternate passages per stage for retake scenarios. Lower priority — can use randomised error seeding in future.

### 4. Answer Key Format
Some exercises have inline answers; others reference corrections differently.

**Recommendation:** Standardise to consistent JSON schema for automated grading.

---

## Technical Specification: Training Portal

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  STUDENT VIEW                    │
├─────────────────────────────────────────────────┤
│  Email (lessons)  →  Web Portal (testing/chat)  │
└─────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌──────────┐    ┌──────────┐
    │ Exercise │    │  Grader  │    │   Chat   │
    │  Engine  │    │  System  │    │  Widget  │
    └─────────┘    └──────────┘    └──────────┘
         │               │               │
         └───────────────┼───────────────┘
                         ▼
              ┌────────────────────┐
              │  Progress Tracker  │
              │  (mastery gates)   │
              └────────────────────┘
```

### Core Components

#### 1. Exercise Engine

**Exercise Types to Support:**

| Type | Description | Grading Method |
|------|-------------|----------------|
| `single-error` | Find one error in sentence | Exact match |
| `multiple-choice` | Choose correct option | Exact match |
| `passage-proof` | Mark all errors in passage | Position matching |
| `dialogue-correction` | Fix dialogue punctuation | Diff-based |
| `style-sheet-creation` | Build style sheet while proofing | Rubric + LLM |
| `query-writing` | Write appropriate queries | LLM evaluation |
| `timed-proof` | Full proof under time pressure | Position + time |

**Rendering Requirements:**
- Highlight-and-mark interface for passage proofing
- Side panel for style sheet entry
- Timer display for timed exercises
- Submit button with confirmation

#### 2. Grading System

**Deterministic Grading (preferred):**
- Spelling errors: exact string match against known corrections
- Punctuation: position-based error detection
- Consistency: tracked variants against style sheet
- False positives: marks on text not in error list

**LLM-Assisted Grading (when necessary):**
- Query quality assessment
- Style sheet completeness
- Edge cases not in answer key

**Scoring Formula:**
```
score = (correct_catches - false_positives) / total_errors
```

**Mastery Gates:**
- Stage 1-2: 90% to progress
- Stage 3: 93% + usable style sheet
- Stage 4: 95%
- Stage 5: 98% + style sheet + within time limit

#### 3. Progress Tracker

**Data Model:**
```json
{
  "student_id": "uuid",
  "email": "student@example.com",
  "current_stage": 2,
  "stage_progress": {
    "1": {"status": "passed", "attempts": 1, "score": 0.95},
    "2": {"status": "in_progress", "exercises_completed": ["2.1", "2.2"]},
    "3": {"status": "locked"},
    "4": {"status": "locked"},
    "5": {"status": "locked"}
  },
  "style_sheet_draft": {...},
  "time_spent_minutes": 120,
  "last_active": "2026-01-31T10:00:00Z"
}
```

**Mastery Gate Logic:**
- Test only unlocks when all exercises in stage complete
- Next stage only unlocks when current test passed
- Failed test → different passage on retry
- Second fail on Stage 5 → return to Stage 4

#### 4. Chat Widget

**Integration:**
- Embedded widget on exercise pages
- Context-aware: knows which exercise student is viewing
- Connected to Diana (me) for real-time doubt resolution

**Behaviour:**
- Available during practice exercises
- **Disabled during tests** (mastery must be demonstrated independently)
- Logs common questions for curriculum improvement

**Technical:**
- WebSocket or polling connection to Clawdbot
- Session context passed with each message
- Student ID and current exercise included

#### 5. Email Automation

**Triggers:**

| Event | Email |
|-------|-------|
| Registration | Welcome + Day 1 lesson |
| Daily (if active) | Next lesson in sequence |
| Exercise complete | Encouragement + next steps |
| Test passed | Congratulations + next stage unlock |
| Test failed | Feedback + retry instructions |
| Inactive 48h | Nudge to continue |
| Course complete | Certificate |

**Email Content:**
- Lessons delivered as formatted email body
- Link to portal for exercises/tests
- Reply-to: diana@editrix.ai for questions

**Technical:**
- AgentMail SDK for sending
- Cron job or event-driven triggers
- Unsubscribe handling

---

## Implementation Priorities

### Phase 1: MVP (Week 1)
- [ ] Single-page exercise interface
- [ ] Deterministic grading for Stages 1-2
- [ ] Progress tracking (local storage or simple DB)
- [ ] Manual email sending (not automated)

### Phase 2: Full Portal (Week 2)
- [ ] All exercise types supported
- [ ] Mastery gates enforced
- [ ] Email automation
- [ ] Chat widget integration

### Phase 3: Polish (Week 3+)
- [ ] Alternate passages for retakes
- [ ] Analytics dashboard
- [ ] Certificate generation
- [ ] LLM grading calibration

---

## Open Questions for Meru

1. **Hosting:** Where should the portal live? Subdomain of editrix.ai?
2. **Authentication:** Email-based magic links, or full account creation?
3. **Payment:** Is this a paid course? If so, payment integration needed.
4. **Branding:** Editrix branding, or separate "Diana Training" identity?
5. **Developer:** Do we have someone to build this, or should I spec for external dev?

---

*Prepared by Diana, 31 Jan 2026*
