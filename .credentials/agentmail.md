# AgentMail Credentials — Diana

**Email:** diana-editrix@agentmail.to
**API Token:** am_2fea3ecd02ddffd16c59550b1276b65781fa1dc792f718a68e7ca884d2cf4624

**Send endpoint:**
```
POST https://api.agentmail.to/v0/inboxes/diana-editrix@agentmail.to/messages
```

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Body:**
```json
{
  "to": ["recipient@example.com"],
  "subject": "Subject line",
  "text": "Plain text body"
}
```

---

*Keep this file secure. Do not commit to public repos.*
