// 용어 사전. unitId는 src/data/units.ts 의 id, level은 base(통합과학) / adv(생명과학Ⅰ).
// 용어를 추가하려면 아래 배열에 한 줄씩 넣으면 됩니다.

import type { Level } from './content';

export interface Term {
  term: string;
  /** 영어 표기 (있으면 검색에도 쓰임) */
  en?: string;
  unitId: string;
  level: Level;
  def: string;
}

export const GLOSSARY: Term[] = [
  // ----- 세포 -----
  { term: '세포', en: 'cell', unitId: 'cell', level: 'base', def: '생물의 구조와 기능의 기본 단위. 모든 생명 활동이 세포 안에서 일어난다.' },
  { term: '핵', en: 'nucleus', unitId: 'cell', level: 'base', def: 'DNA가 들어 있어 세포의 생명 활동을 조절하는 소기관. 핵막으로 싸여 있다.' },
  { term: '미토콘드리아', en: 'mitochondria', unitId: 'cell', level: 'base', def: '세포 호흡으로 ATP를 만드는 소기관. 동물·식물 세포 모두에 있다.' },
  { term: '엽록체', en: 'chloroplast', unitId: 'cell', level: 'base', def: '광합성이 일어나는 소기관. 식물 세포와 조류에만 있다.' },
  { term: '리보솜', en: 'ribosome', unitId: 'cell', level: 'base', def: 'RNA의 정보를 읽어 아미노산을 이어 단백질을 합성하는 알갱이.' },
  { term: '세포벽', en: 'cell wall', unitId: 'cell', level: 'base', def: '식물 세포의 바깥을 둘러싼 단단한 벽. 세포 모양을 유지하고 보호한다.' },
  { term: '원핵세포', en: 'prokaryotic cell', unitId: 'cell', level: 'base', def: '핵막이 없어 DNA가 세포질에 그대로 있는 세포. 세균, 남세균.' },
  { term: '진핵세포', en: 'eukaryotic cell', unitId: 'cell', level: 'base', def: '핵막으로 싸인 핵과 막으로 된 소기관을 가진 세포. 동물, 식물, 균류.' },
  { term: '조직', en: 'tissue', unitId: 'cell', level: 'base', def: '모양과 기능이 비슷한 세포들의 모임. 근육 조직, 상피 조직 등.' },
  { term: '기관계', en: 'organ system', unitId: 'cell', level: 'base', def: '관련된 기능을 하는 기관들의 모임. 소화계, 순환계 등. 식물에는 없다.' },
  { term: '바이러스', en: 'virus', unitId: 'cell', level: 'adv', def: '유전 물질과 단백질 껍질로만 된 입자. 세포 구조가 없고 숙주 세포 안에서만 증식한다.' },
  { term: '대조군', en: 'control group', unitId: 'cell', level: 'adv', def: '실험에서 조건을 바꾸지 않은 비교용 집단. 실험군과 비교해 조작 변인의 효과를 확인한다.' },
  { term: '염색체', en: 'chromosome', unitId: 'cell', level: 'adv', def: 'DNA가 히스톤 단백질에 감겨 뭉친 구조. 세포 분열 때 막대 모양으로 응축된다.' },
  { term: '상동 염색체', en: 'homologous chromosomes', unitId: 'cell', level: 'adv', def: '모양과 크기가 같은 염색체 한 쌍. 하나는 아버지, 하나는 어머니에게서 온다.' },
  { term: '염색 분체', en: 'chromatid', unitId: 'cell', level: 'adv', def: 'DNA 복제 뒤 동원체에 붙어 있는 염색체의 두 가닥. 유전 정보가 서로 같다.' },
  { term: '핵형', en: 'karyotype', unitId: 'cell', level: 'adv', def: '한 생물의 염색체 수·모양·크기를 정리한 것. 염색체 이상을 진단할 때 쓴다.' },
  { term: '세포 주기', en: 'cell cycle', unitId: 'cell', level: 'adv', def: '간기(G1, S, G2)와 분열기(M)가 반복되는 과정. DNA는 S기에 복제된다.' },
  { term: '체세포 분열', en: 'mitosis', unitId: 'cell', level: 'adv', def: '2n → 2n으로 유전 정보가 같은 딸세포 2개를 만드는 분열. 생장과 재생에 쓰인다.' },
  { term: '감수 분열', en: 'meiosis', unitId: 'cell', level: 'adv', def: '2n → n으로 염색체 수를 절반으로 줄여 생식세포 4개를 만드는 분열. 2회 연속 분열.' },
  { term: '교차', en: 'crossing over', unitId: 'cell', level: 'adv', def: '감수 1분열 전기에 상동 염색체끼리 일부를 교환하는 현상. 유전적 다양성을 높인다.' },

  // ----- 세포막 -----
  { term: '인지질 2중층', en: 'phospholipid bilayer', unitId: 'membrane', level: 'base', def: '친수성 머리는 바깥, 소수성 꼬리는 안쪽을 향해 두 겹으로 배열된 세포막의 기본 구조.' },
  { term: '선택적 투과성', en: 'selective permeability', unitId: 'membrane', level: 'base', def: '세포막이 물질의 종류에 따라 통과시키는 정도를 달리하는 성질.' },
  { term: '확산', en: 'diffusion', unitId: 'membrane', level: 'base', def: '물질이 농도가 높은 곳에서 낮은 곳으로 저절로 퍼지는 현상. 에너지가 들지 않는다.' },
  { term: '촉진 확산', en: 'facilitated diffusion', unitId: 'membrane', level: 'base', def: '막단백질(통로·운반체)의 도움을 받아 농도 기울기를 따라 이동하는 확산.' },
  { term: '삼투', en: 'osmosis', unitId: 'membrane', level: 'base', def: '물이 반투과성 막을 통해 용질 농도가 낮은 쪽에서 높은 쪽으로 이동하는 현상.' },
  { term: '원형질 분리', en: 'plasmolysis', unitId: 'membrane', level: 'base', def: '식물 세포를 고장액에 넣었을 때 물이 빠져 세포막이 세포벽에서 떨어지는 현상.' },
  { term: '능동 수송', en: 'active transport', unitId: 'membrane', level: 'base', def: 'ATP를 써서 농도 기울기를 거슬러(낮은 → 높은 농도) 물질을 옮기는 방식.' },
  { term: '뉴런', en: 'neuron', unitId: 'membrane', level: 'adv', def: '신경계를 이루는 세포. 가지 돌기, 신경 세포체, 축삭 돌기로 되어 있다.' },
  { term: '휴지 전위', en: 'resting potential', unitId: 'membrane', level: 'adv', def: '자극이 없을 때 뉴런 막 안쪽이 바깥보다 약 −70 mV 낮은 상태.' },
  { term: '활동 전위', en: 'action potential', unitId: 'membrane', level: 'adv', def: '역치 이상 자극으로 Na⁺가 유입되어 막전위가 순간 +로 뒤집히는 전기 신호.' },
  { term: '도약 전도', en: 'saltatory conduction', unitId: 'membrane', level: 'adv', def: '말이집이 있는 뉴런에서 활동 전위가 랑비에 결절만 건너뛰며 빠르게 전도되는 것.' },
  { term: '시냅스', en: 'synapse', unitId: 'membrane', level: 'adv', def: '뉴런과 뉴런이 만나는 틈. 신경 전달 물질이 분비되어 한 방향으로 신호를 전달한다.' },
  { term: '네프론', en: 'nephron', unitId: 'membrane', level: 'adv', def: '콩팥에서 오줌을 만드는 기본 단위. 사구체, 보먼주머니, 세뇨관으로 되어 있다.' },
  { term: '재흡수', en: 'reabsorption', unitId: 'membrane', level: 'adv', def: '세뇨관에서 포도당·아미노산·물 등 필요한 물질을 다시 모세 혈관으로 거두는 과정.' },

  // ----- 물질대사 -----
  { term: '물질대사', en: 'metabolism', unitId: 'metabolism', level: 'base', def: '생명체 안에서 일어나는 모든 화학 반응. 동화 작용과 이화 작용으로 나뉜다.' },
  { term: '동화 작용', en: 'anabolism', unitId: 'metabolism', level: 'base', def: '작은 분자를 큰 분자로 합성하며 에너지를 흡수하는 반응. 광합성, 단백질 합성.' },
  { term: '이화 작용', en: 'catabolism', unitId: 'metabolism', level: 'base', def: '큰 분자를 작은 분자로 분해하며 에너지를 방출하는 반응. 세포 호흡, 소화.' },
  { term: '효소', en: 'enzyme', unitId: 'metabolism', level: 'base', def: '활성화 에너지를 낮춰 반응 속도를 높이는 생체 촉매. 주성분은 단백질.' },
  { term: '활성화 에너지', en: 'activation energy', unitId: 'metabolism', level: 'base', def: '화학 반응이 시작되는 데 필요한 최소 에너지. 효소가 이것을 낮춘다.' },
  { term: '기질 특이성', en: 'substrate specificity', unitId: 'metabolism', level: 'base', def: '효소가 자기 모양에 맞는 특정 기질과만 결합해 작용하는 성질.' },
  { term: '광합성', en: 'photosynthesis', unitId: 'metabolism', level: 'base', def: '빛에너지로 이산화 탄소와 물에서 포도당과 산소를 만드는 반응. 엽록체에서 일어난다.' },
  { term: '세포 호흡', en: 'cellular respiration', unitId: 'metabolism', level: 'base', def: '포도당을 산소로 분해해 ATP를 얻는 반응. 주로 미토콘드리아에서 일어난다.' },
  { term: 'ATP', en: 'adenosine triphosphate', unitId: 'metabolism', level: 'base', def: '생명 활동의 에너지 화폐. 끝의 인산기가 떨어져 ADP가 될 때 에너지가 나온다.' },
  { term: '융털', en: 'villus', unitId: 'metabolism', level: 'adv', def: '소장 안쪽 벽의 손가락 모양 돌기. 표면적을 넓혀 영양소 흡수를 돕는다.' },
  { term: '폐순환', en: 'pulmonary circulation', unitId: 'metabolism', level: 'adv', def: '우심실 → 폐동맥 → 폐 → 폐정맥 → 좌심방. 혈액이 폐에서 산소를 얻는 경로.' },
  { term: '체순환', en: 'systemic circulation', unitId: 'metabolism', level: 'adv', def: '좌심실 → 대동맥 → 온몸 → 대정맥 → 우심방. 온몸에 산소와 영양소를 나르는 경로.' },
  { term: '요소', en: 'urea', unitId: 'metabolism', level: 'adv', def: '단백질 분해로 생긴 독성 암모니아를 간에서 바꾼 노폐물. 콩팥에서 오줌으로 나간다.' },
  { term: '기초 대사량', en: 'basal metabolic rate', unitId: 'metabolism', level: 'adv', def: '아무 활동을 하지 않아도 생명 유지에 필요한 최소 에너지량.' },

  // ----- 유전자 -----
  { term: '뉴클레오타이드', en: 'nucleotide', unitId: 'gene', level: 'base', def: 'DNA·RNA의 기본 단위. 인산, 당, 염기 하나씩으로 되어 있다.' },
  { term: '상보적 결합', en: 'complementary base pairing', unitId: 'gene', level: 'base', def: 'DNA 두 가닥에서 A는 T와, G는 C와만 짝을 이루는 규칙.' },
  { term: '유전자', en: 'gene', unitId: 'gene', level: 'base', def: 'DNA 중 특정 단백질을 만드는 정보가 담긴 부분.' },
  { term: '전사', en: 'transcription', unitId: 'gene', level: 'base', def: '핵 안에서 DNA의 염기 서열을 본떠 RNA를 만드는 과정.' },
  { term: '번역', en: 'translation', unitId: 'gene', level: 'base', def: '리보솜이 RNA의 코돈을 읽어 아미노산을 이어 단백질을 만드는 과정.' },
  { term: '코돈', en: 'codon', unitId: 'gene', level: 'base', def: 'RNA의 염기 3개 묶음. 아미노산 하나를 지정한다. AUG는 시작 코돈.' },
  { term: '중심 원리', en: 'central dogma', unitId: 'gene', level: 'base', def: '유전 정보가 DNA → RNA → 단백질로 흐른다는 원리.' },
  { term: '돌연변이', en: 'mutation', unitId: 'gene', level: 'base', def: 'DNA 염기 서열이나 염색체가 바뀌는 것. 변이의 근본 원천.' },
  { term: '대립유전자', en: 'allele', unitId: 'gene', level: 'adv', def: '한 형질을 결정하며 상동 염색체의 같은 위치에 있는 유전자 쌍 (예: R와 r).' },
  { term: '유전자형', en: 'genotype', unitId: 'gene', level: 'adv', def: '개체의 유전자 구성 (RR, Rr, rr). 겉으로 보이는 표현형과 구별한다.' },
  { term: '표현형', en: 'phenotype', unitId: 'gene', level: 'adv', def: '유전자형이 겉으로 드러난 형질 (둥근 완두, A형 혈액형).' },
  { term: '분리의 법칙', en: 'law of segregation', unitId: 'gene', level: 'adv', def: '생식세포를 만들 때 대립유전자 쌍이 나뉘어 하나씩 들어간다는 멘델의 법칙.' },
  { term: '독립의 법칙', en: 'law of independent assortment', unitId: 'gene', level: 'adv', def: '서로 다른 염색체에 있는 형질은 독립적으로 유전된다는 법칙. 9:3:3:1.' },
  { term: '복대립 유전', en: 'multiple alleles', unitId: 'gene', level: 'adv', def: '대립유전자가 셋 이상인 유전. ABO식 혈액형(A, B, O).' },
  { term: '반성 유전', en: 'sex-linked inheritance', unitId: 'gene', level: 'adv', def: '유전자가 X 염색체에 있어 성별에 따라 다르게 나타나는 유전. 적록 색맹, 혈우병.' },
  { term: '비분리', en: 'nondisjunction', unitId: 'gene', level: 'adv', def: '감수 분열 때 염색체가 제대로 나뉘지 않는 현상. 다운 증후군 등의 원인.' },
  { term: '다운 증후군', en: 'Down syndrome', unitId: 'gene', level: 'adv', def: '21번 염색체가 3개(총 47개)인 염색체 수 이상.' },

  // ----- 항상성 -----
  { term: '항상성', en: 'homeostasis', unitId: 'homeostasis', level: 'base', def: '바깥 환경이 변해도 체온, 혈당 등 몸속 환경을 일정하게 유지하려는 성질.' },
  { term: '음성 피드백', en: 'negative feedback', unitId: 'homeostasis', level: 'base', def: '결과가 원인을 억제해 원래 값으로 되돌리는 조절 방식. 항상성 유지의 기본.' },
  { term: '반사', en: 'reflex', unitId: 'homeostasis', level: 'base', def: '대뇌를 거치지 않고 척수 등이 바로 명령해 일어나는 빠르고 무의식적인 반응.' },
  { term: '시상 하부', en: 'hypothalamus', unitId: 'homeostasis', level: 'adv', def: '간뇌의 일부. 체온·혈당·삼투압 조절과 자율 신경·호르몬 분비의 중추.' },
  { term: '자율 신경계', en: 'autonomic nervous system', unitId: 'homeostasis', level: 'adv', def: '내장과 혈관을 무의식적으로 조절하는 말초 신경. 교감 신경과 부교감 신경이 길항 작용.' },
  { term: '호르몬', en: 'hormone', unitId: 'homeostasis', level: 'adv', def: '내분비샘에서 만들어져 혈액으로 운반되고 표적 기관에만 작용하는 화학 물질.' },
  { term: '인슐린', en: 'insulin', unitId: 'homeostasis', level: 'adv', def: '이자 β세포에서 분비되어 혈당을 낮추는 호르몬. 부족하면 당뇨병.' },
  { term: '글루카곤', en: 'glucagon', unitId: 'homeostasis', level: 'adv', def: '이자 α세포에서 분비되어 글리코젠을 분해해 혈당을 높이는 호르몬.' },
  { term: '항이뇨 호르몬', en: 'ADH, antidiuretic hormone', unitId: 'homeostasis', level: 'adv', def: '뇌하수체 후엽에서 분비되어 콩팥의 물 재흡수를 늘리는 호르몬.' },
  { term: '항원', en: 'antigen', unitId: 'homeostasis', level: 'adv', def: '몸에 들어와 면역 반응을 일으키는 물질. 병원체 표면의 단백질 등.' },
  { term: '항체', en: 'antibody', unitId: 'homeostasis', level: 'adv', def: 'B 림프구(형질 세포)가 만들어 특정 항원과 결합하는 단백질.' },
  { term: '기억 세포', en: 'memory cell', unitId: 'homeostasis', level: 'adv', def: '1차 면역 반응 뒤 남아 같은 항원이 다시 오면 빠르게 2차 반응을 일으키는 림프구.' },
  { term: '백신', en: 'vaccine', unitId: 'homeostasis', level: 'adv', def: '약화·사멸시킨 병원체나 항원 조각을 넣어 미리 기억 세포를 만드는 예방 수단.' },

  // ----- 생태계 -----
  { term: '생태계', en: 'ecosystem', unitId: 'ecosystem', level: 'base', def: '생물 요소(생산자·소비자·분해자)와 비생물 요소가 서로 영향을 주고받는 체계.' },
  { term: '생산자', en: 'producer', unitId: 'ecosystem', level: 'base', def: '광합성으로 스스로 양분을 만드는 생물. 식물, 조류.' },
  { term: '분해자', en: 'decomposer', unitId: 'ecosystem', level: 'base', def: '사체나 배설물을 분해해 무기물로 되돌리는 생물. 세균, 버섯.' },
  { term: '먹이 그물', en: 'food web', unitId: 'ecosystem', level: 'base', def: '여러 먹이 사슬이 그물처럼 얽힌 것. 복잡할수록 생태계가 안정적이다.' },
  { term: '생태 피라미드', en: 'ecological pyramid', unitId: 'ecosystem', level: 'base', def: '영양 단계가 올라갈수록 개체 수·생물량·에너지양이 줄어드는 모양.' },
  { term: '생태계 평형', en: 'ecological balance', unitId: 'ecosystem', level: 'base', def: '생태계의 생물 종류와 수가 큰 변화 없이 균형을 유지하는 상태.' },
  { term: '생물 다양성', en: 'biodiversity', unitId: 'ecosystem', level: 'base', def: '유전적 다양성, 종 다양성, 생태계 다양성을 아우르는 말.' },
  { term: '개체군', en: 'population', unitId: 'ecosystem', level: 'adv', def: '일정한 지역에 사는 같은 종의 개체 모임.' },
  { term: '환경 저항', en: 'environmental resistance', unitId: 'ecosystem', level: 'adv', def: '먹이 부족, 질병, 포식 등 개체군 생장을 억제하는 요인. S자형 생장 곡선의 원인.' },
  { term: '군집', en: 'community', unitId: 'ecosystem', level: 'adv', def: '한 지역에 사는 여러 개체군의 모임.' },
  { term: '우점종', en: 'dominant species', unitId: 'ecosystem', level: 'adv', def: '군집에서 개체 수나 생물량이 가장 많아 영향력이 큰 종.' },
  { term: '분서', en: 'niche partitioning', unitId: 'ecosystem', level: 'adv', def: '먹이나 공간을 나눠 써서 경쟁을 피하는 것. 생태적 지위 분화.' },
  { term: '천이', en: 'succession', unitId: 'ecosystem', level: 'adv', def: '군집이 시간에 따라 일정한 방향으로 바뀌어 가는 현상. 마지막 안정 상태가 극상.' },
  { term: '질소 고정', en: 'nitrogen fixation', unitId: 'ecosystem', level: 'adv', def: '대기 중 N₂를 생물이 쓸 수 있는 암모늄 이온으로 바꾸는 것. 뿌리혹박테리아, 번개.' },
  { term: '에너지 효율', en: 'energy efficiency', unitId: 'ecosystem', level: 'adv', def: '앞 영양 단계 에너지 중 다음 단계로 전달되는 비율. 보통 10 % 안팎.' },

  // ----- 진화 -----
  { term: '변이', en: 'variation', unitId: 'evolution', level: 'base', def: '같은 종의 개체 사이에서 나타나는 형질의 차이. 진화의 재료.' },
  { term: '자연 선택', en: 'natural selection', unitId: 'evolution', level: 'base', def: '환경에 더 알맞은 변이를 가진 개체가 살아남아 더 많은 자손을 남기는 과정.' },
  { term: '상동 기관', en: 'homologous organ', unitId: 'evolution', level: 'base', def: '기원은 같지만 기능이 달라진 기관. 사람 팔, 고래 지느러미, 박쥐 날개.' },
  { term: '흔적 기관', en: 'vestigial organ', unitId: 'evolution', level: 'base', def: '기능을 잃었지만 흔적으로 남은 기관. 사람 꼬리뼈.' },
  { term: '항생제 내성', en: 'antibiotic resistance', unitId: 'evolution', level: 'base', def: '항생제를 쓰면 내성 있는 세균만 살아남아 늘어나는 자연 선택의 사례.' },
  { term: '종', en: 'species', unitId: 'evolution', level: 'adv', def: '자연 상태에서 교배해 생식 능력이 있는 자손을 낳을 수 있는 집단.' },
  { term: '종 분화', en: 'speciation', unitId: 'evolution', level: 'adv', def: '하나의 종이 둘 이상의 종으로 갈라지는 것. 지리적 격리 → 생식적 격리.' },
  { term: '생식적 격리', en: 'reproductive isolation', unitId: 'evolution', level: 'adv', def: '두 집단이 다시 만나도 교배가 되지 않는 상태. 종 분화의 완성.' },
  { term: '학명', en: 'scientific name', unitId: 'evolution', level: 'adv', def: '린네의 이명법에 따라 속명 + 종소명을 라틴어로 쓴 이름. Homo sapiens.' },
  { term: '계통수', en: 'phylogenetic tree', unitId: 'evolution', level: 'adv', def: '생물의 진화적 관계를 나무 모양으로 그린 것. 가까운 가지일수록 가까운 관계.' },
  { term: '종 다양성', en: 'species diversity', unitId: 'evolution', level: 'adv', def: '종의 수(풍부도)와 각 종의 비율이 고른 정도(균등도)를 함께 나타낸 다양성.' },
];
