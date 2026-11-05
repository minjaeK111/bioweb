import { UNITS, type Unit } from '../data/units';
import { unitRatio, useProgress, type Progress } from '../data/progress';

interface Props {
  onOpen: (unitId: string) => void;
}

// 통합과학 → 생명과학Ⅰ 경로를 보여주는 단원 카드 모음
export default function UnitMap({ onOpen }: Props) {
  const progress = useProgress();
  const baseUnits = UNITS.filter((u) => u.level === 'base');
  const extUnits = UNITS.filter((u) => u.level === 'ext');
  const overall = Math.round((UNITS.reduce((s, u) => s + unitRatio(progress, u.id), 0) / UNITS.length) * 100);

  return (
    <div className="unit-map">
      <div className="map-intro">
        <p>
          통합과학에서 배운 생명 단원 <strong>{baseUnits.length}개</strong>를 출발점으로 삼고,
          각 단원이 생명과학Ⅰ에서 어떻게 깊어지는지 한눈에 봅니다. 카드를 누르면 개념 정리로 이동해요.
        </p>
        <div className="map-side">
          <div className="legend">
            <span className="legend-item"><i className="dot dot-base" /> 통합과학 핵심</span>
            <span className="legend-item"><i className="dot dot-bio1" /> 생명과학Ⅰ 확장</span>
          </div>
          <div className="overall">
            <span className="overall-label">전체 진도 {overall}%</span>
            <div className="gy-progress" style={{ ['--p' as string]: `${overall}%` }}>
              <i />
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-title">통합과학에서 출발하는 단원</h2>
      <div className="unit-grid">
        {baseUnits.map((u, i) => (
          <UnitCard key={u.id} unit={u} index={i + 1} onOpen={onOpen} progress={progress} />
        ))}
      </div>

      <h2 className="section-title">생명과학Ⅰ에서 새로 만나는 단원</h2>
      <div className="unit-grid">
        {extUnits.map((u, i) => (
          <UnitCard key={u.id} unit={u} index={baseUnits.length + i + 1} onOpen={onOpen} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function UnitCard({ unit, index, onOpen, progress }: { unit: Unit; index: number; onOpen: (id: string) => void; progress: Progress }) {
  const p = progress[unit.id];
  const ratio = Math.round(unitRatio(progress, unit.id) * 100);
  const quizText = (lv: 'base' | 'adv') => (p?.quiz[lv] ? `${p.quiz[lv]!.best}/${p.quiz[lv]!.total}` : '–');

  return (
    <button className="unit-card gy-gyeop gy-hol" onClick={() => onOpen(unit.id)}>
      <div className="unit-head">
        <span className="unit-no">{String(index).padStart(2, '0')}</span>
        <span className="unit-head-right">
          {unit.level === 'ext' && <span className="gy-badge">생명과학Ⅰ</span>}
          {ratio > 0 && <span className="gy-badge gy-badge--ok">{ratio}%</span>}
        </span>
      </div>
      <h3 className="unit-title">{unit.title}</h3>
      <p className="unit-tagline">{unit.tagline}</p>

      <div className="unit-track">
        <div className="track-label"><i className="dot dot-base" /> {unit.level === 'ext' ? '통합과학과 이어지는 곳' : '통합과학 핵심'}</div>
        <ul className="track-list">
          {unit.base.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="unit-arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span>더 깊이</span>
      </div>

      <div className="unit-track">
        <div className="track-label"><i className="dot dot-bio1" /> 생명과학Ⅰ 확장</div>
        <ul className="track-list">
          {unit.bio1.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="unit-progress" aria-label="학습 진도">
        <span className={p?.read.base ? 'done' : ''}>교과 {p?.read.base ? '읽음' : '안 읽음'}</span>
        <span className={p?.read.adv ? 'done' : ''}>심화 {p?.read.adv ? '읽음' : '안 읽음'}</span>
        <span>퀴즈 교과 {quizText('base')} · 심화 {quizText('adv')}</span>
      </div>
    </button>
  );
}
