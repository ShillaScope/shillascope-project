const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY!;
const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v2/local';

export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  place_url: string;
  distance: string;
}

export interface KakaoSearchResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: {
      region: string[];
      keyword: string;
      selected_region: string;
    };
  };
}

export class KakaoApiService {
  private async fetchKakaoApi<T>(endpoint: string, params: Record<string, string>): Promise<T> {
    const url = new URL(`${KAKAO_API_BASE_URL}/${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      next: { revalidate: 1800 } // 30분 캐시
    });

    if (!response.ok) {
      throw new Error(`Kakao API request failed: ${response.status}`);
    }

    return response.json();
  }

  async searchPlaces(query: string, x?: string, y?: string, radius = 10000): Promise<KakaoSearchResponse> {
    const params: Record<string, string> = {
      query: `경주 ${query}`,
      size: '15',
      category_group_code: 'AT4' // 관광명소
    };

    if (x && y) {
      params.x = x;
      params.y = y;
      params.radius = radius.toString();
    }

    return this.fetchKakaoApi<KakaoSearchResponse>('search/keyword', params);
  }

  async getPlacesByCategory(categoryCode: string, x = '129.2247', y = '35.8562', radius = 20000): Promise<KakaoSearchResponse> {
    return this.fetchKakaoApi<KakaoSearchResponse>('search/category', {
      category_group_code: categoryCode,
      x,
      y,
      radius: radius.toString(),
      size: '15'
    });
  }

  // 좌표를 주소로 변환
  async coord2Address(x: string, y: string): Promise<any> {
    return this.fetchKakaoApi('geo/coord2address', {
      x,
      y,
      input_coord: 'WGS84'
    });
  }
}