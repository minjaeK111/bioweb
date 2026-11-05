// 학습 진도. 이 브라우저의 localStorage 에만 저장됩니다.
// - 개념 정리를 열어 본 기록 (read)
// - 퀴즈 최고 점수 (quiz)

import { useSyncExternalStore } from 'react';
import type { Level } from './content';

export interface QuizRecord {
  best: number; // 맞힌 개수
  total: number; // 문제 수
  attempts: number;
  lastAt: string; // ISO 날짜
}

export interface UnitProgress {
  read: Partial<Record<Level, boolean>>;
  quiz: Partial<Record<Level, QuizRecord>>;
}

export type Progress = Record<string, UnitProgress>;

const KEY = 'bioweb:progress';
const listeners = new Set<() => void>();
let cache: Progress = load();

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

function save(next: Progress) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* 저장이 막힌 브라우저면 메모리에만 유지 */
  }
  listeners.forEach((fn) => fn());
}

function unitOf(p: Progress, unitId: string): UnitProgress {
  return p[unitId] ?? { read: {}, quiz: {} };
}

export function markRead(unitId: string, level: Level) {
  const u = unitOf(cache, unitId);
  if (u.read[level]) return;
  save({ ...cache, [unitId]: { ...u, read: { ...u.read, [level]: true } } });
}

export function recordQuiz(unitId: string, level: Level, correct: number, total: number) {
  const u = unitOf(cache, unitId);
  const prev = u.quiz[level];
  const rec: QuizRecord = {
    best: Math.max(prev?.best ?? 0, correct),
    total,
    attempts: (prev?.attempts ?? 0) + 1,
    lastAt: new Date().toISOString(),
  };
  save({ ...cache, [unitId]: { ...u, quiz: { ...u.quiz, [level]: rec } } });
}

export function resetProgress() {
  save({});
}

/** 단원 하나의 진도율 0~1. 교과 읽기, 심화 읽기, 교과 퀴즈, 심화 퀴즈를 각각 1/4로 본다. */
export function unitRatio(p: Progress, unitId: string): number {
  const u = unitOf(p, unitId);
  const q = (lv: Level) => (u.quiz[lv] ? u.quiz[lv]!.best / Math.max(1, u.quiz[lv]!.total) : 0);
  return ((u.read.base ? 1 : 0) + (u.read.adv ? 1 : 0) + q('base') + q('adv')) / 4;
}

/** 화면에서 진도를 읽을 때 쓰는 훅. 저장이 바뀌면 자동으로 다시 그려진다. */
export function useProgress(): Progress {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => cache
  );
}
