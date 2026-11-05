import { useMemo, useState } from 'react';
import { UNITS, getUnit } from '../data/units';
import { LEVELS, type Level } from '../data/content';
import { QUIZ, type Question } from '../data/quiz';
import { recordQuiz, resetProgress, unitRatio, useProgress } from '../data/progress';

interface Props {
  initialUnitId: string;
  onOpenUnit: (unitId: string, level: Level) => void;
}

type Phase = 'pick' | 'play' | 'done';

// 단원·수준을 고르고 한 문제씩 풀며 바로 해설을 보는 퀴즈
export default function Quiz({ initialUnitId, onOpenUnit }: Props) {
  const progress = useProgress();
  const [unitId, setUnitId] = useState(initialUnitId);
  const [level, setLevel] = useState<Level>('base');
  const [phase, setPhase] = useState<Phase>('pick');
  const [order, setOrder] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | boolean | null>(null);
  const [correct, setCorrect] = useState(0);

  const unit = getUnit(unitId) ?? UNITS[0];
  const pool = useMemo(() => QUIZ.filter((q) => q.unitId === unit.id && q.level === level), [unit.id, level]);

  function start() {
    // 문제 순서 섞기
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
    setIdx(0);
    setPicked(null);
    setCorrect(0);
    setPhase('play');
  }

  function choose(value: number | boolean) {
    if (picked !== null) return; // 이미 답함
    setPicked(value);
    if (value === order[idx].answer) setCorrect((c) => c + 1);
  }

  function next() {
    if (idx + 1 < order.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      recordQuiz(unit.id, level, correct, order.length);
      setPhase('done');
    }
  }

  const current = order[idx];
  const isCorrect = picked !== null && current && picked === current.answer;

  return (
    <div className="quiz">
      {phase === 'pick' && (
        <>
          <div className="search-box gy-gyeop gy-du">
            <div className="suggest">
              <div className="suggest-label">단원</div>
              <div className="filter-chips">
                {UNITS.map((u, i) => (
                  <button key={u.id} className="gy-chip" aria-pressed={unitId === u.id} onClick={() => setUnitId(u.id)}>
                    <span className="chip-no">{i + 1}</span> {u.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="quiz-pick-row">
              <div className="gy-seg" role="group" aria-label="수준">
                {LEVELS.map((l) => (
                  <button key={l.key} aria-pressed={level === l.key} onClick={() => setLevel(l.key)}>{l.label}</button>
                ))}
              </div>
              <span className="quiz-count">{pool.length}문제</span>
              <button className="gy-btn gy-btn--ink" onClick={start} disabled={pool.length === 0}>
                {unit.title} · {level === 'adv' ? '심화' : '교과'} 퀴즈 시작
              </button>
            </div>
          </div>

          <section className="result-section">
            <h2 className="section-title">학습 진도</h2>
            <p className="group-hint">개념 정리를 열어 보면 "읽음", 퀴즈를 풀면 최고 점수가 기록돼요. 이 브라우저에만 저장됩니다.</p>
            <div className="progress-table gy-gyeop gy-hol">
              {UNITS.map((u, i) => {
                const p = progress[u.id];
                const ratio = unitRatio(progress, u.id);
                return (
                  <div key={u.id} className="progress-row">
                    <div className="progress-name">
                      <span className="chip-no">{i + 1}</span> {u.title}
                    </div>
                    <div className="progress-cells">
                      {LEVELS.map((l) => (
                        <div key={l.key} className="progress-cell">
                          <span className="progress-cell-label">{l.label}</span>
                          <span className={`gy-badge${p?.read[l.key] ? ' gy-badge--ok' : ''}`}>{p?.read[l.key] ? '읽음' : '안 읽음'}</span>
                          <button className="quiz-score" onClick={() => { setUnitId(u.id); setLevel(l.key); }} title="이 단원·수준으로 선택">
                            {p?.quiz[l.key] ? `${p.quiz[l.key]!.best}/${p.quiz[l.key]!.total}` : '퀴즈 전'}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="gy-progress progress-bar" style={{ ['--p' as string]: `${Math.round(ratio * 100)}%` }}>
                      <i />
                    </div>
                    <span className="progress-pct">{Math.round(ratio * 100)}%</span>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="gy-btn gy-btn--ghost gy-btn--sm"
                onClick={() => {
                  if (window.confirm('학습 진도를 모두 지울까요?')) resetProgress();
                }}
              >
                진도 초기화
              </button>
            </div>
          </section>
        </>
      )}

      {phase === 'play' && current && (
        <article className="quiz-card gy-gyeop gy-hol">
          <header className="quiz-head">
            <span className="hit-kicker">
              {unit.title} · {level === 'adv' ? '심화' : '교과 수준'} · {idx + 1} / {order.length}
            </span>
            <div className="gy-progress" style={{ ['--p' as string]: `${Math.round((idx / order.length) * 100)}%` }}>
              <i />
            </div>
          </header>

          <h2 className="quiz-q">
            <span className="gy-badge">{current.type === 'ox' ? 'OX' : '객관식'}</span> {current.q}
          </h2>

          <div className="quiz-choices">
            {current.type === 'ox' ? (
              [true, false].map((v) => (
                <button key={String(v)} className={choiceClass(v, picked, current.answer)} onClick={() => choose(v)} disabled={picked !== null}>
                  <span className="choice-mark">{v ? 'O' : 'X'}</span>
                  {v ? '맞다' : '틀리다'}
                </button>
              ))
            ) : (
              current.choices.map((c, i) => (
                <button key={i} className={choiceClass(i, picked, current.answer)} onClick={() => choose(i)} disabled={picked !== null}>
                  <span className="choice-mark">{i + 1}</span>
                  {c}
                </button>
              ))
            )}
          </div>

          {picked !== null && (
            <div className={`quiz-explain${isCorrect ? ' ok' : ' no'}`} role="status">
              <strong>{isCorrect ? '정답!' : '아쉽네요.'}</strong> {current.explain}
            </div>
          )}

          <footer className="concept-foot">
            <button className="gy-btn gy-btn--ghost" onClick={() => setPhase('pick')}>그만두기</button>
            <span className="foot-spacer" />
            {picked !== null && (
              <button className="gy-btn gy-btn--ink" onClick={next}>
                {idx + 1 < order.length ? '다음 문제' : '결과 보기'}
              </button>
            )}
          </footer>
        </article>
      )}

      {phase === 'done' && (
        <article className="quiz-card gy-gyeop gy-hol quiz-done">
          <span className="hit-kicker">{unit.title} · {level === 'adv' ? '심화' : '교과 수준'}</span>
          <h2 className="quiz-score-big">
            {correct} <small>/ {order.length}</small>
          </h2>
          <p className="concept-tagline">
            {correct === order.length
              ? '전부 맞혔어요. 다음 단원이나 심화로 넘어가 보세요.'
              : correct >= order.length * 0.7
                ? '잘했어요. 틀린 문제의 해설을 개념 정리에서 다시 확인해 보세요.'
                : '개념 정리를 한 번 더 읽고 다시 풀어 보면 좋겠어요.'}
          </p>
          <div className="concept-foot">
            <button className="gy-btn gy-btn--ink" onClick={start}>다시 풀기</button>
            <button className="gy-btn gy-btn--paper" onClick={() => onOpenUnit(unit.id, level)}>개념 정리 보기</button>
            <span className="foot-spacer" />
            <button className="gy-btn gy-btn--ghost" onClick={() => setPhase('pick')}>다른 퀴즈 고르기</button>
          </div>
        </article>
      )}
    </div>
  );
}

function choiceClass(value: number | boolean, picked: number | boolean | null, answer: number | boolean): string {
  let cls = 'choice gy-gyeop gy-du';
  if (picked === null) return cls;
  if (value === answer) cls += ' right';
  else if (value === picked) cls += ' wrong';
  return cls;
}
