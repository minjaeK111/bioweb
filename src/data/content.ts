// src/content/<단원id>.<base|adv>.md 파일을 전부 읽어 들입니다.
// 새 내용을 추가하려면 같은 이름 규칙으로 .md 파일만 만들면 됩니다.

export type Level = 'base' | 'adv';

export const LEVELS: { key: Level; label: string; hint: string }[] = [
  { key: 'base', label: '교과 수준', hint: '통합과학' },
  { key: 'adv', label: '심화', hint: '생명과학Ⅰ' },
];

// Vite의 import.meta.glob: 빌드 때 폴더 안 파일을 모두 문자열로 가져옵니다.
const files = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const byKey: Record<string, string> = {};
for (const [path, text] of Object.entries(files)) {
  // '../content/cell.base.md' → 'cell.base'
  const name = path.split('/').pop()!.replace(/\.md$/, '');
  byKey[name] = text;
}

export function getContent(unitId: string, level: Level): string | undefined {
  return byKey[`${unitId}.${level}`];
}
