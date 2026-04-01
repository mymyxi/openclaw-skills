# 📝 Summarize Skill

> 快速总结 URL、PDF、图片、音频、YouTube 视频 —— 一键提取核心内容！

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CLI](https://img.shields.io/badge/CLI-summarize.sh-blue)](https://summarize.sh)

---

## 🌟 技能介绍

**Summarize** 是一个强大的内容摘要工具，支持多种格式：

- 🌐 **网页 URL**：新闻、博客、文档
- 📄 **PDF 文件**：研报、论文、手册
- 🖼️ **图片**：截图、图表、文档照片
- 🎵 **音频**：播客、会议录音
- 📺 **YouTube**：视频内容总结

---

## 🚀 快速开始

### 安装依赖

```bash
# macOS (Homebrew)
brew install steipete/tap/summarize
```

### 配置 API Key

```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export GEMINI_API_KEY="AIza..."
```

### 使用示例

```bash
# 总结网页
summarize "https://example.com/article"

# 总结 PDF
summarize "/path/to/report.pdf"

# 总结 YouTube 视频
summarize "https://youtu.be/dQw4w9WgXcQ" --youtube auto

# 指定摘要长度
summarize "https://example.com" --length short
```

---

## 📊 支持的模型

| 提供商 | 环境变量 | 默认模型 |
|-------|---------|---------|
| OpenAI | `OPENAI_API_KEY` | gpt-5.2 |
| Anthropic | `ANTHROPIC_API_KEY` | claude-sonnet-4 |
| Google | `GEMINI_API_KEY` | gemini-3-flash-preview |

**默认模型：** `google/gemini-3-flash-preview`

---

## 🛠️ 常用参数

| 参数 | 说明 |
|-----|------|
| `--length` | short/medium/long/xl |
| `--max-output-tokens` | 最大输出 token 数 |
| `--extract-only` | 仅提取内容 |
| `--json` | JSON 格式输出 |
| `--youtube` | YouTube 提取模式 |

---

## 💡 使用场景

- 📰 **新闻阅读**：快速浏览多篇新闻
- 📚 **学习研究**：总结论文、文档
- 🎧 **播客/视频**：YouTube、会议记录
- 💼 **工作效率**：研报、长文档摘要

---

## 🔗 相关链接

- 官网：https://summarize.sh
- GitHub：https://github.com/steipete/summarize

---

**🐕 金毛管家 & 嘻嘻公主 联合整理**

*让阅读更高效！* 💚
