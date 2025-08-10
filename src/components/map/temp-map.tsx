"use client";

import { MapPin, Navigation, Search } from "lucide-react";

export function TempMap() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* 지도 대신 보여줄 임시 콘텐츠 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            경주 관광지 지도
          </h2>
          <p className="text-gray-600 mb-6">카카오맵을 불러오는 중입니다...</p>

          {/* 주요 관광지 목록 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">주요 관광지</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">
                  불국사 - 신라 불교 문화의 정수
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">
                  석굴암 - 동양 조각의 걸작
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">
                  첨성대 - 세계 최고의 천문대
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-700">
                  안압지 - 신라 왕궁의 연못
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Navigation className="w-4 h-4 mr-2" />
              지도 다시 로드
            </button>
            <button
              onClick={() => (window.location.href = "/ko/attractions")}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              관광지 목록 보기
            </button>
          </div>
        </div>
      </div>

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full p-4">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="bg-blue-600 rounded-full w-2 h-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
