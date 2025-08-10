const TOUR_API_BASE_URL = 'https://apis.data.go.kr/B551011/KorService1';
const TOUR_API_KEY = process.env.TOUR_API_KEY!;

// 경주 지역코드
export const GYEONGJU_AREA_CODE = '35';
export const GYEONGJU_SIGUNGU_CODE = '2';

export interface TourApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface AttractionItem {
  contentid: string;
  contenttypeid: string;
  title: string;
  addr1: string;
  addr2?: string;
  areacode: string;
  sigungucode: string;
  firstimage?: string;
  firstimage2?: string;
  mapx: string;
  mapy: string;
  tel?: string;
  overview?: string;
  readcount?: string;
  modifiedtime: string;
}

export class TourApiService {
  private async fetchTourApi<T>(endpoint: string, params: Record<string, string>): Promise<TourApiResponse<T>> {
    const url = new URL(`${TOUR_API_BASE_URL}/${endpoint}`);
    
    const defaultParams = {
      serviceKey: decodeURIComponent(TOUR_API_KEY), // API 키 디코딩
      MobileOS: 'ETC',
      MobileApp: 'GyeongjuApp',
      _type: 'json',
    };

    Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log('TourAPI Request URL:', url.toString());

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 } // 1시간 캐시
    });

    const responseText = await response.text();
    console.log('TourAPI Raw Response:', responseText.substring(0, 500));

    if (!response.ok) {
      console.error('TourAPI Response Error:', response.status, response.statusText);
      throw new Error(`TourAPI request failed: ${response.status} - ${responseText.substring(0, 200)}`);
    }

    try {
      const data = JSON.parse(responseText);
      console.log('TourAPI Response:', JSON.stringify(data, null, 2));
      return data;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}`);
    }
  }

  async getAttractionsByArea(pageNo = 1, numOfRows = 20): Promise<TourApiResponse<AttractionItem>> {
    return this.fetchTourApi<AttractionItem>('areaBasedList1', {
      areaCode: GYEONGJU_AREA_CODE,
      sigunguCode: GYEONGJU_SIGUNGU_CODE,
      contentTypeId: '12', // 관광지
      arrange: 'P', // 인기순
      pageNo: pageNo.toString(),
      numOfRows: numOfRows.toString(),
      listYN: 'Y'
    });
  }

  async getAttractionDetail(contentId: string): Promise<TourApiResponse<any>> {
    return this.fetchTourApi('detailCommon1', {
      contentId,
      defaultYN: 'Y',
      firstImageYN: 'Y',
      areacodeYN: 'Y',
      addrinfoYN: 'Y',
      mapinfoYN: 'Y',
      overviewYN: 'Y'
    });
  }

  async searchAttractions(keyword: string, pageNo = 1): Promise<TourApiResponse<AttractionItem>> {
    return this.fetchTourApi<AttractionItem>('searchKeyword1', {
      keyword,
      areaCode: GYEONGJU_AREA_CODE,
      contentTypeId: '12',
      arrange: 'P',
      pageNo: pageNo.toString(),
      numOfRows: '20'
    });
  }
}