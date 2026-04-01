#!/usr/bin/env node
import { Solar, Lunar } from 'lunar-javascript';
import { getBaziDetail } from '/root/.npm/_npx/6c6c93aa84f1c2cf/node_modules/bazi-mcp/dist/index.js';
import fs from 'fs';

const args = process.argv.slice(2);
const getArg = (name) => {
  const exact = args.find(a => a.startsWith(`--${name}=`));
  return exact ? exact.split('=').slice(1).join('=') : undefined;
};

const dateArg = getArg('date');
const birthCalendar = getArg('birth-calendar');
const birthDate = getArg('birth-date');
const birthTime = getArg('birth-time') || '00:00';
const genderArg = getArg('gender') || 'female';
const nickname = getArg('nickname') || '你';

function parseYmd(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { y, m, d };
}
function parseHm(timeStr) {
  const [h = '0', m = '0'] = timeStr.split(':');
  return { h: Number(h), m: Number(m) };
}
function buildTargetSolar(dateStr) {
  if (!dateStr) {
    const now = new Date();
    return Solar.fromYmd(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
  }
  const { y, m, d } = parseYmd(dateStr);
  return Solar.fromYmd(y, m, d);
}
function buildBirthSolar(calendar, dateStr, timeStr) {
  if (!calendar || !dateStr) return null;
  const { h, m } = parseHm(timeStr);
  if (calendar === 'solar') {
    const { y, m: mm, d } = parseYmd(dateStr);
    return Solar.fromYmdHms(y, mm, d, h, m, 0);
  }
  if (calendar === 'lunar') {
    const { y, m: mm, d } = parseYmd(dateStr);
    const lunar = Lunar.fromYmdHms(y, mm, d, h, m, 0);
    return lunar.getSolar();
  }
  throw new Error('birth-calendar must be solar or lunar');
}

function calcStars(targetLunar) {
  // 基础分 3.0
  let score = 3.0;
  const yi = targetLunar.getDayYi()?.length || 0;
  const ji = targetLunar.getDayJi()?.length || 0;
  // 宜忌差值决定基础波动（宜 - 忌），范围约 -10 到 +15
  const diff = yi - ji;
  score += diff * 0.15;
  // 日干支五行影响（加大权重）
  const dayGz = targetLunar.getDayInGanZhi();
  if (/[甲乙]/.test(dayGz)) score += 0.5;
  if (/[寅卯]/.test(dayGz)) score += 0.4;
  if (/[庚辛]/.test(dayGz)) score -= 0.4;
  if (/[申酉]/.test(dayGz)) score -= 0.5;
  if (/[壬癸]/.test(dayGz)) score += 0.3;
  if (/[子亥]/.test(dayGz)) score += 0.3;
  if (/[丙丁]/.test(dayGz)) score += 0.2;
  if (/[巳午]/.test(dayGz)) score += 0.2;
  if (/[戊己]/.test(dayGz)) score -= 0.2;
  if (/[辰戌丑未]/.test(dayGz)) score -= 0.2;
  // 限制在 1.0-5.0 之间，实现真实波动
  score = Math.max(1.0, Math.min(5.0, score));
  return Math.round(score * 10) / 10;
}

function pickColors(targetLunar) {
  const dayGz = targetLunar.getDayInGanZhi();
  const colors = [];
  if (/[甲乙寅卯]/.test(dayGz)) colors.push('淡绿色', '青色');
  if (/[丙丁巳午]/.test(dayGz)) colors.push('浅粉', '暖橘');
  if (/[戊己辰戌丑未]/.test(dayGz)) colors.push('米白', '奶咖');
  if (/[庚辛申酉]/.test(dayGz)) colors.push('浅金', '银灰');
  if (/[壬癸子亥]/.test(dayGz)) colors.push('雾蓝', '浅灰蓝');
  const dedup = [...new Set(colors)];
  return dedup.slice(0, 2).length ? dedup.slice(0, 2) : ['米白', '浅金'];
}

function buildLocalSummary(targetLunar) {
  const yi = targetLunar.getDayYi() || [];
  const ji = targetLunar.getDayJi() || [];
  const tags = [];
  if (yi.some(x => ['会亲友', '立券', '入学', '出行'].includes(x))) tags.push('适合沟通推进');
  if (yi.some(x => ['拆卸', '安机械', '经络'].includes(x))) tags.push('适合整理修补');
  if (ji.some(x => ['作灶', '伐木', '盖屋'].includes(x))) tags.push('不宜临时硬开新坑');
  if (!tags.length) tags.push('适合稳住节奏做重点事');
  let text = `本地历法看，今天${tags.join('，')}。先收拢零散想法，完成一件最重要的小事，会更顺。`;
  return text.slice(0, 98);
}

function buildCantianSummary(birth) {
  if (!birth) return '参天八字模块未接入出生资料，暂无法输出。';
  const pillars = birth.八字 || '';
  const dm = birth.日主 || '';
  const hasWaterWood = /(甲|乙|壬|癸|寅|卯|子|亥)/.test(pillars);
  const hasChong = JSON.stringify(birth.刑冲合会 || {}).includes('冲');
  let text = `参天八字看，你属于${dm}日主，近期更适合整理表达、持续推进。`;
  if (hasWaterWood) text += '本月灵感和梳理力较强，适合内容、复盘、沟通。';
  if (hasChong) text += '但也要防分心，别同时铺太多线。';
  return text.slice(0, 98);
}

function buildConclusion(stars) {
  if (stars >= 4.4) return '今天适合稳稳发力，先做重点。';
  if (stars >= 3.8) return '先收主线，再推进细节最顺。';
  return '节奏放慢一点，比硬冲更有利。';
}

async function main() {
  const targetSolar = buildTargetSolar(dateArg);
  const targetLunar = targetSolar.getLunar();
  const birthSolar = buildBirthSolar(birthCalendar, birthDate, birthTime);

  let baziBirth = null;
  if (birthSolar) {
    const iso = `${birthSolar.getYear()}-${String(birthSolar.getMonth()).padStart(2, '0')}-${String(birthSolar.getDay()).padStart(2, '0')}T${String(birthSolar.getHour()).padStart(2, '0')}:${String(birthSolar.getMinute()).padStart(2, '0')}:00+08:00`;
    baziBirth = await getBaziDetail({
      solarDatetime: iso,
      gender: genderArg === 'female' ? 0 : 1,
      eightCharProviderSect: 2
    });
  }

  const stars = calcStars(targetLunar);
  const colors = pickColors(targetLunar);
  const localSummary = buildLocalSummary(targetLunar);
  const cantianSummary = buildCantianSummary(baziBirth);
  const conclusion = buildConclusion(stars);

  const output = {
    nickname,
    date: targetSolar.toYmd(),
    ganzhi: `${targetLunar.getYearInGanZhi()}年 ${targetLunar.getMonthInGanZhi()}月 ${targetLunar.getDayInGanZhi()}日`,
    stars,
    colors,
    localSummary,
    cantianSummary,
    conclusion,
    birth: baziBirth ? {
      solar: baziBirth['阳历'],
      lunar: baziBirth['农历'],
      bazi: baziBirth['八字'],
      dayMaster: baziBirth['日主']
    } : null
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
