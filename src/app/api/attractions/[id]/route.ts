import { NextRequest, NextResponse } from 'next/server';
import { mockAttractions } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 목업 데이터에서 해당 ID 찾기
    const attraction = mockAttractions.find(item => item.contentid === id);

    if (!attraction) {
      return NextResponse.json(
        { error: 'Attraction not found' },
        { status: 404 }
      );
    }

    const detailData = {
      id: attraction.contentid,
      title: attraction.title,
      contentTypeId: attraction.contenttypeid,
      areaCode: attraction.areacode,
      sigunguCode: attraction.sigungucode,
      firstImage: attraction.firstimage || null,
      firstImage2: attraction.firstimage2 || null,
      mapX: attraction.mapx,
      mapY: attraction.mapy,
      addr1: attraction.addr1,
      addr2: attraction.addr2 || null,
      tel: attraction.tel || null,
      overview: attraction.overview || null,
      homepage: null
    };

    return NextResponse.json(detailData, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate=1200'
      }
    });

  } catch (error) {
    console.error('Attraction detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attraction details' },
      { status: 500 }
    );
  }
}