"use client";

import { KakaoMap } from "@/components/map/kakao-map";
import { MapPin } from "lucide-react";
import { GYEONGJU_CENTER } from "@/lib/utils";

export default function SimpleMapPage() {
  // 경주 주요 관광지 좌표
  const attractions = [
    {
      id: "1",
      title: "불국사",
      latitude: 35.7898,
      longitude: 129.332,
      address: "경상북도 경주시 진현동 15-1",
    },
    {
      id: "2",
      title: "석굴암",
      latitude: 35.7947,
      longitude: 129.3475,
      address: "경상북도 경주시 진현동 999",
    },
    {
      id: "3",
      title: "첨성대",
      latitude: 35.8347,
      longitude: 129.2194,
      address: "경상북도 경주시 인왕동 839-1",
    },
    {
      id: "4",
      title: "안압지",
      latitude: 35.8342,
      longitude: 129.2244,
      address: "경상북도 경주시 원화로 102",
    },
    {
      id: "5",
      title: "대릉원",
      latitude: 35.8297,
      longitude: 129.2194,
      address: "경상북도 경주시 황남동 120-3",
    },
    {
      id: "6",
      title: "국립경주박물관",
      latitude: 35.8356,
      longitude: 129.2281,
      address: "경상북도 경주시 일정로 186",
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-primary-600" />
          경주 관광지 지도 (간단 버전)
        </h1>
      </div>

      {/* Map */}
      <div className="flex-1">
        <KakaoMap
          latitude={GYEONGJU_CENTER.lat}
          longitude={GYEONGJU_CENTER.lng}
          level={8}
          height="100%"
          markers={attractions}
          onMarkerClick={(markerId) => {
            const attraction = attractions.find((a) => a.id === markerId);
            if (attraction) {
              alert(`${attraction.title}을(를) 선택했습니다!`);
            }
          }}
        />
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-3">경주 주요 관광지</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="text-center p-2 bg-gray-50 rounded"
              >
                <div className="text-sm font-medium text-gray-900">
                  {attraction.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
