"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("attractions");

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    // 페이지를 1로 리셋
    params.delete("page");

    router.push(`/ko/attractions?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("page");
    router.push(`/ko/attractions?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 relative">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          aria-label="관광지 검색"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="검색어 지우기"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
