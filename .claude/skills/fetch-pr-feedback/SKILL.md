---
name: fetch-pr-feedback
description: Use when the user asks what issues need to be fixed on the current PR, lists PR review feedback, or asks "PR 上有哪些問題", "取得 PR feedback", "條列需要修正的問題", "what do I need to fix". Fetches and organizes all reviewer comments into actionable categories.
---

# Fetch PR Feedback

## Overview

Fetches all review comments from the current branch's GitHub PR and organizes them into actionable categories: confirmed fixes, items needing evaluation, and already-resolved items.

---

## Steps

### 1. Find the PR number

```bash
gh pr list --head $(git branch --show-current) --json number,title,url
```

### 2. Fetch PR-level reviews and comments

```bash
gh pr view <number> --json reviews,comments
```

Parse with Python to extract non-bot, non-CI text:

```bash
gh pr view <number> --json reviews,comments | python3 -c "
import json, sys
data = json.load(sys.stdin)
for r in data.get('reviews', []):
    if r.get('body'):
        print(f\"[{r['author']['login']}] ({r['state']}): {r['body']}\")
for c in data.get('comments', []):
    skip_authors = {'github-actions', 'sonarqubecloud'}
    if c['author']['login'] not in skip_authors:
        print(f\"[{c['author']['login']}]: {c['body']}\")
"
```

### 3. Fetch inline review comments

```bash
gh api repos/<owner>/<repo>/pulls/<number>/comments | python3 -c "
import json, sys
comments = json.load(sys.stdin)
for c in comments:
    print(f\"[{c['user']['login']}] @ {c['path']}:{c.get('line','?')}\")
    print(c['body'])
    print('---')
"
```

To find `<owner>/<repo>`:
```bash
gh repo view --json nameWithOwner -q .nameWithOwner
```

---

## Output Format

Organize results into these sections:

### 人工 Reviewer（必須修正）
List each human reviewer comment with:
- Reviewer name
- File + line if inline
- Clear description of the issue
- Note if author already replied resolving it

### AI Reviewer（需評估是否修正）
List AI reviewer suggestions (gemini-code-assist, Easonliu841116 AI Review, etc.) with:
- Confidence level if provided
- Whether it's confirmed by cross-validation
- Technical reasoning if pushback is warranted

### 已確認不需修正
List items the PR author has already replied to with a resolution.

---

## Rules

- **Skip bot-only comments**: github-actions coverage reports, sonarqubecloud, deployment notifications
- **Human reviewers take priority** over AI reviewers
- **Author responses** in comment threads count as resolved — don't list them as open issues
- **NIT items** should be clearly marked as NIT (non-blocking)
- If an inline comment thread has a reply from the PR author confirming the issue won't happen, mark it resolved

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Including CI/coverage bot noise | Skip `github-actions` and `sonarqubecloud` authors |
| Missing inline comments | Must call `/pulls/<number>/comments` API separately from `gh pr view` |
| Treating AI suggestions as mandatory | Flag them as "需評估" — verify against codebase before implementing |
| Listing already-resolved items as open | Check for author reply threads before listing |
