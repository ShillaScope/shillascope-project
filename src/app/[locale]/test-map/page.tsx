"use client";

import { KakaoMap } from "@/components/map/kakao-map";

export default function TestMapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">카카오맵 테스트</h1>

      <div className="space-y-8">
        {/* 기본 지도 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">1. 기본 지도 (불국사)</h2>
          <KakaoMap
            latitude={35.7898}
            longitude={129.332}
            level={3}
            height="300px"
          />
        </div>

        {/* 마커가 있는 지도 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">2. 마커가 있는 지도</h2>
          <KakaoMap
            latitude={35.8347}
            longitude={129.2194}
            level={5}
            height="300px"
            markers={[
              {
                id: "1",
                title: "첨성대",
                latitude: 35.8347,
                longitude: 129.2194,
                address: "경상북도 경주시 인왕동",
              },
              {
                id: "2",
                title: "대릉원",
                latitude: 35.8297,
                longitude: 129.2194,
                address: "경상북도 경주시 황남동",
              },
            ]}
          />
        </div>

        {/* API 키 확인 */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">디버그 정보:</h3>
          <p>
            API Key 존재: {process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ? "✅" : "❌"}
          </p>
          <p>
            API Key 길이: {process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.length || 0}
          </p>
          <p>브라우저 콘솔을 확인하여 추가 로그를 확인하세요.</p>
        </div>
      </div>
    </div>
  );
}
{
  /* 현재 위치 기능이 있는 지도 */
}
<div>
  <h2 className="text-lg font-semibold mb-4">3. 현재 위치 기능</h2>
  <KakaoMap
    latitude={35.7898}
    longitude={129.332}
    level={4}
    height="300px"
    showCurrentLocation={true}
    markers={[
      {
        id: "3",
        title: "불국사",
        latitude: 35.7898,
        longitude: 129.332,
        address: "경상북도 경주시 진현동",
      },
    ]}
  />
</div>;

{
  /* 새로운 기능 안내 */
}
<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
  <h3 className="font-semibold text-blue-900 mb-2">
    🎉 새로 추가된 지도 기능들:
  </h3>
  <ul className="text-sm text-blue-800 space-y-1">
    <li>✅ 현재 위치 표시 및 이동 버튼</li>
    <li>✅ 개선된 지도 컨트롤 (길찾기, 전체보기)</li>
    <li>✅ 지도 검색 기능</li>
    <li>✅ 거리 계산 및 소요시간 표시</li>
    <li>✅ 마커 클러스터링 지원</li>
  </ul>
</div>;
