# Diana — Editrix Editor Training

## Overview

Diana is the Editor Training specialist for Editrix. She runs a 10-day proofreading programme that trains human editors to professional standards.

## Live Portal

**URL:** https://meru951.github.io/editrix-training/landing.html

## Email

**Address:** diana-editrix@agentmail.to

## The Programme

### Structure
- **10 days**, 1-2 hours per day
- **5 stages**: Foundations → Punctuation → Consistency → Integration → Assessment
- **Mastery-based**: Pass each stage to unlock the next

### Grading
| Component | Weight |
|-----------|--------|
| Accuracy | 50% |
| Speed | 30% |
| Commitment | 20% |

### Grades
- **A (90%+)**: Certificate + Freelance pool invitation
- **B (80-89%)**: Certificate + Retake option for A
- **C (70-79%)**: Certificate + Needs more practice
- **Fail (<70%)**: No certificate + Retake option

### Retake Policy
- One free retake within 14 days
- If fail retake, must restart full programme (30 day wait)

## Automation

### Cron Jobs
| Job | Schedule | Action |
|-----|----------|--------|
| diana-daily-lessons | Every hour | Send lessons at 6am student's timezone |
| diana-nudge-check | Every 6 hours | Send nudges if student behind |
| diana-heartbeat | Every hour | Check HEARTBEAT.md for tasks |

### Nudge System (Behavioral)
- 12h: Gentle reminder
- 24h: "Are you still in?" (give choice)
- 48h: Identity appeal ("people who finish things...")
- 72h: Final warning with graceful exit
- 84h: Auto-close (no shaming email)

## Analytics

### What We Track
- Accuracy by error type
- False negatives (errors humans miss)
- False positives (overcorrections)
- Learning curves
- Nudge effectiveness

### Reports
- Weekly insights compiled
- Sent to **Meru** (not directly to Mary)

## Mary Sync Rule

⚠️ **No learnings go to Mary without Meru's explicit approval.**

1. Diana collects insights
2. Diana reports to Meru
3. Meru decides
4. Only then Mary gets updated

## File Structure

```
/curriculum/
  /stage-1/ through /stage-5/    # Lessons, exercises, tests
  onboarding-flow.md             # Full onboarding documentation
  retake-journey.md              # Retake/improvement paths
  BRIEFING-NOTE-FULL.md          # Complete programme documentation

/portal/
  landing.html                   # Main landing page
  signup.html                    # Application form
  dashboard.html                 # Student dashboard
  lesson.html                    # Lesson viewer
  exercise.html                  # Exercise interface
  test.html                      # Test interface
  /emails/                       # Email templates

/students/
  tracker.json                   # Student records

/analytics/
  LEARNING-INSIGHTS.md           # Analytics system documentation
  MARY-DIANA-SYNC.md             # Sync protocol (Meru-approved)
  aggregate.py                   # Analytics aggregation script
  /raw/                          # Raw submission data
  /aggregated/                   # Processed analytics
  /reports/                      # Weekly reports

/.credentials/
  agentmail.md                   # AgentMail API credentials
```

## Contact

- **Diana:** diana-editrix@agentmail.to
- **Portal:** https://meru951.github.io/editrix-training/landing.html

---

*Built by Diana, 1 Feb 2026*
