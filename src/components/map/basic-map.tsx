"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export function BasicMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const initializeMap = () => {
      console.log("Initializing map...");

      if (!mapRef.current) {
        console.log("Map container not ready, waiting...");
        timeoutId = setTimeout(initializeMap, 100);
        return;
      }

      if (!window.kakao || !window.kakao.maps) {
        console.log("Kakao maps not loaded yet, waiting...");
        timeoutId = setTimeout(initializeMap, 100);
        return;
      }

      try {
        window.kakao.maps.load(() => {
          if (!mapRef.current) {
            console.error("Map container disappeared");
            return;
          }

          const options = {
            center: new window.kakao.maps.LatLng(35.7898, 129.332),
            level: 8,
          };

          new window.kakao.maps.Map(mapRef.current, options);
          console.log("Map created successfully");
          setStatus("success");
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setErrorMessage("지도 초기화 중 오류가 발생했습니다.");
        setStatus("error");
      }
    };

    const loadKakaoScript = () => {
      if (window.kakao && window.kakao.maps) {
        console.log("Kakao maps already loaded");
        initializeMap();
        return;
      }

      console.log("Loading Kakao script...");
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;

      script.onload = () => {
        console.log("Kakao script loaded");
        initializeMap();
      };

      script.onerror = () => {
        console.error("Failed to load Kakao script");
        setErrorMessage("카카오맵 스크립트를 불러올 수 없습니다.");
        setStatus("error");
      };

      document.head.appendChild(script);
    };

    // 컴포넌트가 마운트된 후 약간의 지연을 두고 시작
    timeoutId = setTimeout(loadKakaoScript, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{errorMessage}</div>
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
    <div className="h-full w-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
