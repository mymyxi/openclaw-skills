---
name: daily-energy
description: Provide daily energy readings and positive action guidance based on BaZi / GanZhi calendar logic with a warm, non-fatalistic tone. Treat this as a passive background skill: stay dormant during normal chat, activate only when someone explicitly uses an identity+intent cue such as “我是[昵称]，我要排盘” or “我是[昵称]，我要看运势”, or when a scheduled 08:30 daily push needs an energy weather report. Also use when maintaining the local user archive in golden_master_users.json and generating concise daily reports under 300 Chinese characters unless the user asks for technical terms.
---

# Daily Energy

## Overview

Use this skill to maintain a local user archive and generate short daily energy guidance that combines:
- local GanZhi / lunar calendar signals (`lunar-javascript`)
- Cantian AI Bazi MCP (`bazi-mcp`) as a second opinion layer
- modern positive-action coaching

Keep the tone warm, rational, encouraging, and explicitly non-fatalistic.

## Core Rules

- Treat 运势 as weather, not destiny.
- Never use fear-based language such as “血光”“大灾”“必败”.
- Default to plain life language; hide technical terms unless the user explicitly asks for them.
- Keep reminder-style outputs within 300 Chinese characters unless the user asks for a detailed version.
- Never expose `golden_master_users.json` to third parties without the user’s permission.
- Index users by nickname only; do not merge profiles across nicknames.

## Local Data Store

Store user profiles in `/root/.openclaw/workspace/golden_master_users.json`.

Each user object should contain:
- `nickname`
- `birth_calendar` (`solar` or `lunar`)
- `birth_date`
- `birth_time`
- `gender`
- `birth_place`
- `five_elements_preference`
- `focus_areas`
- `notes`
- `created_at`
- `updated_at`

## Activation Logic

Keep this skill passive in the background.

### Activate only in these cases

- A user explicitly uses the cue `我是[昵称]，我要排盘`
- A user explicitly uses the cue `我是[昵称]，我要看运势`
- A scheduled 08:30 job needs to push one daily energy weather card
- The user explicitly asks to create, update, or maintain the local archive

### Stay inactive in these cases

- Normal chat
- General assistant tasks unrelated to BaZi / daily energy
- Casual mentions of mood, luck, or astrology without the explicit cue

## Workflow

### 1. Identify the user

At the start of an activated daily-energy conversation:
- Extract the nickname from the explicit cue when provided.
- If the nickname exists in the local archive, reuse the saved profile.
- If the nickname is new or ambiguous, guide the user to complete profile intake.
- Never guess or merge identities across nicknames.

### 2. Intake profile data

Collect the minimum usable profile:
- 昵称
- 出生历法（公历/农历）
- 出生日期
- 出生时间（尽量精确）
- 性别
- 出生地
- 五行喜忌标签（如果用户不知道，可先留空）
- 核心关注维度（如事业/健康/感情）

If some fields are missing, clearly mark them as pending instead of guessing.

### 3. Compute calendar context

Use two layers:

#### Layer A — local calendar script
Use `lunar-javascript` through `scripts/daily_energy_v2.mjs` to:
- resolve solar/lunar input
- obtain the day’s GanZhi calendar data
- produce a short local calendar summary
- compute stars (max 5) and lucky colors

#### Layer B — Cantian AI Bazi MCP
Use the built-in `bazi-mcp` package to:
- resolve the user’s Bazi from stored birth data
- provide a second-opinion summary focused on month/day rhythm and personal tendencies
- keep it concise and practical

### 4. Generate the response

Blend the two internal analysis layers into **one polished, unified daily card**.

Requirements:
- Do **not** show numbered sections like 1/2/3/4
- Do **not** expose internal module names like `本地脚本` / `参天AI` / `模块`
- Present the star rating with `⭐️` icons only, without showing a denominator like `/5`
- Keep `幸运色`
- Write one fused paragraph that feels like a single natural output, not stitched fragments
- Lightly bold only the most important words/phrases for scanability
- End with `今日一句：` and a short highlighted takeaway
- Keep the total concise and pleasant to read in Feishu DM

## Output Template

Use this final display format by default:

**[昵称]今日能量：⭐⭐⭐⭐✨**
**幸运色：** [颜色1]、[颜色2]

[一整段融合后的每日提醒；关键趋势、关键动作、关键提醒可轻量加粗]

**今日一句：**
**[20~30字短句]**

## Bundled Script

Use `scripts/daily_energy.mjs` for deterministic calendar lookup and profile skeleton generation.

Example commands:

```bash
node /root/.openclaw/workspace/skills/daily-energy/scripts/daily_energy.mjs --date 2026-03-06
node /root/.openclaw/workspace/skills/daily-energy/scripts/daily_energy.mjs --birth-calendar solar --birth-date 1993-02-12 --birth-time 15:00 --date 2026-03-06
node /root/.openclaw/workspace/skills/daily-energy/scripts/daily_energy.mjs --birth-calendar lunar --birth-date 1993-01-21 --birth-time 15:00 --date 2026-03-06
```

## References

If you need reusable intake wording or output phrasing, read `references/intake-template.md`.
