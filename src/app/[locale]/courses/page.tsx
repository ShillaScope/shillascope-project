"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CourseCard } from "@/components/courses/course-card";
import { Loading } from "@/components/ui/loading";
import { Route, Filter, Clock, Users } from "lucide-react";
import { TourCourse } from "@/lib/course-data";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("navigation");

  const [courses, setCourses] = useState<TourCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const url = new URL("/api/courses", window.location.origin);

        if (selectedTheme) url.searchParams.set("theme", selectedTheme);
        if (selectedDifficulty)
          url.searchParams.set("difficulty", selectedDifficulty);
        if (selectedDuration)
          url.searchParams.set("duration", selectedDuration);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedTheme, selectedDifficulty, selectedDuration]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Route className="w-8 h-8 mr-3 text-primary-600" />
          경주 관광 코스
        </h1>
        <p className="text-lg text-gray-600">
          테마별로 엄선된 경주 관광 코스를 만나보세요
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          필터
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Theme Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              테마
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">전체 테마</option>
              <option value="문화유산">문화유산</option>
              <option value="역사탐방">역사탐방</option>
              <option value="힐링">힐링</option>
              <option value="가족여행">가족여행</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              난이도
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">전체 난이도</option>
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="hard">어려움</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              소요시간
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">전체 시간</option>
              <option value="반나절">반나절</option>
              <option value="1일">1일</option>
              <option value="2일">2일</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedTheme || selectedDifficulty || selectedDuration) && (
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedTheme("");
                setSelectedDifficulty("");
                setSelectedDuration("");
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {courses.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              총 {courses.length}개의 코스가 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Route
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            aria-hidden="true"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            조건에 맞는 코스가 없습니다
          </h3>
          <p className="text-gray-600">다른 필터 조건을 시도해보세요</p>
        </div>
      )}

      {/* Course Statistics */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          경주 관광 코스 통계
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-lg mx-auto mb-2">
              <Route className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">추천 코스</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-lg mx-auto mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1-2일</div>
            <div className="text-sm text-gray-600">평균 소요시간</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-lg mx-auto mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">가족</div>
            <div className="text-sm text-gray-600">추천 대상</div>
          </div>
        </div>
      </div>
    </div>
  );
}
