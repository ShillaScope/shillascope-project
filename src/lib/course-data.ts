// 경주 관광 코스 데이터
export interface CourseStop {
  attractionId: string;
  title: string;
  duration: number; // 분
  description: string;
  tips?: string;
}

export interface TourCourse {
  id: string;
  title: string;
  description: string;
  duration: string; // "반나절", "1일", "2일" 등
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
  image: string;
  stops: CourseStop[];
  totalDistance: string;
  recommendedSeason: string[];
  tags: string[];
}

export const tourCourses: TourCourse[] = [
  {
    id: 'heritage-1day',
    title: '신라 문화유산 1일 코스',
    description: '경주의 대표적인 유네스코 세계문화유산을 하루에 둘러보는 코스입니다.',
    duration: '1일',
    difficulty: 'easy',
    theme: '문화유산',
    image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg',
    stops: [
      {
        attractionId: '126508',
        title: '불국사',
        duration: 120,
        description: '신라 불교 예술의 걸작, 석가탑과 다보탑 관람',
        tips: '오전 일찍 방문하면 관광객이 적어 좋습니다.'
      },
      {
        attractionId: '126509',
        title: '석굴암',
        duration: 90,
        description: '동양 조각 예술의 백미, 석가여래좌상 감상',
        tips: '불국사에서 차로 10분 거리입니다.'
      },
      {
        attractionId: '126513',
        title: '국립경주박물관',
        duration: 120,
        description: '신라 천년의 역사와 문화를 한눈에',
        tips: '에밀레종은 꼭 보세요!'
      },
      {
        attractionId: '126511',
        title: '안압지(동궁과 월지)',
        duration: 90,
        description: '신라 왕궁의 별궁, 아름다운 야경 명소',
        tips: '해질 무렵 방문하면 더욱 아름답습니다.'
      }
    ],
    totalDistance: '약 25km',
    recommendedSeason: ['봄', '가을'],
    tags: ['유네스코', '문화유산', '사찰', '박물관', '야경']
  },
  {
    id: 'ancient-tombs',
    title: '신라 왕릉 탐방 코스',
    description: '신라 왕과 귀족들의 무덤을 통해 고대 문명을 체험하는 코스입니다.',
    duration: '반나절',
    difficulty: 'easy',
    theme: '역사탐방',
    image: 'https://tong.visitkorea.or.kr/cms/resource/23/2679023_image2_1.jpg',
    stops: [
      {
        attractionId: '126512',
        title: '대릉원(천마총)',
        duration: 90,
        description: '신라 고분군과 천마도 유물 관람',
        tips: '천마총 내부 관람이 가능합니다.'
      },
      {
        attractionId: '126510',
        title: '첨성대',
        duration: 60,
        description: '동양 최고(最古)의 천문대',
        tips: '대릉원에서 도보 10분 거리입니다.'
      },
      {
        attractionId: '126511',
        title: '안압지(동궁과 월지)',
        duration: 90,
        description: '신라 왕궁의 별궁 연못',
        tips: '낮과 밤의 풍경이 모두 아름답습니다.'
      }
    ],
    totalDistance: '약 5km',
    recommendedSeason: ['봄', '여름', '가을'],
    tags: ['고분', '천문대', '왕궁', '도보코스']
  },
  {
    id: 'nature-temple',
    title: '자연과 사찰 힐링 코스',
    description: '경주의 아름다운 자연과 고즈넉한 사찰에서 마음의 평안을 찾는 코스입니다.',
    duration: '1일',
    difficulty: 'medium',
    theme: '힐링',
    image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678723_image2_1.jpg',
    stops: [
      {
        attractionId: '126508',
        title: '불국사',
        duration: 150,
        description: '신라 불교 문화의 정수, 천천히 둘러보기',
        tips: '템플스테이 프로그램도 운영합니다.'
      },
      {
        attractionId: '126509',
        title: '석굴암',
        duration: 120,
        description: '토함산 정상 근처의 석굴 사원',
        tips: '등산로를 이용하면 더욱 의미 있는 여행이 됩니다.'
      }
    ],
    totalDistance: '약 15km',
    recommendedSeason: ['봄', '가을'],
    tags: ['사찰', '자연', '힐링', '등산', '템플스테이']
  },
  {
    id: 'family-friendly',
    title: '가족 여행 추천 코스',
    description: '아이들과 함께 즐길 수 있는 교육적이고 재미있는 경주 여행 코스입니다.',
    duration: '1일',
    difficulty: 'easy',
    theme: '가족여행',
    image: 'https://tong.visitkorea.or.kr/cms/resource/23/2679123_image2_1.jpg',
    stops: [
      {
        attractionId: '126513',
        title: '국립경주박물관',
        duration: 120,
        description: '어린이 체험 프로그램과 함께하는 역사 학습',
        tips: '어린이 박물관 체험 프로그램을 미리 예약하세요.'
      },
      {
        attractionId: '126512',
        title: '대릉원(천마총)',
        duration: 90,
        description: '고분 내부 탐험과 천마도 이야기',
        tips: '아이들이 좋아하는 고분 내부 체험이 가능합니다.'
      },
      {
        attractionId: '126510',
        title: '첨성대',
        duration: 60,
        description: '별과 우주에 대한 이야기',
        tips: '천문학에 관심 있는 아이들에게 특히 좋습니다.'
      },
      {
        attractionId: '126511',
        title: '안압지(동궁과 월지)',
        duration: 90,
        description: '아름다운 연못과 야경 감상',
        tips: '연못 주변 산책로가 잘 조성되어 있습니다.'
      }
    ],
    totalDistance: '약 8km',
    recommendedSeason: ['봄', '여름', '가을'],
    tags: ['가족여행', '체험', '교육', '어린이', '산책']
  }
];

export const getDifficultyLabel = (difficulty: TourCourse['difficulty']) => {
  switch (difficulty) {
    case 'easy': return '쉬움';
    case 'medium': return '보통';
    case 'hard': return '어려움';
    default: return '쉬움';
  }
};

export const getDifficultyColor = (difficulty: TourCourse['difficulty']) => {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'hard': return 'text-red-600 bg-red-100';
    default: return 'text-green-600 bg-green-100';
  }
};