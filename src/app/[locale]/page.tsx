"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MapPin, Camera, Route, Star, Clock } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");
  const tNav = useTranslations("navigation");

  const features = [
    {
      icon: MapPin,
      title: tNav("attractions"),
      description: "경주의 주요 관광지와 문화유산을 둘러보세요",
      href: "/ko/attractions",
      color: "text-blue-600",
    },
    {
      icon: Route,
      title: tNav("courses"),
      description: "추천 관광 코스로 효율적인 여행을 계획하세요",
      href: "/ko/courses",
      color: "text-green-600",
    },
    {
      icon: Camera,
      title: tNav("map"),
      description: "지도에서 관광지 위치를 확인하고 길찾기를 이용하세요",
      href: "/ko/map",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gyeongju-brown via-gyeongju-stone to-gyeongju-gold">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("title")}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ko/attractions"
                className="inline-flex items-center px-8 py-3 bg-white text-gyeongju-brown font-semibold rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gyeongju-brown"
              >
                <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                관광지 둘러보기
              </Link>
              <Link
                href="/ko/map"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gyeongju-brown transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gyeongju-brown"
              >
                지도에서 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              경주 여행의 모든 것
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              천년 고도 경주의 역사와 문화를 체험할 수 있는 다양한 서비스를
              제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group p-8 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 group-hover:bg-primary-50 transition-colors mb-4`}
                  >
                    <Icon
                      className={`w-6 h-6 ${feature.color} group-hover:text-primary-600 transition-colors`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Attractions Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("featuredAttractions")}
            </h2>
            <Link
              href="/ko/attractions"
              className="text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder cards - will be replaced with actual data */}
            {[
              { name: "불국사", type: "사찰" },
              { name: "석굴암", type: "석굴" },
              { name: "첨성대", type: "천문대" },
              { name: "안압지", type: "연못" },
            ].map((attraction, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-gyeongju-gold to-gyeongju-brown opacity-20" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {attraction.name}
                  </h3>
                  <p className="text-sm text-gray-600">{attraction.type}</p>
                  <div className="flex items-center mt-2">
                    <Star
                      className="w-4 h-4 text-yellow-400 fill-current"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("popularCourses")}
            </h2>
            <Link
              href="/ko/courses"
              className="text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "신라 문화유산 1일 코스",
                theme: "문화유산",
                duration: "1일",
                stops: 4,
                difficulty: "쉬움",
              },
              {
                title: "가족 여행 추천 코스",
                theme: "가족여행",
                duration: "1일",
                stops: 4,
                difficulty: "쉬움",
              },
            ].map((course, index) => (
              <Link
                key={index}
                href="/ko/courses"
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <div className="h-40 bg-gradient-to-br from-primary-500 to-primary-700 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="inline-block px-2 py-1 bg-white bg-opacity-20 rounded text-xs font-medium mb-2">
                      {course.theme}
                    </span>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Route className="w-4 h-4 mr-1" />
                      {course.stops}개 관광지
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {course.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
