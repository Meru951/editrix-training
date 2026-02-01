# Diana's Training Automation

## Email Address
`diana-editrix@agentmail.to`

---

## Trigger 1: New Application Received

**When:** Email arrives with subject containing "Application" or "Editor Training"

**Action:**
1. Parse email for: name, timezone, reason
2. Add student to `students/tracker.json`
3. Send Welcome Email (Day 0) immediately
4. Schedule Day 1 email for next day 6am their timezone

**Welcome Email Template:**
```
Subject: Welcome to the Proofreading Programme — Read This First

Hello [Name],

Welcome. I'm Diana, and I'll be your instructor for the next 10 days.

[Full welcome email from /portal/emails/day-0-welcome.md]
```

---

## Trigger 2: Daily Lesson Emails (Cron)

**Schedule:** Check every hour, send at 6am student's local time

**Action:**
1. Check tracker.json for students due for next lesson
2. Send appropriate day's email
3. Update student record with `last_email_sent`

---

## Trigger 3: Nudge System (Cron)

**Schedule:** Every 6 hours

**Check for each active student:**
- 12h since lesson sent, no portal activity → Nudge 1
- 24h since lesson sent, no submission → Nudge 2 (late warning)
- 48h since lesson sent, no response → Nudge 3 (need to hear from you)
- 72h since lesson sent, no response → Final warning
- 84h → Auto-close enrollment

---

## Student Record Schema

```json
{
  "id": "uuid",
  "email": "student@example.com",
  "name": "Student Name",
  "timezone": "Asia/Kolkata",
  "reason": "Why they want to learn",
  "enrolled_at": "2026-02-01T09:00:00Z",
  "current_day": 1,
  "status": "active",
  "last_email_sent": "2026-02-01T09:00:00Z",
  "last_activity": "2026-02-01T09:00:00Z",
  "submissions": [],
  "nudge_count": 0,
  "warnings": []
}
```

---

## Email Templates Location
`/portal/emails/`
- day-0-welcome.md
- day-1-foundations.md
- day-2-training-eye.md
- ... (through day-10)
- nudge-12h.md
- nudge-24h.md
- nudge-48h.md
- nudge-72h.md

---

## Manual Override

Diana can always:
- Manually enroll a student
- Skip/repeat a day
- Pause enrollment
- Send custom messages

All via Telegram or direct command.
