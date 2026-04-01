#!/usr/bin/env node
import { Solar, Lunar } from 'lunar-javascript';

const args = process.argv.slice(2);
const getArg = (name) => {
  const exact = args.find(a => a.startsWith(`--${name}=`));
  return exact ? exact.split('=').slice(1).join('=') : undefined;
};

const dateArg = getArg('date');
const birthCalendar = getArg('birth-calendar');
const birthDate = getArg('birth-date');
const birthTime = getArg('birth-time') || '00:00';

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

const targetSolar = buildTargetSolar(dateArg);
const targetLunar = targetSolar.getLunar();

const result = {
  date: {
    solar: targetSolar.toYmd(),
    week: targetSolar.getWeekInChinese(),
    lunar: `${targetLunar.getYearInChinese()}年${targetLunar.getMonthInChinese()}月${targetLunar.getDayInChinese()}`,
    ganzhi: `${targetLunar.getYearInGanZhi()}年 ${targetLunar.getMonthInGanZhi()}月 ${targetLunar.getDayInGanZhi()}日`,
    yi: targetLunar.getDayYi(),
    ji: targetLunar.getDayJi(),
    nayin: targetLunar.getDayNaYin(),
    jieqi: targetLunar.getJieQi() || null
  }
};

const birthSolar = buildBirthSolar(birthCalendar, birthDate, birthTime);
if (birthSolar) {
  const birthLunar = birthSolar.getLunar();
  const ec = birthLunar.getEightChar();
  result.birth = {
    solar: birthSolar.toYmdHms(),
    lunar: `${birthLunar.getYearInChinese()}年${birthLunar.getMonthInChinese()}月${birthLunar.getDayInChinese()}`,
    pillars: {
      year: ec.getYear(),
      month: ec.getMonth(),
      day: ec.getDay(),
      time: ec.getTime()
    },
    nayin: {
      year: ec.getYearNaYin(),
      month: ec.getMonthNaYin(),
      day: ec.getDayNaYin(),
      time: ec.getTimeNaYin()
    }
  };
}

console.log(JSON.stringify(result, null, 2));
