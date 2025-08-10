"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock } from "lucide-react";
import { calculateDistance } from "@/lib/utils";

interface DistanceCalculatorProps {
  attractions: Array<{
    id: string;
    title: string;
    map_x: string;
    map_y: string;
    addr1: string;
  }>;
  currentLocation?: { lat: number; lng: number } | null;
}

export function DistanceCalculator({
  attractions,
  currentLocation,
}: DistanceCalculatorProps) {
  const [nearbyAttractions, setNearbyAttractions] = useState<any[]>([]);

  useEffect(() => {
    if (currentLocation && attractions.length > 0) {
      const attractionsWithDistance = attractions.map((attraction) => {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          parseFloat(attraction.map_y),
          parseFloat(attraction.map_x)
        );

        return {
          ...attraction,
          distance: distance,
          walkingTime: Math.round(distance * 12), // 도보 시간 (분) - 시속 5km 기준
          drivingTime: Math.round(distance * 2), // 차량 시간 (분) - 시속 30km 기준
        };
      });

      // 거리순으로 정렬하고 가까운 5개만 표시
      const sorted = attractionsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);

      setNearbyAttractions(sorted);
    }
  }, [currentLocation, attractions]);

  if (!currentLocation || nearbyAttractions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2 text-primary-600" />내 위치에서
        가까운 관광지
      </h3>

      <div className="space-y-3">
        {nearbyAttractions.map((attraction, index) => (
          <div
            key={attraction.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {attraction.title}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {attraction.addr1}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span className="font-medium">
                  {attraction.distance < 1
                    ? `${Math.round(attraction.distance * 1000)}m`
                    : `${attraction.distance.toFixed(1)}km`}
                </span>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{attraction.walkingTime}분</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                  </svg>
                  <span>{attraction.drivingTime}분</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        도보: 시속 5km 기준 | 차량: 시속 30km 기준 (예상 시간)
      </div>
    </div>
  );
}
