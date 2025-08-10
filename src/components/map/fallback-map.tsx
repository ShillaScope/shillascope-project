"use client";

import { MapPin } from "lucide-react";

export function FallbackMap() {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          경주 관광지 지도
        </h3>
        <p className="text-gray-600 mb-4">지도를 불러오는 중입니다...</p>
        <div className="bg-white rounded-lg p-4 shadow-sm border max-w-md mx-auto">
          <h4 className="font-medium text-gray-900 mb-2">주요 관광지</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 불국사 - 신라 불교 문화의 정수</li>
            <li>• 석굴암 - 동양 조각의 걸작</li>
            <li>• 첨성대 - 세계 최고의 천문대</li>
            <li>• 안압지 - 신라 왕궁의 연못</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          지도 다시 로드
        </button>
      </div>
    </div>
  );
}
