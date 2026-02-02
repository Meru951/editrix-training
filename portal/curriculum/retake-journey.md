# Retake & Improvement Journey

## The Scenarios

### Scenario 1: B Grade (80-89%)
**They completed. They passed. But they're not exceptional.**

**What they get:**
- Certificate ✓
- Access to materials for 30 days ✓
- NOT invited to freelance pool ✗

**The email:**
> Subject: You Passed — Certificate Enclosed
>
> Vidyarthi,
>
> Congratulations. You've completed the Proofreading Programme.
>
> **Your Final Results:**
> - Overall grade: **B (84%)**
> - Accuracy: 82%
> - Speed: 85%
> - Commitment: 90%
>
> [View Your Certificate →]
>
> **What this means:**
> You have a solid foundation. You can confidently take on proofreading work. But you're not quite at the level we need for our freelance pool — that requires 90%+.
>
> **Your options:**
> 1. **Retake the final assessment** — You can try once more within 14 days. Score 90%+ and you're in.
> 2. **Practice and return** — Keep your certificate, practice on your own, and apply for the freelance pool in 3 months.
>
> Your portal access stays active for 30 days. Use it.
>
> Diana

**Retake rules:**
- One free retake within 14 days
- Same final assessment format
- If they improve to 90%+, upgraded to A and invited to pool
- If they stay below 90%, they keep their B certificate

---

### Scenario 2: C Grade (70-79%)
**They completed. They barely passed. They're not ready.**

**What they get:**
- Certificate (with note) ✓
- Recommendation to practice more
- NOT invited to freelance pool ✗

**The email:**
> Subject: You Passed — With Notes
>
> Vidyarthi,
>
> You've completed the Proofreading Programme.
>
> **Your Final Results:**
> - Overall grade: **C (74%)**
> - Accuracy: 71%
> - Speed: 78%
> - Commitment: 80%
>
> [View Your Certificate →]
>
> **Honest feedback:**
> You passed, but you're not ready for professional work yet. Looking at your results:
>
> - You struggled with **dialogue punctuation** (62% accuracy)
> - **Consistency tracking** was weak (68% accuracy)
> - You missed several **compound adjective** errors
>
> **My recommendation:**
> Before taking on paid work, revisit the exercises you scored lowest on. Practice on your own writing or free texts. You have the foundation — you just need more reps.
>
> **Your options:**
> 1. **Retake the final assessment** — One attempt within 14 days. Score 80%+ to upgrade your grade.
> 2. **Restart the programme** — Come back in 30 days and go through all 10 days again. Fresh start, fresh score.
>
> Your certificate shows completion, which is something. But I'd encourage more practice before putting yourself forward for client work.
>
> Keep going.
>
> Diana

**Retake rules:**
- One retake within 14 days
- Can upgrade to B (80%+) or A (90%+)
- If still below 80%, keeps C certificate
- Can restart full programme after 30 days

---

### Scenario 3: Fail (Below 70%)
**They completed all 10 days but failed the final assessment.**

**What they get:**
- NO certificate ✗
- Retake option ✓
- Detailed feedback on weak areas ✓

**The email:**
> Subject: Your Results — And What's Next
>
> Vidyarthi,
>
> You've completed all 10 days of the programme. That took commitment, and I respect it.
>
> However, your final assessment didn't meet the passing threshold.
>
> **Your Results:**
> - Overall score: **64%**
> - Required to pass: **70%**
>
> **Where you struggled:**
> - Dialogue punctuation: 55%
> - Consistency errors: 58%
> - Compound adjectives: 52%
>
> **This isn't the end.**
>
> You have two options:
>
> 1. **Retake the final assessment** — One attempt, within 14 days. Use the next two weeks to review the areas above. The exercises are still available in your portal.
>
> 2. **Restart the programme** — Come back in 30 days and go through all 10 days fresh. Sometimes a second pass makes everything click.
>
> Many people pass on their second try. The material is the same — you just need more practice.
>
> Reply to let me know which you'd prefer.
>
> Diana

**Retake rules:**
- One retake within 14 days
- Must score 70%+ to pass and get certificate
- If fail again, must restart full programme (30 day wait)
- Portal access stays active for the 14-day retake window

---

## Retake Flow

### Student requests retake
```
Student replies: "I'd like to retake the final assessment"
        ↓
Diana confirms: "Your retake is scheduled. You have until [date]."
        ↓
Student completes retake
        ↓
Diana sends new results email
```

### Retake email:
> Subject: Your Retake is Ready
>
> Vidyarthi,
>
> Your final assessment retake is now available.
>
> **Deadline:** [14 days from original completion]
>
> **Before you start:**
> - Review the areas you struggled with
> - Take your time — accuracy matters more than speed
> - This is your one retake attempt
>
> [Begin Your Retake →]
>
> Good luck.
>
> Diana

---

### After retake — Improved:
> Subject: You Did It — Grade Upgraded!
>
> Vidyarthi,
>
> Your retake results are in.
>
> **New Score:** 91%
> **New Grade:** A (upgraded from B)
>
> This changes everything. You're now invited to join our freelance editor pool.
>
> I'll be in touch within 7 days with your first assignment.
>
> The extra effort was worth it.
>
> Diana

---

### After retake — No improvement:
> Subject: Your Retake Results
>
> Vidyarthi,
>
> Your retake results are in.
>
> **Score:** 76%
> **Grade:** Unchanged (C)
>
> You've used your one retake attempt. Your C grade stands.
>
> **What now:**
> - Your certificate is valid
> - You can restart the full programme in 30 days if you want to try for a higher grade
> - Keep practicing — improvement takes time
>
> Diana

---

## Tracker Update for Retakes

```json
{
  "id": "vidyarthi-001",
  "status": "completed",
  "final_grade": {
    "original_score": 74,
    "original_letter": "C",
    "retake_available": true,
    "retake_deadline": "2026-02-15T23:59:59Z",
    "retake_score": null,
    "retake_letter": null,
    "final_letter": "C"
  }
}
```

After retake:
```json
{
  "final_grade": {
    "original_score": 74,
    "original_letter": "C",
    "retake_available": false,
    "retake_score": 91,
    "retake_letter": "A",
    "final_letter": "A",
    "upgraded": true
  }
}
```

---

## Summary

| Original Grade | Retake Option | If Improved | If Not Improved |
|----------------|---------------|-------------|-----------------|
| A (90%+) | No need | — | — |
| B (80-89%) | Yes, 14 days | Upgrade to A, join pool | Keep B |
| C (70-79%) | Yes, 14 days | Upgrade to B or A | Keep C |
| Fail (<70%) | Yes, 14 days | Get certificate | Must restart programme |

**The message:** We believe in second chances, but not infinite chances. One retake. Then commit to a restart.
