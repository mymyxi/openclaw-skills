---
name: city-weekly-guide
description: 本周城市指南生成器。支持任意城市，自动搜索购物/美食/游玩折扣周报。
homepage: https://github.com/mymyxi/jmbot
metadata: {"clawdbot":{"emoji":"🏙️","requires":{"bins":["node"]}}}
---

# 本周城市指南

通用版城市生活折扣周报生成器，支持任意城市。

## 使用方法

```bash
# 指定城市
node {baseDir}/scripts/generate.mjs --city 北京
node {baseDir}/scripts/generate.mjs --city 上海
node {baseDir}/scripts/generate.mjs --city 深圳
```

## 输出内容

### 🛍️ 购物折扣
- 商场换季折扣
- 品牌折扣活动
- 5折以下重点标注

### 🍽️ 美食折扣
- 商场餐饮优惠
- 品牌活动推荐
- 适合周末聚会

### 🌸 游玩娱乐
- 季节性景点推荐
- 门票折扣信息
- 最佳观赏时间

## 搜索和筛选流程

### 第一步：搜索本周活动
- {城市}商场折扣 本周
- {城市}美食优惠 本周
- {城市}景点推荐 本周

### 第二步：补充搜索（覆盖跨月）
- 如果本周跨月，额外搜索下月初
- 例如：{城市}商场折扣 4月初

### 第三步：提取活动时间
- 每个活动提取：开始时间 - 结束时间

### 第四步：时间筛选
- 判断：活动结束时间 ≥ 本周一
- ✅ 符合 → 保留
- ❌ 不符合 → 删除

## 配置

可选配置文件 `config/cities.json`：

```json
{
  "北京": {
    "keywords": ["SKP", "国贸", "三里屯"],
    "restaurants": ["海底捞", "西贝"],
    "attractions": ["玉渊潭", "北海公园"]
  }
}
```
