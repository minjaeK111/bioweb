import { useMemo, useState } from 'react';
import { UNITS, getUnit } from '../data/units';
import { GLOSSARY } from '../data/glossary';
import { SOURCES, SOURCE_GROUPS, buildUrl, type Source } from '../data/sources';

interface Props {
  /** 다른 페이지에서 넘겨준 검색어 (없으면 빈 문자열) */
  initialQuery: string;
  initialUnitId: string;
}

// 검색어 하나로 여러 외부 사이트의 검색 결과 링크를 만들어 주는 패널
export default function Resources({ initialQuery, initialUnitId }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [unitId, setUnitId] = useState(initialUnitId);

  const q = query.trim();
  const unit = getUnit(unitId);

  // 검색어가 용어 사전에 있으면 영어 표기를 함께 씀 (영어 사이트용)
  const english = useMemo(() => {
    const hit = GLOSSARY.find((t) => t.term === q);
    return hit?.en?.split(',')[0].trim() ?? '';
  }, [q]);

  // 고른 단원의 용어들 (추천 검색어)
  const suggestions = useMemo(() => {
    if (!unit) return [];
    return GLOSSARY.filter((t) => t.unitId === unit.id).map((t) => t.term);
  }, [unit]);

  return (
    <div className="resources">
      <div className="search-box gy-gyeop gy-du">
        <label className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            className="gy-field"
            type="search"
            placeholder="찾고 싶은 개념이나 용어 (예: 삼투, 자연 선택, CRISPR)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="gy-btn gy-btn--ghost gy-btn--sm" onClick={() => setQuery('')}>
              지우기
            </button>
          )}
        </label>

        <div className="suggest">
          <div className="suggest-label">단원에서 고르기</div>
          <div className="filter-chips">
            {UNITS.map((u, i) => (
              <button
                key={u.id}
                className="gy-chip"
                aria-pressed={unitId === u.id}
                onClick={() => {
                  setUnitId(u.id);
                  if (!q) setQuery(u.title.split(',')[0]);
                }}
              >
                <span className="chip-no">{i + 1}</span> {u.title}
              </button>
            ))}
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="suggest">
            <div className="suggest-label">{unit?.title} 추천 검색어</div>
            <div className="filter-chips">
              {suggestions.map((s) => (
                <button key={s} className="gy-chip" aria-pressed={q === s} onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {q ? (
        <p className="result-summary">
          "<strong>{q}</strong>"
          {english && <> (영어 사이트에서는 "<strong>{english}</strong>")</>}
          로 아래 사이트를 검색합니다. 링크는 새 창에서 열려요.
        </p>
      ) : (
        <p className="result-summary">검색어를 입력하거나 위에서 단원·용어를 고르면 사이트별 검색 링크가 만들어져요.</p>
      )}

      {SOURCE_GROUPS.map((g) => {
        const list = SOURCES.filter((s) => s.group === g.key);
        return (
          <section key={g.key} className="result-section">
            <h2 className="section-title">{g.label}</h2>
            <p className="group-hint">{g.hint}</p>
            <div className="source-grid">
              {list.map((s) => (
                <SourceCard key={s.name} source={s} q={q} english={english} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SourceCard({ source, q, english }: { source: Source; q: string; english: string }) {
  const keyword = source.lang === 'en' && english ? english : q;
  const href = q ? buildUrl(source, keyword) : source.home;

  return (
    <a className="source gy-gyeop gy-hol" href={href} target="_blank" rel="noopener noreferrer">
      <span className="source-head">
        <span className="source-name">{source.name}</span>
        <span className={`gy-badge${source.lang === 'ko' ? ' gy-badge--ok' : ''}`}>{source.lang === 'ko' ? '한국어' : 'English'}</span>
      </span>
      <span className="source-desc">{source.desc}</span>
      <span className="source-link">
        {q ? <>"{keyword}" 검색 결과 열기</> : '사이트 열기'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      </span>
    </a>
  );
}
