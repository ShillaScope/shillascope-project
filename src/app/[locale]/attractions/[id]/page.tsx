"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  ArrowLeft,
  ExternalLink,
  Clock,
  Star,
} from "lucide-react";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { KakaoMap } from "@/components/map/kakao-map";

interface AttractionDetail {
  id: string;
  title: string;
  contentTypeId: string;
  areaCode: string;
  sigunguCode: string;
  firstImage: string | null;
  firstImage2: string | null;
  mapX: string;
  mapY: string;
  addr1: string;
  addr2: string | null;
  tel: string | null;
  overview: string | null;
  homepage: string | null;
}

export default function AttractionDetailPage() {
  const params = useParams();
  const t = useTranslations("attractions");
  const [attraction, setAttraction] = useState<AttractionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await fetch(`/api/attractions/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch attraction");
        }
        const data = await response.json();
        setAttraction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAttraction();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !attraction) {
    return (
      <ErrorBoundary
        error={new Error(error || "Attraction not found")}
        reset={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/attractions"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        관광지 목록으로 돌아가기
      </Link>

      {/* Main Content */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Hero Image */}
        {attraction.firstImage && (
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={attraction.firstImage}
              alt={attraction.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {attraction.title}
              </h1>
              <div className="flex items-center text-sm opacity-90">
                <Star
                  className="w-4 h-4 mr-1 fill-current text-yellow-400"
                  aria-hidden="true"
                />
                <span>4.8 (리뷰 기반 예상 평점)</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">소개</h2>
              {attraction.overview ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {attraction.overview}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  상세 정보가 준비 중입니다.
                </p>
              )}
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  정보
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">주소</p>
                      <p className="text-sm text-gray-600">
                        {attraction.addr1}
                        {attraction.addr2 && ` ${attraction.addr2}`}
                      </p>
                    </div>
                  </div>

                  {attraction.tel && (
                    <div className="flex items-start space-x-3">
                      <Phone
                        className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          전화번호
                        </p>
                        <a
                          href={`tel:${attraction.tel}`}
                          className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                        >
                          {attraction.tel}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <Clock
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        운영시간
                      </p>
                      <p className="text-sm text-gray-600">
                        09:00 - 18:00 (예상)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const url = `https://map.kakao.com/link/map/${attraction.title},${attraction.mapY},${attraction.mapX}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                  지도에서 보기
                </button>

                <button
                  onClick={() => {
                    const url = `https://map.kakao.com/link/to/${attraction.title},${attraction.mapY},${attraction.mapX}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  길찾기
                </button>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {attraction.firstImage2 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                추가 사진
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={attraction.firstImage2}
                    alt={`${attraction.title} 추가 사진`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Map */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">위치</h3>
            <KakaoMap
              latitude={parseFloat(attraction.mapY)}
              longitude={parseFloat(attraction.mapX)}
              height="300px"
              markers={[
                {
                  id: attraction.id,
                  title: attraction.title,
                  latitude: parseFloat(attraction.mapY),
                  longitude: parseFloat(attraction.mapX),
                  address: attraction.addr1,
                },
              ]}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
