// 용어·단원·개념 정리 본문을 한 번에 찾는 검색 함수.

import { GLOSSARY, type Term } from './glossary';
import { UNITS, type Unit } from './units';
import { getContent, type Level } from './content';

export interface ContentHit {
  unit: Unit;
  level: Level;
  /** 검색어 주변 문장 */
  snippet: string;
  /** 본문에 검색어가 나온 횟수 */
  count: number;
}

export interface SearchResult {
  terms: Term[];
  units: Unit[];
  contents: ContentHit[];
}

// 비교용으로 다듬기: 소문자, 공백 제거 ("세포 호흡" = "세포호흡")
export function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '');
}

// 마크다운 기호를 떼어 내 일반 문장으로
function plain(md: string): string {
  return md
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*|__|`|>\s?/g, '')
    .replace(/\|/g, ' ')
    .replace(/^-{3,}.*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function search(query: string): SearchResult {
  const q = norm(query);
  if (!q) return { terms: [], units: [], contents: [] };

  const terms = GLOSSARY.filter((t) => norm(t.term + (t.en ?? '') + t.def).includes(q));

  const units = UNITS.filter((u) => norm([u.title, u.tagline, ...u.base, ...u.bio1].join(' ')).includes(q));

  const contents: ContentHit[] = [];
  for (const unit of UNITS) {
    for (const level of ['base', 'adv'] as Level[]) {
      const md = getContent(unit.id, level);
      if (!md) continue;
      const text = plain(md);
      const textN = norm(text);
      let count = 0;
      let i = textN.indexOf(q);
      while (i !== -1) {
        count++;
        i = textN.indexOf(q, i + q.length);
      }
      if (count === 0) continue;

      // 공백을 뺀 위치를 원문 위치로 되돌려 주변 문장을 자름
      const pos = findOriginalIndex(text, textN.indexOf(q));
      const start = Math.max(0, pos - 40);
      const end = Math.min(text.length, pos + q.length + 60);
      const snippet = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
      contents.push({ unit, level, snippet, count });
    }
  }
  contents.sort((a, b) => b.count - a.count);

  return { terms, units, contents };
}

// 공백 제거 문자열의 n번째 글자가 원문에서 몇 번째인지
function findOriginalIndex(original: string, idxInNormalized: number): number {
  let seen = 0;
  for (let i = 0; i < original.length; i++) {
    if (/\s/.test(original[i])) continue;
    if (seen === idxInNormalized) return i;
    seen++;
  }
  return original.length;
}
