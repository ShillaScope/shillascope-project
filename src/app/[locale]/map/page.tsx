"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { KakaoMap } from "@/components/map/kakao-map";
import { WorkingMapWithMarkers } from "@/components/map/working-map-with-markers";
import { MapSearch } from "@/components/map/map-search";
import { DistanceCalculator } from "@/components/map/distance-calculator";
import { Loading } from "@/components/ui/loading";
import { MapPin, List, Search } from "lucide-react";
import { GYEONGJU_CENTER } from "@/lib/utils";

interface Attraction {
  id: string;
  title: string;
  addr1: string;
  map_x: string;
  map_y: string;
  first_image: string | null;
  overview: string | null;
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

export default function MapPage() {
  const t = useTranslations("navigation");
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(
    null
  );
  const [showList, setShowList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        console.log("Fetching attractions for map...");
        const response = await fetch("/api/attractions");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Attractions fetched:", data.data?.length || 0);

        if (data.data && data.data.length > 0) {
          setAttractions(data.data);
          setError(null);
        } else {
          // 데이터가 없으면 시드 데이터 생성 시도
          console.log("No attractions found, trying to seed data...");
          const seedResponse = await fetch("/api/attractions/seed", {
            method: "POST",
          });

          if (seedResponse.ok) {
            // 시드 후 다시 데이터 가져오기
            const retryResponse = await fetch("/api/attractions");
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              setAttractions(retryData.data || []);
            }
          } else {
            setAttractions([]);
            setError("관광지 데이터를 불러올 수 없습니다.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setError("관광지 데이터를 불러오는 중 오류가 발생했습니다.");
        setAttractions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  const handleMarkerClick = (markerId: string) => {
    setSelectedAttraction(markerId);
    const attraction = attractions.find((a) => a.id === markerId);
    if (attraction) {
      setShowList(true);
    }
  };

  const handleLocationSelect = (attraction: Attraction) => {
    setSelectedAttraction(attraction.id);
  };

  const selectedAttractionData = attractions.find(
    (a) => a.id === selectedAttraction
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            지도를 불러올 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const mapMarkers = attractions.map((attraction) => ({
    id: attraction.id,
    title: attraction.title,
    latitude: parseFloat(attraction.map_y),
    longitude: parseFloat(attraction.map_x),
    address: attraction.addr1,
  }));

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-primary-600" />
            경주 관광지 지도
          </h1>

          <div className="flex items-center space-x-4">
            {/* 검색 바 */}
            <div className="flex-1 max-w-md">
              <MapSearch
                attractions={attractions}
                onLocationSelect={handleLocationSelect}
              />
            </div>

            <button
              onClick={() => setShowList(!showList)}
              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                showList
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              목록 {showList ? "숨기기" : "보기"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Map */}
        <div
          className={`transition-all duration-300 ${
            showList ? "w-2/3" : "w-full"
          }`}
        >
          <WorkingMapWithMarkers
            attractions={attractions}
            onMarkerClick={handleMarkerClick}
            selectedAttraction={selectedAttraction}
          />
        </div>

        {/* Sidebar */}
        {showList && (
          <div className="w-1/3 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                관광지 목록 ({attractions.length}개)
              </h2>

              <div className="space-y-3">
                {attractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedAttraction === attraction.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleMarkerClick(attraction.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {attraction.first_image ? (
                        <img
                          src={attraction.first_image}
                          alt={attraction.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {attraction.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {attraction.addr1}
                        </p>
                        {attraction.overview && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {attraction.overview.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Attraction Detail */}
        {selectedAttractionData && !showList && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-md">
            <div className="flex items-start space-x-3">
              {selectedAttractionData.first_image ? (
                <img
                  src={selectedAttractionData.first_image}
                  alt={selectedAttractionData.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {selectedAttractionData.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedAttractionData.addr1}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      window.location.href = `/ko/attractions/${selectedAttractionData.id}`;
                    }}
                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
