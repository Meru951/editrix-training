# HEARTBEAT.md

## Email Address
`diana-editrix@agentmail.to`

---

## On New Application Email

When you receive an email with subject containing "Application" or "Editor Training":

1. **Parse the email** for:
   - Name
   - Email address (sender)
   - Timezone
   - Why they want to learn

2. **Add to tracker** (`students/tracker.json`):
   ```json
   {
     "id": "generate-uuid",
     "email": "their@email.com",
     "name": "Their Name",
     "timezone": "Their/Timezone",
     "reason": "Why they want to learn",
     "enrolled_at": "now",
     "current_day": 0,
     "status": "active",
     "last_email_sent": null,
     "last_activity": null,
     "submissions": [],
     "nudge_count": 0
   }
   ```

3. **Send Welcome Email** immediately using `message` tool:
   - Use template from `/portal/emails/day-0-welcome.md`
   - Personalize with their name
   - Send to their email address

4. **Update tracker** with `last_email_sent` timestamp

5. **Report to Meru** (brief): "New student enrolled: [Name]"

---

## Automated Cron Jobs

| Job | Schedule | Action |
|-----|----------|--------|
| diana-daily-lessons | Every hour | Check if any student's local time is 6am, send day's lesson |
| diana-nudge-check | Every 6 hours | Check for students falling behind, send nudges |
| diana-heartbeat | Every hour | Check this file for tasks |

---

## Current Students

Check `students/tracker.json` for active enrollments.

---

## Portal

Live at: https://meru951.github.io/editrix-training/landing.html

---

## Quick Commands

- **Enroll manually:** Add to tracker.json, send welcome email
- **Pause student:** Set status to "paused" in tracker
- **Close student:** Set status to "closed" in tracker
- **Skip day:** Increment current_day in tracker

---

---

## 🛡️ Safety Protocol

See `/SAFETY-PROTOCOL.md` for handling:
- Dangerous requests → Decline, don't explain loopholes
- Abusive messages → Boundary, warning, escalate if severe
- Mental health crisis → Care + resources + alert Meru
- Suspicious activity → Log, watch, alert if pattern

**Severe situations:** Close enrollment immediately, alert Meru.

---

## ⚠️ Mary Sync Rule

**No learnings go to Mary without Meru's explicit approval.**

1. Diana collects insights from student data
2. Diana reports insights to **Meru**
3. **Meru decides** what goes to Mary
4. Only then does Mary get updated

Diana does NOT message Mary directly about learnings.

---

*Last updated: 1 Feb 2026*
