"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Star,
  Navigation,
  Calendar,
  Tag,
  CheckCircle,
} from "lucide-react";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { KakaoMap } from "@/components/map/kakao-map";
import {
  TourCourse,
  getDifficultyLabel,
  getDifficultyColor,
} from "@/lib/course-data";

export default function CourseDetailPage() {
  const params = useParams();
  const t = useTranslations("attractions");
  const [course, setCourse] = useState<TourCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attractions, setAttractions] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        const data = await response.json();
        setCourse(data);

        // 관광지 정보도 함께 가져오기
        const attractionsResponse = await fetch("/api/attractions");
        if (attractionsResponse.ok) {
          const attractionsData = await attractionsResponse.json();
          setAttractions(attractionsData.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !course) {
    return (
      <ErrorBoundary
        error={new Error(error || "Course not found")}
        reset={() => window.location.reload()}
      />
    );
  }

  // 코스에 포함된 관광지들의 지도 마커 데이터
  const mapMarkers = course.stops
    .map((stop) => {
      const attraction = attractions.find((a) => a.id === stop.attractionId);
      if (!attraction) return null;

      return {
        id: attraction.id,
        title: attraction.title,
        latitude: parseFloat(attraction.map_y),
        longitude: parseFloat(attraction.map_x),
        address: attraction.addr1,
      };
    })
    .filter(Boolean);

  // 지도 중심점 계산 (모든 마커의 평균 위치)
  const centerLat =
    mapMarkers.length > 0
      ? mapMarkers.reduce((sum, marker) => sum + marker!.latitude, 0) /
        mapMarkers.length
      : 35.8347;
  const centerLng =
    mapMarkers.length > 0
      ? mapMarkers.reduce((sum, marker) => sum + marker!.longitude, 0) /
        mapMarkers.length
      : 129.2194;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/courses"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        코스 목록으로 돌아가기
      </Link>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="relative h-64 sm:h-80">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  course.difficulty
                )} text-gray-900`}
              >
                {getDifficultyLabel(course.difficulty)}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                {course.theme}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50">
                {course.duration}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {course.title}
            </h1>
            <div className="flex items-center text-sm opacity-90">
              <Star
                className="w-4 h-4 mr-1 fill-current text-yellow-400"
                aria-hidden="true"
              />
              <span>4.8 (추천도)</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Course Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {course.duration}
              </div>
              <div className="text-xs text-gray-600">소요시간</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {course.totalDistance}
              </div>
              <div className="text-xs text-gray-600">총 거리</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {course.stops.length}개
              </div>
              <div className="text-xs text-gray-600">관광지</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">연중</div>
              <div className="text-xs text-gray-600">추천시기</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Course Stops */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          코스 일정 ({course.stops.length}개 관광지)
        </h2>

        <div className="space-y-6">
          {course.stops.map((stop, index) => {
            const attraction = attractions.find(
              (a) => a.id === stop.attractionId
            );

            return (
              <div key={index} className="flex items-start space-x-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {stop.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{stop.description}</p>
                      {stop.tips && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-yellow-800">
                              <strong>팁:</strong> {stop.tips}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {Math.floor(stop.duration / 60)}시간{" "}
                          {stop.duration % 60}분
                        </span>
                        {attraction && (
                          <Link
                            href={`/attractions/${attraction.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            상세보기 →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Attraction Image */}
                    {attraction?.first_image && (
                      <div className="ml-4 flex-shrink-0">
                        <img
                          src={attraction.first_image}
                          alt={stop.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      {mapMarkers.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            코스 지도
          </h2>
          <KakaoMap
            latitude={centerLat}
            longitude={centerLng}
            level={6}
            height="400px"
            markers={mapMarkers as any}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              const url = `https://map.kakao.com/link/map/경주관광코스,${centerLat},${centerLng}`;
              window.open(url, "_blank");
            }}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            <Navigation className="w-5 h-5 mr-2" />
            지도에서 전체 코스 보기
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: course.title,
                  text: course.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("링크가 복사되었습니다!");
              }
            }}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
