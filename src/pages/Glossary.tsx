import { useMemo, useState, type ReactNode } from 'react';
import { GLOSSARY, type Term } from '../data/glossary';
import { UNITS, getUnit } from '../data/units';
import { LEVELS, type Level } from '../data/content';
import { norm, search } from '../data/search';

interface Props {
  onOpenUnit: (unitId: string, level: Level) => void;
}

type LevelFilter = Level | 'all';

// 용어 사전 + 통합 검색
export default function Glossary({ onOpenUnit }: Props) {
  const [query, setQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const q = query.trim();
  const result = useMemo(() => search(q), [q]);

  // 필터 적용 (검색 결과에도, 전체 목록에도)
  const passes = (t: Term) => (unitFilter === 'all' || t.unitId === unitFilter) && (levelFilter === 'all' || t.level === levelFilter);
  const termList = (q ? result.terms : GLOSSARY).filter(passes);

  const byUnit = UNITS.map((u) => ({ unit: u, terms: termList.filter((t) => t.unitId === u.id) })).filter((g) => g.terms.length > 0);

  const unitHits = q ? result.units : [];
  const contentHits = q
    ? result.contents.filter((h) => (unitFilter === 'all' || h.unit.id === unitFilter) && (levelFilter === 'all' || h.level === levelFilter))
    : [];

  const total = termList.length + unitHits.length + contentHits.length;

  return (
    <div className="glossary">
      <div className="search-box gy-gyeop gy-du">
        <label className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            className="gy-field"
            type="search"
            placeholder="용어, 단원, 개념 정리 본문에서 찾기 (예: 삼투, 인슐린, 자연 선택)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="gy-btn gy-btn--ghost gy-btn--sm" onClick={() => setQuery('')}>
              지우기
            </button>
          )}
        </label>

        <div className="search-filters">
          <div className="filter-chips">
            <button className="gy-chip" aria-pressed={unitFilter === 'all'} onClick={() => setUnitFilter('all')}>전체 단원</button>
            {UNITS.map((u, i) => (
              <button key={u.id} className="gy-chip" aria-pressed={unitFilter === u.id} onClick={() => setUnitFilter(u.id)}>
                <span className="chip-no">{i + 1}</span> {u.title}
              </button>
            ))}
          </div>
          <div className="gy-seg" role="group" aria-label="수준">
            <button aria-pressed={levelFilter === 'all'} onClick={() => setLevelFilter('all')}>전체</button>
            {LEVELS.map((l) => (
              <button key={l.key} aria-pressed={levelFilter === l.key} onClick={() => setLevelFilter(l.key)}>{l.label}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="result-summary">
        {q ? (
          total > 0 ? <>"<strong>{q}</strong>" 검색 결과 {total}건 · 용어 {termList.length} · 단원 {unitHits.length} · 본문 {contentHits.length}</> : <>"<strong>{q}</strong>"에 맞는 결과가 없어요. 띄어쓰기나 다른 말로 다시 찾아보세요.</>
        ) : (
          <>용어 {termList.length}개 · 단원별로 정리되어 있어요. 용어를 누르면 해당 단원의 개념 정리로 이동합니다.</>
        )}
      </p>

      {/* 단원 검색 결과 */}
      {unitHits.length > 0 && (
        <section className="result-section">
          <h2 className="section-title">단원</h2>
          <div className="hit-list">
            {unitHits.map((u) => (
              <button key={u.id} className="hit gy-gyeop gy-hol" onClick={() => onOpenUnit(u.id, 'base')}>
                <span className="hit-kicker">단원 {UNITS.indexOf(u) + 1}</span>
                <span className="hit-title"><Highlight text={u.title} q={q} /></span>
                <span className="hit-desc">{u.tagline}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 용어 */}
      {byUnit.length > 0 && (
        <section className="result-section">
          <h2 className="section-title">용어</h2>
          {byUnit.map(({ unit, terms }) => (
            <div key={unit.id} className="term-group">
              <h3 className="term-group-title">
                <span className="chip-no">{UNITS.indexOf(unit) + 1}</span> {unit.title}
              </h3>
              <div className="term-grid">
                {terms.map((t) => (
                  <button key={t.term + t.unitId} className="term gy-gyeop gy-hol" onClick={() => onOpenUnit(t.unitId, t.level)}>
                    <span className="term-head">
                      <span className="term-name"><Highlight text={t.term} q={q} /></span>
                      {t.en && <span className="term-en"><Highlight text={t.en} q={q} /></span>}
                      <span className={`gy-badge${t.level === 'adv' ? '' : ' gy-badge--ok'}`}>{t.level === 'adv' ? '심화' : '교과'}</span>
                    </span>
                    <span className="term-def"><Highlight text={t.def} q={q} /></span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 본문 검색 결과 */}
      {contentHits.length > 0 && (
        <section className="result-section">
          <h2 className="section-title">개념 정리 본문</h2>
          <div className="hit-list">
            {contentHits.map((h) => (
              <button key={h.unit.id + h.level} className="hit gy-gyeop gy-hol" onClick={() => onOpenUnit(h.unit.id, h.level)}>
                <span className="hit-kicker">
                  {getUnit(h.unit.id)?.title} · {h.level === 'adv' ? '심화' : '교과 수준'} · {h.count}곳
                </span>
                <span className="hit-desc"><Highlight text={h.snippet} q={q} /></span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// 검색어와 일치하는 부분을 <mark>로 표시 (공백 무시 비교)
function Highlight({ text, q }: { text: string; q: string }): ReactNode {
  const qn = norm(q);
  if (!qn) return text;
  const parts: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const m = matchAt(text, i, qn);
    if (m > 0) {
      parts.push(<mark key={key++}>{text.slice(i, i + m)}</mark>);
      i += m;
    } else {
      // 다음 일치 지점까지 일반 글자 모으기
      let j = i + 1;
      while (j < text.length && matchAt(text, j, qn) === 0) j++;
      parts.push(text.slice(i, j));
      i = j;
    }
  }
  return <>{parts}</>;
}

// text의 i 위치에서 (공백을 건너뛰며) qn이 일치하면 일치한 원문 길이를, 아니면 0을 돌려줌
function matchAt(text: string, i: number, qn: string): number {
  let ti = i;
  let qi = 0;
  while (qi < qn.length) {
    if (ti >= text.length) return 0;
    const ch = text[ti];
    if (/\s/.test(ch)) {
      if (qi === 0) return 0; // 공백에서 시작하지 않음
      ti++;
      continue;
    }
    if (ch.toLowerCase() !== qn[qi]) return 0;
    ti++;
    qi++;
  }
  return ti - i;
}
