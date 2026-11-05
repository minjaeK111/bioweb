// 퀴즈 문제. unitId는 units.ts 의 id, level은 base(교과) / adv(심화).
// type 'ox'는 answer가 true/false, 'mc'(객관식)는 answer가 choices의 번호(0부터).
// 문제를 추가하려면 배열에 한 항목씩 넣으면 됩니다.

import type { Level } from './content';

export type Question =
  | { unitId: string; level: Level; type: 'ox'; q: string; answer: boolean; explain: string }
  | { unitId: string; level: Level; type: 'mc'; q: string; choices: string[]; answer: number; explain: string };

export const QUIZ: Question[] = [
  // ===== 세포 =====
  { unitId: 'cell', level: 'base', type: 'ox', q: '식물에는 기관계가 없고, 기관이 바로 개체를 이룬다.', answer: true, explain: '식물은 잎·줄기·뿌리 같은 기관이 모여 개체가 된다. 기관계는 동물에만 있는 단계다.' },
  { unitId: 'cell', level: 'base', type: 'mc', q: '세포 호흡으로 ATP를 만드는 세포 소기관은?', choices: ['핵', '미토콘드리아', '엽록체', '리보솜'], answer: 1, explain: '미토콘드리아는 세포의 발전소. 엽록체는 광합성, 리보솜은 단백질 합성, 핵은 조절을 맡는다.' },
  { unitId: 'cell', level: 'base', type: 'mc', q: '동물 세포에는 없고 식물 세포에만 있는 것을 모두 고른 것은?', choices: ['핵, 세포막', '세포벽, 엽록체', '미토콘드리아, 리보솜', '세포질, 소포체'], answer: 1, explain: '세포벽과 엽록체는 식물 세포의 특징. 나머지는 동물·식물 세포 모두에 있다.' },
  { unitId: 'cell', level: 'base', type: 'ox', q: '세균은 핵막이 없는 원핵세포로 되어 있다.', answer: true, explain: '원핵세포는 핵막이 없어 DNA가 세포질에 그대로 있다. 세균과 남세균이 여기에 속한다.' },
  { unitId: 'cell', level: 'adv', type: 'mc', q: '세포 주기에서 DNA가 복제되는 시기는?', choices: ['G1기', 'S기', 'G2기', 'M기'], answer: 1, explain: 'S기(합성기)에 DNA가 복제되어 양이 2배가 된다. M기는 분열기.' },
  { unitId: 'cell', level: 'adv', type: 'mc', q: '감수 분열에 대한 설명으로 옳은 것은?', choices: ['1회 분열로 딸세포 2개를 만든다', '염색체 수가 2n → 2n으로 유지된다', '상동 염색체가 접합해 2가 염색체를 만든다', '생장과 재생에 쓰인다'], answer: 2, explain: '감수 분열은 2회 분열, 2n → n, 딸세포 4개이며 감수 1분열 전기에 상동 염색체가 접합한다. 나머지는 체세포 분열의 특징.' },
  { unitId: 'cell', level: 'adv', type: 'ox', q: '바이러스는 스스로 물질대사를 할 수 있어 생물로 분류된다.', answer: false, explain: '바이러스는 세포 구조가 없고 스스로 물질대사를 못 해 숙주 세포 안에서만 증식한다. 생물과 무생물의 중간 특성.' },

  // ===== 세포막 =====
  { unitId: 'membrane', level: 'base', type: 'mc', q: '적혈구를 증류수(저장액)에 넣으면?', choices: ['쭈그러든다', '변화 없다', '물이 들어와 터진다', '원형질 분리가 일어난다'], answer: 2, explain: '저장액에서는 물이 세포 안으로 들어온다(삼투). 적혈구는 세포벽이 없어 터진다(용혈). 원형질 분리는 식물 세포가 고장액에 있을 때.' },
  { unitId: 'membrane', level: 'base', type: 'ox', q: '확산은 물질이 농도가 낮은 곳에서 높은 곳으로 이동하는 현상이다.', answer: false, explain: '확산은 높은 농도 → 낮은 농도. 낮은 → 높은 농도로 가려면 에너지를 쓰는 능동 수송이 필요하다.' },
  { unitId: 'membrane', level: 'base', type: 'mc', q: '세포막의 기본 구조는?', choices: ['단백질 2중층', '인지질 2중층에 단백질이 끼어 있음', '셀룰로스 섬유', '핵산 2중 나선'], answer: 1, explain: '세포막은 인지질 2중층에 막단백질이 박혀 있고, 이들이 움직이는 유동 모자이크 구조다.' },
  { unitId: 'membrane', level: 'base', type: 'ox', q: '능동 수송에는 ATP 에너지가 필요하다.', answer: true, explain: '농도 기울기를 거슬러 옮기므로 막단백질이 ATP를 쓴다. 예) 나트륨-칼륨 펌프.' },
  { unitId: 'membrane', level: 'adv', type: 'mc', q: '활동 전위의 탈분극 때 일어나는 일은?', choices: ['K⁺가 밖으로 확산', 'Na⁺가 안으로 확산', 'Na⁺-K⁺ 펌프가 멈춤', 'Cl⁻가 안으로 확산'], answer: 1, explain: '역치 이상 자극으로 Na⁺ 통로가 열려 Na⁺가 안으로 들어와 막 안이 +가 된다. 재분극은 K⁺ 유출.' },
  { unitId: 'membrane', level: 'adv', type: 'ox', q: '시냅스에서 흥분은 양방향으로 전달될 수 있다.', answer: false, explain: '신경 전달 물질은 축삭 말단에서만 분비되므로 흥분은 축삭 말단 → 다음 뉴런의 한 방향으로만 전달된다.' },
  { unitId: 'membrane', level: 'adv', type: 'mc', q: '건강한 사람의 오줌에 포도당이 나오지 않는 이유는?', choices: ['사구체에서 여과되지 않아서', '세뇨관에서 100 % 재흡수되어서', '방광에서 분해되어서', '간에서 모두 글리코젠으로 바뀌어서'], answer: 1, explain: '포도당은 여과된 뒤 세뇨관에서 능동 수송으로 전부 재흡수된다. 당뇨병은 혈당이 너무 높아 재흡수 한계를 넘는 경우.' },

  // ===== 물질대사 =====
  { unitId: 'metabolism', level: 'base', type: 'mc', q: '효소가 반응 속도를 높이는 원리는?', choices: ['반응물의 양을 늘린다', '활성화 에너지를 낮춘다', '온도를 높인다', '생성물을 제거한다'], answer: 1, explain: '효소는 반응이 시작되는 데 필요한 활성화 에너지를 낮춰 체온에서도 반응이 빠르게 일어나게 한다.' },
  { unitId: 'metabolism', level: 'base', type: 'ox', q: '광합성은 에너지를 흡수하는 동화 작용이고, 세포 호흡은 에너지를 방출하는 이화 작용이다.', answer: true, explain: '광합성: 작은 분자 → 포도당(합성, 흡수). 세포 호흡: 포도당 → 작은 분자(분해, 방출).' },
  { unitId: 'metabolism', level: 'base', type: 'mc', q: '효소를 100 ℃로 가열하면 작용을 잃는 이유는?', choices: ['기질이 사라져서', '단백질 구조가 변성되어서', 'ATP가 분해되어서', '물이 증발해서'], answer: 1, explain: '효소의 주성분은 단백질이라 높은 온도에서 입체 구조가 망가져(변성) 기질과 결합하지 못한다.' },
  { unitId: 'metabolism', level: 'base', type: 'ox', q: 'ATP의 끝 인산기가 떨어져 ADP가 될 때 에너지가 방출된다.', answer: true, explain: 'ATP → ADP + 인산 반응에서 나온 에너지가 근육 수축, 능동 수송 등 모든 생명 활동에 쓰인다.' },
  { unitId: 'metabolism', level: 'adv', type: 'mc', q: '단백질 분해로 생긴 암모니아를 독성이 적은 요소로 바꾸는 기관은?', choices: ['콩팥', '간', '소장', '폐'], answer: 1, explain: '간이 암모니아를 요소로 바꾸고, 콩팥이 요소를 오줌으로 내보낸다.' },
  { unitId: 'metabolism', level: 'adv', type: 'mc', q: '소장에서 흡수된 지방산과 모노글리세리드가 먼저 들어가는 곳은?', choices: ['모세 혈관', '암죽관(림프관)', '간문맥', '대동맥'], answer: 1, explain: '포도당·아미노산은 모세 혈관으로, 지방산·모노글리세리드는 융털의 암죽관(림프관)으로 흡수된다.' },
  { unitId: 'metabolism', level: 'adv', type: 'ox', q: '섭취한 에너지가 소비한 에너지보다 많으면 남는 에너지가 지방으로 저장된다.', answer: true, explain: '에너지 불균형이 오래 지속되면 비만으로 이어지고, 당뇨병·고혈압 같은 대사 질환 위험이 커진다.' },

  // ===== 유전자 =====
  { unitId: 'gene', level: 'base', type: 'mc', q: 'DNA 한 가닥의 염기 서열이 ATGC일 때 맞은편 가닥은?', choices: ['ATGC', 'TACG', 'UACG', 'GCAT'], answer: 1, explain: 'A–T, G–C 상보적 결합. DNA에는 U가 없다(U는 RNA).' },
  { unitId: 'gene', level: 'base', type: 'mc', q: '유전 정보의 흐름(중심 원리)을 바르게 나타낸 것은?', choices: ['단백질 → RNA → DNA', 'RNA → DNA → 단백질', 'DNA → RNA → 단백질', 'DNA → 단백질 → RNA'], answer: 2, explain: 'DNA가 전사되어 RNA가 되고, RNA가 번역되어 단백질이 된다.' },
  { unitId: 'gene', level: 'base', type: 'ox', q: '코돈은 RNA 염기 3개의 묶음으로 아미노산 하나를 지정한다.', answer: true, explain: '리보솜이 RNA를 3개씩 읽는다. AUG는 시작 코돈, UAA·UAG·UGA는 종결 코돈.' },
  { unitId: 'gene', level: 'base', type: 'ox', q: '낫 모양 적혈구 빈혈증은 염색체 수가 바뀌어 생긴다.', answer: false, explain: '헤모글로빈 유전자의 염기 하나가 바뀐 유전자 돌연변이다. 염색체 수·구조는 정상.' },
  { unitId: 'gene', level: 'adv', type: 'mc', q: 'Rr × Rr 교배에서 열성 표현형이 나올 확률은?', choices: ['0', '1/4', '1/2', '3/4'], answer: 1, explain: 'RR : Rr : rr = 1 : 2 : 1 이므로 열성(rr)은 1/4.' },
  { unitId: 'gene', level: 'adv', type: 'mc', q: '적록 색맹인 어머니(XᵃXᵃ)와 정상 아버지(XᴬY) 사이에서 아들이 색맹일 확률은?', choices: ['0', '1/4', '1/2', '1(100 %)'], answer: 3, explain: '아들은 어머니에게서 X를 받는데 어머니의 X는 모두 Xᵃ이므로 아들은 반드시 색맹. 딸은 모두 보인자.' },
  { unitId: 'gene', level: 'adv', type: 'mc', q: '다운 증후군의 원인은?', choices: ['21번 염색체가 3개', 'X 염색체가 하나뿐(XO)', '5번 염색체 일부 결실', '헤모글로빈 유전자 변화'], answer: 0, explain: '다운 증후군은 감수 분열 때 비분리로 21번 염색체가 3개(총 47개)가 된 염색체 수 이상. XO는 터너 증후군, 5번 결실은 고양이 울음 증후군.' },

  // ===== 항상성 =====
  { unitId: 'homeostasis', level: 'base', type: 'ox', q: '항상성은 결과가 원인을 억제하는 음성 피드백으로 주로 유지된다.', answer: true, explain: '체온이 오르면 땀이 나서 체온이 내려가고, 내려가면 땀이 멈춘다. 난방 온도 조절기와 같은 원리.' },
  { unitId: 'homeostasis', level: 'base', type: 'mc', q: '뜨거운 것에 손이 닿았을 때 생각하기 전에 손을 떼게 하는 중추는?', choices: ['대뇌', '소뇌', '척수', '연수'], answer: 2, explain: '척수 반사. 대뇌를 거치지 않아 빠르다. 대뇌는 나중에 "뜨겁다"고 느낀다.' },
  { unitId: 'homeostasis', level: 'base', type: 'ox', q: '체온을 일정하게 유지하는 이유 중 하나는 효소가 특정 온도에서만 잘 작용하기 때문이다.', answer: true, explain: '사람의 효소는 37 ℃ 근처에서 가장 잘 작용한다. 체온이 크게 벗어나면 물질대사가 흔들린다.' },
  { unitId: 'homeostasis', level: 'adv', type: 'mc', q: '식사 후 혈당이 올랐을 때 분비되어 혈당을 낮추는 호르몬은?', choices: ['글루카곤', '인슐린', '티록신', '에피네프린'], answer: 1, explain: '인슐린(이자 β세포)은 포도당을 글리코젠으로 저장하게 해 혈당을 낮춘다. 글루카곤·에피네프린은 혈당을 높인다.' },
  { unitId: 'homeostasis', level: 'adv', type: 'mc', q: '교감 신경이 흥분했을 때 나타나는 반응은?', choices: ['심장 박동 느려짐', '소화 활동 촉진', '동공 확대', '기관지 수축'], answer: 2, explain: '교감 신경은 긴장·위급 상황 대비: 심박 ↑, 동공 확대, 소화 ↓, 기관지 확장. 부교감 신경은 반대.' },
  { unitId: 'homeostasis', level: 'adv', type: 'ox', q: '백신은 기억 세포를 미리 만들어 두어 2차 면역 반응이 빠르게 일어나게 한다.', answer: true, explain: '약화·사멸한 병원체로 1차 면역 반응을 일으켜 기억 세포를 남긴다. 실제 감염 때 항체가 빠르고 많이 만들어진다.' },
  { unitId: 'homeostasis', level: 'adv', type: 'mc', q: '땀을 많이 흘려 체액 농도가 높아졌을 때 몸의 반응은?', choices: ['ADH 분비 감소, 오줌 양 증가', 'ADH 분비 증가, 오줌 양 감소', '인슐린 분비 증가', '티록신 분비 감소'], answer: 1, explain: '시상 하부가 감지 → 뇌하수체 후엽에서 항이뇨 호르몬(ADH) ↑ → 콩팥 물 재흡수 ↑ → 오줌 양 ↓, 진해짐.' },

  // ===== 생태계 =====
  { unitId: 'ecosystem', level: 'base', type: 'mc', q: '사체와 배설물을 분해해 무기물로 되돌리는 생물은?', choices: ['생산자', '1차 소비자', '최종 소비자', '분해자'], answer: 3, explain: '분해자(세균, 버섯)가 있어야 물질이 다시 생산자에게 돌아간다.' },
  { unitId: 'ecosystem', level: 'base', type: 'ox', q: '먹이 그물이 복잡할수록 생태계는 불안정해진다.', answer: false, explain: '복잡할수록 한 종이 사라져도 다른 먹이로 대체되므로 더 안정적이다.' },
  { unitId: 'ecosystem', level: 'base', type: 'mc', q: '"추운 지방의 동물일수록 몸집이 크다"는 어떤 관계의 예인가?', choices: ['작용 (환경 → 생물)', '반작용 (생물 → 환경)', '상호 작용 (생물 ↔ 생물)', '천이'], answer: 0, explain: '온도(환경)가 생물의 형질에 영향을 준 작용의 예. 지렁이가 흙을 기름지게 하는 것은 반작용.' },
  { unitId: 'ecosystem', level: 'base', type: 'mc', q: '생물 다양성의 세 수준에 들지 않는 것은?', choices: ['유전적 다양성', '종 다양성', '생태계 다양성', '개체 수 다양성'], answer: 3, explain: '생물 다양성 = 유전적 다양성 + 종 다양성 + 생태계 다양성.' },
  { unitId: 'ecosystem', level: 'adv', type: 'mc', q: '개체군의 실제 생장 곡선이 S자형이 되는 이유는?', choices: ['출생률이 0이 되어서', '환경 저항 때문에', '포식자가 없어서', '먹이가 무한해서'], answer: 1, explain: '먹이 부족, 서식지 부족, 질병, 포식 같은 환경 저항으로 생장이 둔해져 환경 수용력에 가까워진다.' },
  { unitId: 'ecosystem', level: 'adv', type: 'mc', q: '콩과 식물과 뿌리혹박테리아의 관계는?', choices: ['기생', '경쟁', '상리 공생', '편리 공생'], answer: 2, explain: '식물은 질소 화합물을, 박테리아는 양분을 얻어 둘 다 이익인 상리 공생.' },
  { unitId: 'ecosystem', level: 'adv', type: 'ox', q: '생태계에서 물질은 순환하지만 에너지는 한 방향으로 흐르다 열로 빠져나간다.', answer: true, explain: '탄소·질소는 돌고 돌지만, 에너지는 생산자 → 소비자로 가며 대부분 열로 사라져 계속 빛에너지가 공급되어야 한다.' },

  // ===== 진화 =====
  { unitId: 'evolution', level: 'base', type: 'mc', q: '다윈의 자연 선택설 순서로 옳은 것은?', choices: ['자연 선택 → 변이 → 과잉 생산 → 생존 경쟁', '과잉 생산 → 변이 → 생존 경쟁 → 자연 선택', '생존 경쟁 → 과잉 생산 → 변이 → 자연 선택', '변이 → 자연 선택 → 과잉 생산 → 생존 경쟁'], answer: 1, explain: '많이 낳고(과잉 생산), 서로 다르며(변이), 경쟁하다(생존 경쟁), 환경에 맞는 개체가 살아남는다(자연 선택).' },
  { unitId: 'evolution', level: 'base', type: 'ox', q: '항생제를 쓰면 세균이 내성을 "만들어 내므로" 항생제 내성 세균이 생긴다.', answer: false, explain: '세균이 필요에 따라 내성을 만드는 것이 아니라, 우연히 내성 변이를 가진 세균만 살아남아 번식한 것(자연 선택).' },
  { unitId: 'evolution', level: 'base', type: 'mc', q: '사람의 팔, 고래의 지느러미, 박쥐의 날개처럼 기원은 같고 기능이 다른 기관은?', choices: ['흔적 기관', '상동 기관', '상사 기관', '감각 기관'], answer: 1, explain: '상동 기관은 공통 조상에서 유래했다는 진화의 증거. 흔적 기관은 사람 꼬리뼈처럼 기능을 잃은 것.' },
  { unitId: 'evolution', level: 'base', type: 'ox', q: '자연 선택은 "가장 강한 개체"가 아니라 "그 환경에 가장 알맞은 개체"를 고른다.', answer: true, explain: '환경이 바뀌면 유리한 형질도 바뀐다. 후추나방은 검댕이 많아지자 검은 나방이 유리해졌다.' },
  { unitId: 'evolution', level: 'adv', type: 'mc', q: '말과 당나귀 사이에서 태어난 노새는 생식 능력이 없다. 이것이 말해 주는 것은?', choices: ['말과 당나귀는 같은 종이다', '말과 당나귀는 다른 종이다', '노새는 새로운 종이다', '말은 당나귀에서 진화했다'], answer: 1, explain: '종은 교배해 생식 능력이 있는 자손을 낳는 집단. 노새가 불임이므로 말과 당나귀는 다른 종.' },
  { unitId: 'evolution', level: 'adv', type: 'mc', q: '지리적 격리에 의한 종 분화의 마지막 단계는?', choices: ['돌연변이 발생', '서식지 분리', '생식적 격리', '유전적 다양성 감소'], answer: 2, explain: '격리 → 서로 다른 돌연변이·자연 선택 → 다시 만나도 교배가 안 되는 생식적 격리 → 다른 종.' },
  { unitId: 'evolution', level: 'adv', type: 'mc', q: '3역 분류 체계에서 "역"에 해당하지 않는 것은?', choices: ['세균역', '고세균역', '진핵생물역', '동물역'], answer: 3, explain: '3역은 세균역, 고세균역, 진핵생물역. 동물은 진핵생물역 안의 동물계.' },
];
