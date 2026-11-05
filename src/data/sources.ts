// 자료 찾기에서 쓰는 외부 사이트 목록.
// search 주소의 {q} 자리에 검색어가 들어갑니다. search가 없으면 home만 엽니다.
// 사이트를 추가하려면 아래 배열에 한 항목씩 넣으면 됩니다.

export type SourceGroup = 'encyclopedia' | 'lecture' | 'paper' | 'image';

export interface Source {
  name: string;
  desc: string;
  group: SourceGroup;
  /** ko: 한국어 검색어 그대로, en: 용어 사전에 영어 표기가 있으면 그것으로 검색 */
  lang: 'ko' | 'en';
  home: string;
  search?: string;
}

export const SOURCE_GROUPS: { key: SourceGroup; label: string; hint: string }[] = [
  { key: 'encyclopedia', label: '개념 확인', hint: '교과서보다 조금 더 자세한 설명이 필요할 때' },
  { key: 'lecture', label: '강의 · 영상', hint: '말로 설명을 들으며 이해하고 싶을 때' },
  { key: 'paper', label: '논문 · 심화 자료', hint: '탐구 보고서나 생명과학Ⅰ 이상으로 확장할 때' },
  { key: 'image', label: '그림 · 생물 정보', hint: '구조 그림, 실제 생물 사진이 필요할 때' },
];

export const SOURCES: Source[] = [
  {
    name: '위키백과',
    desc: '한국어 백과사전. 개념의 전체 그림을 빠르게 잡기 좋아요.',
    group: 'encyclopedia',
    lang: 'ko',
    home: 'https://ko.wikipedia.org/',
    search: 'https://ko.wikipedia.org/w/index.php?search={q}',
  },
  {
    name: 'Wikipedia (영어)',
    desc: '한국어판보다 내용이 훨씬 풍부해요. 그림과 참고 문헌이 많아요.',
    group: 'encyclopedia',
    lang: 'en',
    home: 'https://en.wikipedia.org/',
    search: 'https://en.wikipedia.org/w/index.php?search={q}',
  },
  {
    name: '네이버 지식백과',
    desc: '두산백과, 생명과학대사전 등 여러 사전을 한 번에 검색해요.',
    group: 'encyclopedia',
    lang: 'ko',
    home: 'https://terms.naver.com/',
    search: 'https://terms.naver.com/search.naver?query={q}',
  },
  {
    name: 'EBSi',
    desc: '고교 통합과학·생명과학Ⅰ 강의와 교재. 수능 연계 설명을 들을 수 있어요.',
    group: 'lecture',
    lang: 'ko',
    home: 'https://www.ebsi.co.kr/',
    search: 'https://www.ebsi.co.kr/ebs/pot/pots/retrieveTotalSearchList.ebs?sApiFsearch={q}',
  },
  {
    name: 'KOCW 대학공개강의',
    desc: '대학 생물학·생화학 강의를 무료로 봐요. 생명과학Ⅰ 너머로 확장할 때.',
    group: 'lecture',
    lang: 'ko',
    home: 'http://www.kocw.net/',
    search: 'http://www.kocw.net/home/search/search.do?query={q}',
  },
  {
    name: 'Khan Academy',
    desc: '영어지만 그림과 짧은 영상으로 차근차근 설명해요. 자막 지원.',
    group: 'lecture',
    lang: 'en',
    home: 'https://www.khanacademy.org/science/biology',
    search: 'https://www.khanacademy.org/search?page_search_query={q}',
  },
  {
    name: 'YouTube',
    desc: '개념 설명 영상, 실험 영상, 애니메이션을 찾을 때.',
    group: 'lecture',
    lang: 'ko',
    home: 'https://www.youtube.com/',
    search: 'https://www.youtube.com/results?search_query={q}',
  },
  {
    name: 'RISS 학술연구정보',
    desc: '국내 학술 논문·학위 논문. 탐구 보고서 참고 문헌을 찾을 때.',
    group: 'paper',
    lang: 'ko',
    home: 'https://www.riss.kr/',
    search: 'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&query={q}',
  },
  {
    name: 'Google Scholar',
    desc: '전 세계 논문 검색. 영어 용어로 검색하면 결과가 훨씬 많아요.',
    group: 'paper',
    lang: 'en',
    home: 'https://scholar.google.com/',
    search: 'https://scholar.google.com/scholar?q={q}',
  },
  {
    name: 'PubMed',
    desc: '생명과학·의학 논문 데이터베이스. 최신 연구 동향을 볼 때.',
    group: 'paper',
    lang: 'en',
    home: 'https://pubmed.ncbi.nlm.nih.gov/',
    search: 'https://pubmed.ncbi.nlm.nih.gov/?term={q}',
  },
  {
    name: 'Google 이미지',
    desc: '세포 구조, 그래프, 모식도 같은 그림을 찾을 때.',
    group: 'image',
    lang: 'ko',
    home: 'https://images.google.com/',
    search: 'https://www.google.com/search?tbm=isch&q={q}',
  },
  {
    name: '국립생물자원관 한반도의 생물다양성',
    desc: '우리나라 생물 종 정보와 사진. 생태계·생물 다양성 단원에 유용해요.',
    group: 'image',
    lang: 'ko',
    home: 'https://species.nibr.go.kr/',
  },
];

export function buildUrl(source: Source, keyword: string): string {
  if (!source.search || !keyword) return source.home;
  return source.search.replace('{q}', encodeURIComponent(keyword));
}
