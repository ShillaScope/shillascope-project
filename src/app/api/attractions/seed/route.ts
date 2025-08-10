import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sampleAttractions = [
  {
    id: '126508',
    title: '불국사',
    content_type_id: '12',
    area_code: '35',
    sigungu_code: '2',
    first_image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg',
    first_image2: null,
    map_x: '129.3320',
    map_y: '35.7898',
    addr1: '경상북도 경주시 진현동 15-1',
    addr2: null,
    tel: '054-746-9913',
    overview: '불국사는 신라 경덕왕 10년(751)에 재상 김대성이 창건한 사찰로, 석굴암과 함께 1995년 유네스코 세계문화유산으로 등재되었습니다.',
    data_hash: 'sample1'
  },
  {
    id: '126509',
    title: '석굴암',
    content_type_id: '12',
    area_code: '35',
    sigungu_code: '2',
    first_image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678723_image2_1.jpg',
    first_image2: null,
    map_x: '129.3479',
    map_y: '35.7947',
    addr1: '경상북도 경주시 진현동 999',
    addr2: null,
    tel: '054-746-9933',
    overview: '석굴암은 신라 경덕왕 10년(751)에 김대성이 창건한 석굴 사원으로, 불국사와 함께 유네스코 세계문화유산입니다.',
    data_hash: 'sample2'
  },
  {
    id: '126510',
    title: '첨성대',
    content_type_id: '12',
    area_code: '35',
    sigungu_code: '2',
    first_image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678823_image2_1.jpg',
    first_image2: null,
    map_x: '129.2194',
    map_y: '35.8347',
    addr1: '경상북도 경주시 인왕동 839-1',
    addr2: null,
    tel: '054-779-6394',
    overview: '첨성대는 신라 선덕여왕 때 건립된 동양에서 가장 오래된 천문대로, 국보 제31호입니다.',
    data_hash: 'sample3'
  },
  {
    id: '126511',
    title: '안압지',
    content_type_id: '12',
    area_code: '35',
    sigungu_code: '2',
    first_image: 'https://tong.visitkorea.or.kr/cms/resource/23/2678923_image2_1.jpg',
    first_image2: null,
    map_x: '129.2244',
    map_y: '35.8342',
    addr1: '경상북도 경주시 인왕동 76-2',
    addr2: null,
    tel: '054-750-8655',
    overview: '안압지는 신라 문무왕 14년(674)에 조성된 궁궐의 별궁 연못으로, 야경이 아름답기로 유명합니다.',
    data_hash: 'sample4'
  },
  {
    id: '126512',
    title: '대릉원',
    content_type_id: '12',
    area_code: '35',
    sigungu_code: '2',
    first_image: 'https://tong.visitkorea.or.kr/cms/resource/23/2679023_image2_1.jpg',
    first_image2: null,
    map_x: '129.2147',
    map_y: '35.8394',
    addr1: '경상북도 경주시 황남동 40-2',
    addr2: null,
    tel: '054-750-8650',
    overview: '대릉원은 신라 왕과 왕족들의 무덤이 모여 있는 고분공원으로, 천마총이 가장 유명합니다.',
    data_hash: 'sample5'
  }
];

export async function POST(request: NextRequest) {
  try {
    console.log('Seeding attractions data...');
    
    // 기존 데이터 확인
    const { data: existing } = await supabase
      .from('attractions')
      .select('id');
    
    if (existing && existing.length > 0) {
      return NextResponse.json({
        message: 'Data already exists',
        count: existing.length
      });
    }
    
    // 샘플 데이터 삽입
    const { data, error } = await supabase
      .from('attractions')
      .insert(sampleAttractions)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to seed attractions', details: error.message },
        { status: 500 }
      );
    }

    console.log(`Seeded ${data?.length || 0} attractions`);
    
    return NextResponse.json({
      message: 'Attractions seeded successfully',
      data: data,
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}