"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AttractionCard } from "@/components/attractions/attraction-card";
import { SearchBar } from "@/components/attractions/search-bar";
import { Loading } from "@/components/ui/loading";
import { Search, Filter } from "lucide-react";

interface Attraction {
  id: string;
  title: string;
  addr1: string;
  first_image: string | null;
  tel: string | null;
  overview: string | null;
}

interface AttractionsData {
  data: Attraction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export default function AttractionsPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("attractions");

  const [attractions, setAttractions] = useState<AttractionsData>({
    data: [],
    pagination: { page: 1, limit: 20, total: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const page = searchParams.get("page") || "1";
        const search = searchParams.get("search") || "";

        const url = new URL("/api/attractions", window.location.origin);
        url.searchParams.set("page", page);
        if (search) {
          url.searchParams.set("search", search);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch attractions");
        }

        const data = await response.json();
        setAttractions(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [searchParams]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar />
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
            {t("category")}
          </button>
        </div>
      </div>

      {/* Results */}
      {attractions.data.length > 0 ? (
        <>
          {/* Search Results Info */}
          {searchParams.get("search") && (
            <div className="mb-6">
              <p className="text-gray-600">
                '
                <span className="font-medium">
                  {searchParams.get("search")}
                </span>
                ' 검색 결과: {attractions.pagination.total}개
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {attractions.data.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                id={attraction.id}
                title={attraction.title}
                address={attraction.addr1}
                image={attraction.first_image}
                phone={attraction.tel}
                overview={attraction.overview}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <nav
              className="flex items-center space-x-2"
              aria-label="페이지네이션"
            >
              <button
                disabled={attractions.pagination.page <= 1}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set(
                    "page",
                    (attractions.pagination.page - 1).toString()
                  );
                  window.location.href = `?${params.toString()}`;
                }}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                이전
              </button>
              <span className="px-3 py-2 text-sm font-medium text-gray-700">
                페이지 {attractions.pagination.page} /{" "}
                {Math.ceil(
                  attractions.pagination.total / attractions.pagination.limit
                )}
              </span>
              <button
                disabled={
                  attractions.pagination.page >=
                  Math.ceil(
                    attractions.pagination.total / attractions.pagination.limit
                  )
                }
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set(
                    "page",
                    (attractions.pagination.page + 1).toString()
                  );
                  window.location.href = `?${params.toString()}`;
                }}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                다음
              </button>
            </nav>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Search
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            aria-hidden="true"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchParams.get("search")
              ? "검색 결과가 없습니다"
              : "관광지 정보를 불러오는 중입니다"}
          </h3>
          <p className="text-gray-600">
            {searchParams.get("search")
              ? "다른 검색어로 시도해보세요"
              : "잠시만 기다려주세요"}
          </p>
        </div>
      )}
    </div>
  );
}
