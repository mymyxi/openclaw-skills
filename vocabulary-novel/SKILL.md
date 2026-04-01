---
name: vocabulary-novel
description: Generate English vocabulary learning novels with natural word integration. Supports IELTS, CET-4/6, TOEFL, and other vocabulary sets. Words are embedded in story context with Chinese glosses in parentheses.
---

# Vocabulary Novel Skill

## Overview

This skill generates English vocabulary learning novels that combine:
- **Engaging storylines** (romance, drama, transformation)
- **Natural word integration** (words embedded in context, not forced)
- **Spaced repetition** (each word appears 3-4 times across chapters)
- **Chinese glosses** (word (中文释义) format for quick understanding)

Keep the tone engaging, story-first, with vocabulary learning as a natural byproduct.

## Core Principles

### 1. Story First, Vocabulary Second
- The novel must be enjoyable to read even without studying words
- Vocabulary should enhance understanding, not interrupt flow
- Readers should want to continue reading for the plot

### 2. Natural Word Integration
- Words appear in natural context (emotions, descriptions, dialogue)
- Chinese glosses in parentheses: `nervous（紧张的）`
- No phonetic symbols or example sentences in main text

### 3. Spaced Repetition
- Each new word appears 3-4 times across chapters
- First reappearance: 2-3 chapters after introduction
- Second reappearance: 5-8 chapters after introduction
- Third reappearance: 15-20 chapters after introduction

### 4. Density Guidelines

| Chapter Range | New Words/Chapter | Review Words/Chapter | Total/Chapter |
|--------------|------------------|---------------------|---------------|
| 1-5          | 10               | 5-10                | ~15-20        |
| 6-10         | 15               | 10                  | ~25           |
| 11-20        | 15               | 10                  | ~25           |
| 21-30        | 20               | 10                  | ~30           |
| 31-50        | 20               | 15                  | ~35           |
| 51-100       | 20               | 15                  | ~35           |

## Word Integration Techniques

### ✅ Correct Integration

**1. Emotions/Feelings**
```
我感到一阵 panic（恐慌），手心开始出汗。
心里莫名地 nervous（紧张），不知道会发生什么。
```

**2. Descriptions (Appearance/Environment)**
```
他穿着 elegant（优雅的）黑色西装，气质出众。
房间装饰得 gorgeous（华丽的），像宫殿一样。
```

**3. Actions**
```
我 freeze（僵住）在原地，大脑一片空白。
他 stare（凝视）着我，眼神深邃。
```

**4. Dialogue**
```
"你 calmed（冷静）一点，"他说，"我会 explain（解释）的。"
"我 refuse（拒绝）！"我大声说。
```

### ❌ Incorrect Integration

**1. Forced Stacking**
```
❌ 我感到 nervous（紧张的）、anxious（焦虑的）、scared（害怕的）、
terrified（恐惧的）、panicked（恐慌的）...
[太多单词堆砌，不自然]
```

**2. Breaking Flow**
```
❌ 他走向那个东西（thing，名词，发音/θɪŋ/，意思是"事物"，
例句：This is a thing.），然后...
[括号内容太多，打断阅读]
```

**3. Out-of-Context**
```
❌ 今天天气很好，我决定 learn（学习）一下 computer（电脑）
science（科学）。
[现代词汇出现在豪门总裁文中，违和]
```

## Supported Vocabulary Sets

### Current
- **IELTS Core 100**: High-frequency IELTS words for academic contexts
- **CET-4 Core**: Chinese College English Test Band 4 vocabulary

### Planned
- **CET-6 Core**: Advanced college English vocabulary
- **TOEFL Academic**: TOEFL-specific academic vocabulary
- **GRE/SAT**: Graduate school entrance exam vocabulary
- **Business English**: Professional and workplace vocabulary

## Usage

### For Content Generation

When generating vocabulary novel content:

1. **Load the vocabulary set** from `vocabulary/` directory
2. **Follow the chapter outline** for word assignments
3. **Integrate words naturally** using the techniques above
4. **Track word usage** to ensure proper repetition
5. **Review for flow** - read without focusing on words

### For Learning

Readers should:
1. Read for enjoyment first
2. Notice words in context naturally
3. Review word list after reading (optional)
4. Re-read chapters for reinforcement

## File Structure

```
vocabulary-novel/
├── SKILL.md                 # This file
├── README.md                # User-facing documentation
├── docs/
│   ├── 写作规范.md          # Writing guidelines
│   ├── 词库说明.md          # Vocabulary set documentation
│   └── 示例章节.md          # Sample chapters
├── vocabulary/
│   ├── IELTS_core_100.md    # IELTS core 100 words
│   └── CET4_core.md         # CET-4 core words (planned)
├── examples/
│   └── chapter_1_sample.md  # Example chapter
└── scripts/
    └── generate_chapter.py  # Chapter generation script (planned)
```

## Project Background

This skill was created to make vocabulary learning more enjoyable and effective. Traditional vocabulary memorization is:
- ❌ Boring and repetitive
- ❌ Lacks context
- ❌ Easy to forget

Vocabulary novels provide:
- ✅ Engaging storylines that motivate continued reading
- ✅ Natural context that aids memory
- ✅ Spaced repetition built into the narrative
- ✅ Emotional connection to words

## Multi-Agent Collaboration

This skill supports collaboration between multiple AI agents:

- **金毛管家 (Golden Retriever)**: Planning, coordination, quality control
- **小白 (Bai Xiao)**: Content generation, research
- **狸狸 (Li Li)**: Local operations, privacy-sensitive tasks

Each agent follows the same writing guidelines to maintain consistency.

## Version History

- **v1.0** (2026-03-20): Initial release with IELTS Core 100 and writing guidelines
- **v1.1** (2026-04-01): GitHub publication with expanded documentation
