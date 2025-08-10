// 경주 관광지 목업 데이터
export const mockAttractions = [
  {
    contentid: '126508',
    contenttypeid: '12',
    title: '불국사',
    addr1: '경상북도 경주시 진현동 15-1',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2678623_image3_1.jpg',
    mapx: '129.3320',
    mapy: '35.7898',
    tel: '054-746-9913',
    overview: '불국사는 신라 경덕왕 10년(751)에 재상 김대성이 창건한 사찰로, 석굴암과 함께 1995년 유네스코 세계문화유산으로 등재되었습니다. 대웅전, 극락전, 비로전 등의 건물과 다보탑, 석가탑 등의 석조문화재가 조화를 이루고 있습니다.',
    modifiedtime: '20241201000000'
  },
  {
    contentid: '126509',
    contenttypeid: '12',
    title: '석굴암',
    addr1: '경상북도 경주시 진현동 999',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2678723_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2678723_image3_1.jpg',
    mapx: '129.3475',
    mapy: '35.7947',
    tel: '054-746-9933',
    overview: '석굴암은 신라 경덕왕 10년(751)에 재상 김대성이 창건한 석굴 사원입니다. 본존불인 석가여래좌상을 중심으로 보살상과 제자상, 천왕상 등이 배치되어 있으며, 동양 조각 예술의 걸작으로 평가받고 있습니다.',
    modifiedtime: '20241201000000'
  },
  {
    contentid: '126510',
    contenttypeid: '12',
    title: '첨성대',
    addr1: '경상북도 경주시 인왕동 839-1',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2678823_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2678823_image3_1.jpg',
    mapx: '129.2194',
    mapy: '35.8347',
    tel: '054-779-6394',
    overview: '첨성대는 신라 선덕여왕 때(632~647) 건립된 동양에서 가장 오래된 천문대입니다. 높이 9.17m의 석조 건축물로, 천체 관측과 농업 달력 제작에 사용되었으며, 신라의 과학 기술 수준을 보여주는 귀중한 문화재입니다.',
    modifiedtime: '20241201000000'
  },
  {
    contentid: '126511',
    contenttypeid: '12',
    title: '안압지(동궁과 월지)',
    addr1: '경상북도 경주시 원화로 102',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2678923_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2678923_image3_1.jpg',
    mapx: '129.2244',
    mapy: '35.8342',
    tel: '054-750-8655',
    overview: '안압지는 신라 문무왕 14년(674)에 조성된 궁궐의 별궁 연못입니다. 동궁은 왕세자가 거처하던 곳이며, 월지는 달이 비치는 연못이라는 뜻입니다. 야경이 특히 아름다워 많은 관광객들이 찾는 명소입니다.',
    modifiedtime: '20241201000000'
  },
  {
    contentid: '126512',
    contenttypeid: '12',
    title: '대릉원(천마총)',
    addr1: '경상북도 경주시 황남동 120-3',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2679023_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2679023_image3_1.jpg',
    mapx: '129.2194',
    mapy: '35.8297',
    tel: '054-750-8650',
    overview: '대릉원은 신라 왕족과 귀족들의 무덤이 모여 있는 고분군입니다. 천마총에서는 천마도가 그려진 자작나무 껍질이 발견되어 천마총이라 불리게 되었습니다. 23기의 고분이 공원으로 조성되어 있습니다.',
    modifiedtime: '20241201000000'
  },
  {
    contentid: '126513',
    contenttypeid: '12',
    title: '국립경주박물관',
    addr1: '경상북도 경주시 일정로 186',
    addr2: '',
    areacode: '35',
    sigungucode: '2',
    firstimage: 'https://tong.visitkorea.or.kr/cms/resource/23/2679123_image2_1.jpg',
    firstimage2: 'https://tong.visitkorea.or.kr/cms/resource/23/2679123_image3_1.jpg',
    mapx: '129.2281',
    mapy: '35.8356',
    tel: '054-740-7500',
    overview: '국립경주박물관은 신라 천년의 문화유산을 전시하는 대표적인 박물관입니다. 성덕대왕신종(에밀레종), 금관, 토우 등 신라의 찬란한 문화를 보여주는 유물들이 전시되어 있습니다.',
    modifiedtime: '20241201000000'
  }
];

export const mockTourApiResponse = {
  response: {
    header: {
      resultCode: "0000",
      resultMsg: "OK"
    },
    body: {
      items: {
        item: mockAttractions
      },
      numOfRows: 20,
      pageNo: 1,
      totalCount: mockAttractions.length
    }
  }
};