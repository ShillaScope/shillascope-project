"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Attraction {
  id: string;
  title: string;
  addr1: string;
  map_x: string;
  map_y: string;
  first_image: string | null;
  overview: string | null;
}

interface WorkingMapWithMarkersProps {
  attractions: Attraction[];
  onMarkerClick?: (attractionId: string) => void;
  selectedAttraction?: string | null;
}

export function WorkingMapWithMarkers({
  attractions,
  onMarkerClick,
  selectedAttraction,
}: WorkingMapWithMarkersProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  // 지도 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(35.7898, 129.332),
            level: 8,
          };

          mapInstance.current = new window.kakao.maps.Map(
            mapRef.current,
            options
          );
          setIsLoaded(true);
        }
      });
    };

    script.onerror = () => {
      setError("카카오맵을 불러올 수 없습니다.");
    };

    if (!window.kakao) {
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(35.7898, 129.332),
            level: 8,
          };

          mapInstance.current = new window.kakao.maps.Map(
            mapRef.current,
            options
          );
          setIsLoaded(true);
        }
      });
    }
  }, []);

  // 마커 추가/업데이트
  useEffect(() => {
    if (!isLoaded || !mapInstance.current || !window.kakao) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 추가
    attractions.forEach((attraction) => {
      const lat = parseFloat(attraction.map_y);
      const lng = parseFloat(attraction.map_x);

      if (isNaN(lat) || isNaN(lng)) return;

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: attraction.title,
      });

      marker.setMap(mapInstance.current);
      markersRef.current.push(marker);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px; min-width:150px; text-align:center;">
            <strong style="display:block; margin-bottom:5px;">${attraction.title}</strong>
            <div style="font-size:12px; color:#666;">${attraction.addr1}</div>
          </div>
        `,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(mapInstance.current, marker);
        if (onMarkerClick) {
          onMarkerClick(attraction.id);
        }
      });
    });

    // 모든 마커가 보이도록 지도 범위 조정
    if (attractions.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      attractions.forEach((attraction) => {
        const lat = parseFloat(attraction.map_y);
        const lng = parseFloat(attraction.map_x);
        if (!isNaN(lat) && !isNaN(lng)) {
          bounds.extend(new window.kakao.maps.LatLng(lat, lng));
        }
      });
      mapInstance.current.setBounds(bounds);
    }
  }, [isLoaded, attractions, onMarkerClick]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">지도를 불러오는 중...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />

      {/* 지도 컨트롤 버튼들 */}
      {isLoaded && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* 전체 보기 버튼 */}
          {attractions.length > 1 && (
            <button
              onClick={() => {
                if (mapInstance.current && attractions.length > 0) {
                  const bounds = new window.kakao.maps.LatLngBounds();
                  attractions.forEach((attraction) => {
                    const lat = parseFloat(attraction.map_y);
                    const lng = parseFloat(attraction.map_x);
                    if (!isNaN(lat) && !isNaN(lng)) {
                      bounds.extend(new window.kakao.maps.LatLng(lat, lng));
                    }
                  });
                  mapInstance.current.setBounds(bounds);
                }
              }}
              className="bg-white shadow-lg rounded-lg p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              title="전체 마커 보기"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
