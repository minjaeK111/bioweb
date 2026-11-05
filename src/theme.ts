// 라이트/다크 테마 설정. 팔레트는 쑥(ssuk, 녹색) 고정. 이 브라우저에만 저장됩니다.

export type Theme = 'light' | 'dark';

const KEY = 'bioweb:theme';

export function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(t: Theme) {
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* 저장이 막힌 브라우저면 무시 */
  }
}

// <html data-theme> 에 적용 → 결 CSS가 색을 다시 계산
export function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
}
