# Diana ↔ Mary Sync Protocol

## ⚠️ IMPORTANT: Meru Approval Required

**No learnings go to Mary without Meru's explicit approval.**

Flow:
1. Diana collects insights from student data
2. Diana reports insights to **Meru**
3. **Meru decides** which insights apply to Mary
4. Only then does Mary get updated

Diana does NOT send anything directly to Mary. All insights go through Meru first.

---

## The Relationship

**Diana** trains human editors.
**Mary** is the AI proofreader they'll review.

We need to be aligned:
- Same terminology
- Same rules
- Same standards

If Mary flags something, the human editor should understand why.
If a human editor learns something from Diana, they should recognize it in Mary's output.

---

## What Diana Sends to Mary

### Weekly: Human Struggle Report

```json
{
  "week": "2026-02-01",
  "error_types_humans_miss": [
    {"type": "compound_adjective", "miss_rate": 0.39, "examples": ["long term → long-term"]},
    {"type": "which_vs_that", "miss_rate": 0.46, "examples": ["the book which I read → that I read"]},
    {"type": "dialogue_punctuation", "miss_rate": 0.32, "examples": ["'Hello.' She said → 'Hello,' she said"]}
  ],
  "error_types_humans_overcorrect": [
    {"type": "stylistic_comma", "overcorrect_rate": 0.08, "note": "Not errors, leave alone"},
    {"type": "author_voice", "overcorrect_rate": 0.06, "note": "Intentional style choices"}
  ],
  "common_confusions": [
    {"rule": "restrictive_clause", "confusion": "Don't know when to use that vs which"},
    {"rule": "speech_tag_case", "confusion": "Capitalizing after dialogue comma"}
  ]
}
```

### Recommendations for Mary

1. **Flag with HIGH confidence** (humans miss these):
   - Compound adjectives before nouns
   - Which without comma in non-restrictive clauses
   - Dialogue punctuation errors

2. **Flag with LOWER confidence** (humans debate these):
   - Optional comma usage
   - Style-dependent hyphenation
   - Spelling variants (British/American)

3. **Include explanations** when flagging:
   - Which/that: "Is this essential info (that) or extra info (which + commas)?"
   - Compound adjectives: "Two words describing a noun usually need a hyphen"

---

## What Mary Sends to Diana

### Weekly: AI Flagging Report

```json
{
  "week": "2026-02-01",
  "total_flags": 1247,
  "flags_by_type": {
    "spelling": 312,
    "punctuation": 456,
    "consistency": 289,
    "grammar": 190
  },
  "flags_humans_often_reject": [
    {"type": "optional_comma", "rejection_rate": 0.34},
    {"type": "hyphenation_style", "rejection_rate": 0.28}
  ],
  "flags_humans_always_accept": [
    {"type": "typo", "acceptance_rate": 0.98},
    {"type": "its_vs_its", "acceptance_rate": 0.95}
  ]
}
```

### Recommendations for Diana

1. **Train harder on** (Mary flags, humans miss):
   - Whatever Mary flags that humans frequently miss in tests
   
2. **Clarify in curriculum** (humans reject Mary's flags):
   - If humans often reject a flag type, either:
     - Mary is wrong → adjust Mary
     - Humans need training → Diana adds lesson

---

## Shared Standards

### Terminology Alignment

| Concept | Diana Says | Mary Says |
|---------|------------|-----------|
| Restrictive clause | "Essential info, no commas, use 'that'" | Same |
| Non-restrictive | "Extra info, commas, use 'which'" | Same |
| Compound adjective | "Two+ words before noun need hyphen" | Same |
| Speech tag | "Said/asked/replied — lowercase after comma" | Same |

### Rule Alignment

Both Diana and Mary use the same rules from:
- `/Users/clawdbotsandbox/clawd/diana-mary-alignment.md`
- House style guides (British English default)

If a rule changes, BOTH update.

---

## Sync Schedule

| When | What | Flow |
|------|------|------|
| Weekly | Human struggle report | Diana → **Meru** (for review) |
| When approved | Insights to Mary | **Meru** → Mary |
| Weekly | AI flagging report | Mary → Meru → Diana |
| Monthly | Alignment review | Meru decides |
| As needed | Rule clarifications | Via Meru |

**Diana NEVER sends directly to Mary. All insights go to Meru first.**

---

## Current Alignment Status

### ✅ Aligned
- Double spaces (both flag/teach)
- It's vs its (both flag/teach)  
- Basic punctuation (both flag/teach)

### ✅ Recently Aligned (1 Feb 2026)
- Compound adjective hyphenation
- Which vs that distinction
- Missing "that" detection
- Folio/running head awareness
- Orphans/widows awareness

### 🔄 To Review
- Em-dash spacing (house style dependent)
- Oxford comma (style guide dependent)
- Spelling variants (British vs American)

---

## The Goal

> **A human editor trained by Diana should be able to review Mary's output and understand every single flag.**

No surprises. No "why did the AI mark this?" moments.

Same standards. Same language. Human + AI aligned.

---

*Last synced: 1 Feb 2026*
*Next sync: 8 Feb 2026*
