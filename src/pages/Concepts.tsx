import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UNITS, getUnit } from '../data/units';
import { LEVELS, getContent, type Level } from '../data/content';
import { markRead } from '../data/progress';

interface Props {
  unitId: string;
  level: Level;
  onSelectUnit: (id: string) => void;
  onLevelChange: (level: Level) => void;
  onFindResources: (query: string) => void;
}

// 단원별 개념 정리. 위에서 단원을 고르고, 교과 수준 ↔ 심화를 토글합니다.
export default function Concepts({ unitId, level, onSelectUnit, onLevelChange, onFindResources }: Props) {
  const setLevel = onLevelChange;
  const unit = getUnit(unitId) ?? UNITS[0];
  const text = getContent(unit.id, level);
  const bodyRef = useRef<HTMLDivElement>(null);

  // 단원이나 수준이 바뀌면 본문을 맨 위로, 그리고 "읽음"으로 기록
  useEffect(() => {
    bodyRef.current?.scrollIntoView({ block: 'start' });
    if (text) markRead(unit.id, level);
  }, [unit.id, level, text]);

  const idx = UNITS.findIndex((u) => u.id === unit.id);
  const prev = UNITS[idx - 1];
  const next = UNITS[idx + 1];

  return (
    <div className="concepts">
      {/* 단원 고르기 */}
      <div className="unit-chips" role="tablist" aria-label="단원">
        {UNITS.map((u, i) => (
          <button
            key={u.id}
            role="tab"
            className="gy-chip"
            aria-pressed={u.id === unit.id}
            aria-selected={u.id === unit.id}
            onClick={() => onSelectUnit(u.id)}
          >
            <span className="chip-no">{i + 1}</span> {u.title}
          </button>
        ))}
      </div>

      <article className="concept-card gy-gyeop gy-hol" ref={bodyRef}>
        <header className="concept-head">
          <div>
            <div className="concept-kicker">{String(idx + 1).padStart(2, '0')} · {unit.level === 'ext' ? '생명과학Ⅰ 단원' : '통합과학 단원'}</div>
            <h2 className="concept-title">{unit.title}</h2>
            <p className="concept-tagline">{unit.tagline}</p>
          </div>

          <div className="gy-seg level-seg" role="group" aria-label="수준">
            {LEVELS.map((l) => (
              <button key={l.key} aria-pressed={level === l.key} onClick={() => setLevel(l.key)}>
                {l.label}
                <small>{l.hint}</small>
              </button>
            ))}
          </div>
        </header>

        <div className="md">
          {text ? (
            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
          ) : (
            <p>아직 작성되지 않은 내용입니다. <code>src/content/{unit.id}.{level}.md</code> 파일을 만들면 여기에 나타납니다.</p>
          )}
        </div>

        <footer className="concept-foot">
          {level === 'base' ? (
            <button className="gy-btn gy-btn--ink" onClick={() => setLevel('adv')}>
              이 단원 더 깊이 보기 (생명과학Ⅰ)
            </button>
          ) : (
            <button className="gy-btn gy-btn--paper" onClick={() => setLevel('base')}>
              교과 수준으로 돌아가기
            </button>
          )}
          <button className="gy-btn gy-btn--ghost" onClick={() => onFindResources(unit.title.split(',')[0])}>
            이 단원 자료 찾기
          </button>
          <span className="foot-spacer" />
          {prev && (
            <button className="gy-btn gy-btn--ghost" onClick={() => onSelectUnit(prev.id)}>
              ← {prev.title}
            </button>
          )}
          {next && (
            <button className="gy-btn gy-btn--ghost" onClick={() => onSelectUnit(next.id)}>
              {next.title} →
            </button>
          )}
        </footer>
      </article>
    </div>
  );
}
