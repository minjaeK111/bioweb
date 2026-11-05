import { useState } from 'react';
import { applyTheme, loadTheme, saveTheme, type Theme } from './theme';
import UnitMap from './pages/UnitMap';
import Concepts from './pages/Concepts';
import Glossary from './pages/Glossary';
import Resources from './pages/Resources';
import Quiz from './pages/Quiz';
import type { Level } from './data/content';

// 왼쪽 메뉴 항목. 각 페이지는 다음 단계에서 하나씩 채웁니다.
export type PageKey = 'map' | 'concepts' | 'glossary' | 'resources' | 'quiz';

const NAV: { key: PageKey; label: string; hint: string }[] = [
  { key: 'map', label: '단원 지도', hint: '통합과학 → 생명과학Ⅰ' },
  { key: 'concepts', label: '개념 정리', hint: '교과 수준 ↔ 심화' },
  { key: 'glossary', label: '용어 사전', hint: '용어 · 본문 검색' },
  { key: 'resources', label: '자료 찾기', hint: '외부 자료 링크' },
  { key: 'quiz', label: '퀴즈', hint: 'OX · 객관식 · 진도' },
];

// 메뉴 아이콘 (이모지 대신 SVG)
function NavIcon({ k }: { k: PageKey }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (k) {
    case 'map':
      return (
        <svg {...common}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></svg>
      );
    case 'concepts':
      return (
        <svg {...common}><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h8" /></svg>
      );
    case 'glossary':
      return (
        <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      );
    case 'resources':
      return (
        <svg {...common}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
      );
    case 'quiz':
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5" /><circle cx="12" cy="17" r=".6" fill="currentColor" /></svg>
      );
  }
}

export default function App() {
  const [page, setPage] = useState<PageKey>('map');
  const [theme, setTheme] = useState<Theme>(() => loadTheme());
  const [menuOpen, setMenuOpen] = useState(false);
  // 단원 지도에서 고른 단원. 개념 정리·퀴즈가 이 값을 씁니다.
  const [unitId, setUnitId] = useState<string>('cell');
  const [level, setLevel] = useState<Level>('base');

  // 자료 찾기 페이지에 넘겨줄 검색어
  const [resourceQuery, setResourceQuery] = useState('');

  function openUnit(id: string, lv: Level = 'base') {
    setUnitId(id);
    setLevel(lv);
    setPage('concepts');
  }

  function openResources(q: string) {
    setResourceQuery(q);
    setPage('resources');
  }

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  }

  const current = NAV.find((n) => n.key === page)!;

  return (
    <div className="app">
      {/* 모바일에서 메뉴 열렸을 때 뒤 배경 */}
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}

      <aside className={`sidebar gy-gyeop gy-du${menuOpen ? ' open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="22" height="22">
              <ellipse cx="32" cy="32" rx="18" ry="14" fill="none" stroke="currentColor" strokeWidth="4" />
              <circle cx="28" cy="31" r="6" fill="currentColor" />
            </svg>
          </span>
          <div>
            <div className="brand-name">생명노트</div>
            <div className="brand-sub">통합과학에서 생명과학Ⅰ까지</div>
          </div>
        </div>

        <nav className="nav">
          {NAV.map((n) => (
            <button
              key={n.key}
              className={`nav-item${page === n.key ? ' active' : ''}`}
              aria-current={page === n.key ? 'page' : undefined}
              onClick={() => {
                setPage(n.key);
                setMenuOpen(false);
              }}
            >
              <NavIcon k={n.key} />
              <span className="nav-label">{n.label}</span>
              <span className="nav-hint">{n.hint}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <button className="gy-btn gy-btn--paper gy-btn--sm" onClick={toggleTheme}>
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" aria-label="메뉴 열기" onClick={() => setMenuOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <h1 className="page-title">{current.label}</h1>
          <span className="page-hint">{current.hint}</span>
        </header>

        <section className="content">
          {page === 'map' && <UnitMap onOpen={openUnit} />}
          {page === 'concepts' && (
            <Concepts unitId={unitId} level={level} onSelectUnit={setUnitId} onLevelChange={setLevel} onFindResources={openResources} />
          )}
          {page === 'glossary' && <Glossary onOpenUnit={openUnit} />}
          {page === 'resources' && <Resources key={resourceQuery} initialQuery={resourceQuery} initialUnitId={unitId} />}
          {page === 'quiz' && <Quiz initialUnitId={unitId} onOpenUnit={openUnit} />}
        </section>
      </main>
    </div>
  );
}
