"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  level?: number;
  width?: string;
  height?: string;
  markers?: Array<{
    id: string;
    title: string;
    latitude: number;
    longitude: number;
    address?: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  showControls?: boolean;
  showCurrentLocation?: boolean;
  enableClustering?: boolean;
}

export function KakaoMap({
  latitude,
  longitude,
  level = 3,
  width = "100%",
  height = "400px",
  markers = [],
  onMarkerClick,
  showControls = true,
  showCurrentLocation = false,
  enableClustering = false,
}: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [clusterer, setClusterer] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      console.log("Loading Kakao Map...");
      console.log("Window.kakao exists:", !!window.kakao);

      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao maps not available");
        setError("카카오맵을 불러올 수 없습니다.");
        setIsLoading(false);
        return;
      }

      window.kakao.maps.load(() => {
        console.log("Kakao maps loaded successfully");
        if (!mapContainer.current) {
          console.error("Map container not found");
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: level,
        };

        console.log("Creating map with options:", options);
        const kakaoMap = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(kakaoMap);

        // 지도 컨트롤 추가
        if (showControls) {
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          kakaoMap.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );

          const zoomControl = new window.kakao.maps.ZoomControl();
          kakaoMap.addControl(
            zoomControl,
            window.kakao.maps.ControlPosition.RIGHT
          );
        }

        console.log("Map created successfully");

        // 현재 위치 가져오기
        if (showCurrentLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude: lat, longitude: lng } = position.coords;
              setCurrentLocation({ lat, lng });

              // 현재 위치 마커 추가
              const currentLocationMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                image: new window.kakao.maps.MarkerImage(
                  "data:image/svg+xml;base64," +
                    btoa(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" fill="white"/>
                    </svg>
                  `),
                  new window.kakao.maps.Size(24, 24)
                ),
              });

              currentLocationMarker.setMap(kakaoMap);

              // 현재 위치 정보창
              const currentLocationInfoWindow =
                new window.kakao.maps.InfoWindow({
                  content:
                    '<div style="padding:5px; text-align:center;"><strong>현재 위치</strong></div>',
                });

              window.kakao.maps.event.addListener(
                currentLocationMarker,
                "click",
                () => {
                  currentLocationInfoWindow.open(
                    kakaoMap,
                    currentLocationMarker
                  );
                }
              );
            },
            (error) => {
              console.warn("현재 위치를 가져올 수 없습니다:", error);
            }
          );
        }

        setIsLoading(false);
      });
    };

    // 카카오맵 스크립트 로드
    if (!window.kakao) {
      console.log("Loading Kakao script...");
      console.log("API Key:", process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);

      if (!process.env.NEXT_PUBLIC_KAKAO_MAP_KEY) {
        console.error("NEXT_PUBLIC_KAKAO_MAP_KEY is not defined");
        setError("카카오맵 API 키가 설정되지 않았습니다.");
        setIsLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        console.log("Kakao script loaded successfully");
        setTimeout(() => {
          loadKakaoMap();
        }, 100); // 약간의 지연 추가
      };
      script.onerror = (error) => {
        console.error("Failed to load Kakao script:", error);
        setError(
          "카카오맵 스크립트를 불러올 수 없습니다. API 키를 확인해주세요."
        );
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      console.log("Kakao already loaded");
      setTimeout(() => {
        loadKakaoMap();
      }, 100);
    }
  }, [latitude, longitude, level, showControls]);

  // 마커 추가
  useEffect(() => {
    if (!map || !window.kakao) return;

    // 기존 마커 제거
    const markersToAdd =
      markers.length > 0
        ? markers
        : [{ id: "center", title: "현재 위치", latitude, longitude }];

    markersToAdd.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(
        markerData.latitude,
        markerData.longitude
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: markerData.title,
      });

      marker.setMap(map);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px; min-width:150px; text-align:center;">
            <strong style="display:block; margin-bottom:5px;">${
              markerData.title
            }</strong>
            ${
              markerData.address
                ? `<div style="font-size:12px; color:#666;">${markerData.address}</div>`
                : ""
            }
          </div>
        `,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
        if (onMarkerClick) {
          onMarkerClick(markerData.id);
        }
      });
    });
  }, [map, markers, latitude, longitude, onMarkerClick]);

  if (isLoading) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <div className="text-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
      >
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
          <p className="font-medium mb-1">지도를 불러올 수 없습니다</p>
          <p className="text-sm mb-4">{error}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                const url = `https://map.kakao.com/link/map/위치,${latitude},${longitude}`;
                window.open(url, "_blank");
              }}
              className="px-3 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
            >
              카카오맵에서 보기
            </button>
            <button
              onClick={() => {
                const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
                window.open(url, "_blank");
              }}
              className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              구글맵에서 보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        style={{ width, height }}
        className="rounded-lg overflow-hidden"
      />

      {/* 지도 컨트롤 버튼들 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* 현재 위치로 이동 버튼 */}
        {showCurrentLocation && (
          <button
            onClick={() => {
              if (currentLocation && map) {
                const moveLatLng = new window.kakao.maps.LatLng(
                  currentLocation.lat,
                  currentLocation.lng
                );
                map.setCenter(moveLatLng);
                map.setLevel(3);
              } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const { latitude: lat, longitude: lng } = position.coords;
                  const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
                  map.setCenter(moveLatLng);
                  map.setLevel(3);
                });
              }
            }}
            className="bg-white shadow-lg rounded-lg p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            aria-label="현재 위치로 이동"
            title="현재 위치로 이동"
          >
            <MapPin className="w-5 h-5" />
          </button>
        )}

        {/* 길찾기 버튼 */}
        <button
          onClick={() => {
            const url = `https://map.kakao.com/link/to/목적지,${latitude},${longitude}`;
            window.open(url, "_blank");
          }}
          className="bg-white shadow-lg rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          aria-label="길찾기"
        >
          <Navigation className="w-4 h-4 inline mr-1" />
          길찾기
        </button>

        {/* 전체 보기 버튼 */}
        {markers.length > 1 && (
          <button
            onClick={() => {
              if (map && markers.length > 0) {
                const bounds = new window.kakao.maps.LatLngBounds();
                markers.forEach((marker) => {
                  bounds.extend(
                    new window.kakao.maps.LatLng(
                      marker.latitude,
                      marker.longitude
                    )
                  );
                });
                map.setBounds(bounds);
              }
            }}
            className="bg-white shadow-lg rounded-lg p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            aria-label="전체 마커 보기"
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
    </div>
  );
}
