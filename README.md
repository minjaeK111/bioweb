# 생명노트 · bioweb

통합과학 생명 단원에서 출발해 생명과학Ⅰ까지 확장해 공부하는 학습 웹입니다.
Vite + React + TypeScript로 만들었고, 디자인은 [결(gyeol)](https://minjaek111.github.io/gyeol/) 디자인 시스템을 씁니다.
서버 없이 브라우저만으로 동작합니다.

## 필요한 프로그램

| 프로그램 | 확인 방법 | 설치 |
| --- | --- | --- |
| Node.js 22.13 이상 (24 권장) | `node -v` | https://nodejs.org |

## 처음 한 번: 설치

프로젝트 폴더(`bioweb`)에서 터미널을 열고:

```bash
npm install
```

## 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5180 을 엽니다.

인터넷에 올릴 정적 파일을 만들려면:

```bash
npm run build
```

`dist` 폴더가 생기며, 이 폴더만 GitHub Pages·Netlify·Vercel 같은 곳에 올리면 됩니다.

## 내용 고치기

- 단원 목록: `src/data/units.ts`
- 개념 정리 본문: `src/content/<단원id>.base.md` (교과 수준), `src/content/<단원id>.adv.md` (심화). 마크다운 문법이며 표·굵게·인용을 쓸 수 있습니다.
- 퀴즈 문제: `src/data/quiz.ts` 배열에 추가. OX는 `type: 'ox', answer: true/false`, 객관식은 `type: 'mc', choices: [...], answer: 번호(0부터)`.
- 학습 진도(읽음, 퀴즈 최고 점수)는 브라우저의 localStorage(`bioweb:progress`)에만 저장됩니다. 퀴즈 페이지 아래 "진도 초기화"로 지울 수 있어요.
- 자료 찾기 사이트: `src/data/sources.ts` 배열에 `{ name, desc, group, lang, home, search }` 추가. `search` 주소의 `{q}` 자리에 검색어가 들어갑니다.
- 용어 사전: `src/data/glossary.ts` 배열에 `{ term, en, unitId, level, def }` 한 줄씩 추가.
  - 주의: `**굵게**` 바로 뒤에 조사를 붙일 때 닫는 `**` 앞이 괄호 `)`이면 굵게가 안 됩니다. `**단어**(설명)는` 처럼 괄호를 밖으로 빼세요.

## 만드는 순서

| 단계 | 내용 | 상태 |
| --- | --- | --- |
| 1 | 프로젝트 뼈대, 메뉴·본문 레이아웃, 라이트/다크 전환 | 완료 |
| 2 | 단원 지도 (통합과학 → 생명과학Ⅰ 카드, `src/data/units.ts`) | 완료 |
| 3 | 개념 정리 (교과 수준 ↔ 심화 토글, `src/content/*.md`) | 완료 |
| 4 | 용어 사전 + 통합 검색 (`src/data/glossary.ts`, `src/data/search.ts`) | 완료 |
| 5 | 자료 찾기 (외부 사이트 검색 링크, `src/data/sources.ts`) | 완료 |
| 6 | 퀴즈 + 학습 진도 저장 (`src/data/quiz.ts`, `src/data/progress.ts`) | 완료 |
