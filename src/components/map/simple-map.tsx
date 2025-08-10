"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export function SimpleMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log("SimpleMap useEffect started");
    console.log("API Key:", process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);

    const loadMap = () => {
      console.log("loadMap called");
      console.log("window.kakao exists:", !!window.kakao);
      console.log(
        "window.kakao.maps exists:",
        !!(window.kakao && window.kakao.maps)
      );

      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao maps not available");
        setError("카카오맵을 불러올 수 없습니다.");
        setIsLoading(false);
        return;
      }

      window.kakao.maps.load(() => {
        console.log("Kakao maps.load callback called");

        // DOM이 준비될 때까지 기다리기
        const createMap = () => {
          if (!mapContainer.current) {
            console.error("Map container not found, retrying...");
            setTimeout(createMap, 100);
            return;
          }

          try {
            const options = {
              center: new window.kakao.maps.LatLng(35.7898, 129.332), // 경주 중심
              level: 8,
            };

            console.log("Creating map with options:", options);
            new window.kakao.maps.Map(mapContainer.current, options);
            console.log("Map created successfully");
            setIsLoading(false);
          } catch (err) {
            console.error("Error creating map:", err);
            setError("지도 생성 중 오류가 발생했습니다.");
            setIsLoading(false);
          }
        };

        createMap();
      });
    };

    if (!window.kakao) {
      console.log("Loading Kakao script...");
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        console.log("Kakao script loaded successfully");
        loadMap();
      };
      script.onerror = (err) => {
        console.error("Failed to load Kakao script:", err);
        setError("카카오맵 스크립트 로드 실패");
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      console.log("Kakao already exists, calling loadMap");
      loadMap();
    }
  }, [isMounted]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div>지도 로딩 중...</div>
          <div className="text-sm text-gray-500 mt-2">
            API Key: {process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ? "설정됨" : "없음"}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-600 mb-2">{error}</div>
          <div className="text-sm text-gray-500">
            브라우저 콘솔을 확인해주세요
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full" />;
}
