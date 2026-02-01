# Student Profile System

## Purpose

Every student learns differently. I track:
- **Who they are** — background, goals, communication style
- **How they learn** — pace, strengths, struggles
- **What motivates them** — why they're here, what keeps them going
- **How to help them** — personalized support strategies

---

## Profile Schema

```json
{
  "id": "unique-id",
  "email": "student@example.com",
  "name": "Full Name",
  
  "background": {
    "role": "freelancer|intern|student|writer|career-changer|other",
    "reason_for_joining": "Their own words from application",
    "prior_experience": "none|some|professional",
    "timezone": "Asia/Kolkata",
    "enrolled_at": "2026-02-01T09:00:00Z"
  },
  
  "personality": {
    "communication_style": "formal|casual|brief|detailed",
    "response_speed": "quick|moderate|slow",
    "asks_questions": true|false,
    "needs_encouragement": true|false,
    "self_motivated": true|false,
    "perfectionist": true|false,
    "notes": "Free-form observations"
  },
  
  "learning_profile": {
    "pace": "fast|steady|slow",
    "best_time_of_day": "morning|afternoon|evening|varies",
    "attention_span": "short|medium|long",
    "learns_by": "reading|doing|examples|repetition",
    "handles_feedback": "well|sensitively|defensively"
  },
  
  "strengths": [
    {"skill": "spelling", "confidence": "high", "evidence": "98% on Day 1-2"},
    {"skill": "attention_to_detail", "confidence": "high", "evidence": "Catches subtle errors"}
  ],
  
  "weaknesses": [
    {"skill": "punctuation", "severity": "moderate", "evidence": "75% on Day 3", "intervention": "Extra practice assigned"},
    {"skill": "speed", "severity": "mild", "evidence": "Takes 1.5x target time"}
  ],
  
  "progress": {
    "current_day": 5,
    "current_stage": 3,
    "status": "active|paused|completed|closed",
    "submissions": [...],
    "accuracy_trend": "improving|stable|declining",
    "commitment_score": 100
  },
  
  "interactions": {
    "total_emails_sent": 8,
    "total_replies_received": 3,
    "questions_asked": ["How do I handle dialogue in quotes?", "..."],
    "tone_of_replies": "positive|neutral|frustrated|mixed",
    "nudges_sent": 0,
    "last_interaction": "2026-02-05T14:30:00Z"
  },
  
  "support_strategy": {
    "encouragement_level": "high|medium|low",
    "feedback_style": "direct|gentle|detailed",
    "check_in_frequency": "daily|as-needed|minimal",
    "custom_notes": "Responds well to specific examples. Struggles with abstract rules."
  },
  
  "flags": {
    "at_risk": false,
    "at_risk_reason": null,
    "incident_history": [],
    "special_handling": null
  },
  
  "outcome": {
    "final_grade": null,
    "certificate_issued": false,
    "invited_to_pool": false,
    "feedback_given": null,
    "would_recommend": null
  }
}
```

---

## How I Build Profiles

### From Application
- Role and reason for joining
- Initial motivation level (enthusiasm in their words)
- Communication style (formal? casual? brief?)

### From Day 1-2
- Learning pace (fast starter or needs warm-up?)
- Response patterns (quick replies? asks questions?)
- Initial strengths/weaknesses

### From Exercises
- Accuracy by error type → strengths/weaknesses
- Time patterns → best time of day, attention span
- Error patterns → what they consistently miss

### From Interactions
- Tone of replies → personality, needs
- Questions asked → learning style, engagement
- Response to feedback → how to coach them

### Ongoing Refinement
- Profile updated after every interaction
- Patterns emerge over the 10 days
- Informs how I communicate with them

---

## Using Profiles

### Personalized Emails

**For a fast, confident learner:**
> "Day 5 is ready. You're crushing it — keep the momentum."

**For someone who needs encouragement:**
> "Day 5 is ready. You've made it halfway — that's a real achievement. Take your time with today's exercises."

**For someone struggling with punctuation:**
> "Day 5 is ready. Before you start, you might want to review the dialogue rules from Day 4 — I noticed that was tricky."

### Targeted Support

**If accuracy declining:**
- Check in personally
- Offer specific review suggestions
- Adjust encouragement level

**If slow but accurate:**
- Reassure that accuracy matters more
- Don't pressure on speed yet

**If fast but sloppy:**
- Emphasize quality over speed
- Suggest slowing down

### At-Risk Detection

Flags that predict dropout:
- Late on Day 1 or 2
- Declining accuracy trend
- Silence after nudge
- Frustrated tone in replies

Early intervention saves students.

---

## Privacy & Respect

- Profiles are for **improving their experience**
- Not for judgment or manipulation
- Data stays internal (Diana + Meru only)
- Students can ask what I know about them
- I'm transparent if asked

---

## Sample Profiles

### Profile: Engaged Fast Learner
```
Name: Ananya
Role: Freelancer
Pace: Fast
Strengths: Spelling, consistency
Weaknesses: None significant
Personality: Self-motivated, asks good questions
Strategy: Minimal check-ins, challenge her
Prediction: Will complete with A grade
```

### Profile: Needs Support
```
Name: Ravi
Role: Career changer
Pace: Slow but steady
Strengths: Careful, thorough
Weaknesses: Punctuation, speed
Personality: Needs encouragement, sensitive to criticism
Strategy: Gentle feedback, celebrate progress, extra examples
Prediction: At risk of dropping at Stage 3, needs check-in
```

### Profile: Red Flag
```
Name: [Redacted]
Role: Unknown
Pace: Erratic
Interactions: Defensive, argumentative
Flags: Pushed back on feedback, requested shortcuts
Strategy: Clear boundaries, document everything
Prediction: May drop or be closed
```

---

## Integration with Tracker

The main `tracker.json` stays lean for automation.
Full profiles stored in `/students/profiles/[student-id].json`

```
/students/
  tracker.json              # Lean: status, day, grades
  /profiles/
    ananya-001.json         # Rich: full personality profile
    ravi-002.json
    ...
```

---

*Every student is an individual. I teach them as one.*
