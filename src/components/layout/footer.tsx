"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Sources */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t("dataSource")}
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>{t("tourApi")}</span>
              <a
                href="https://www.visitkorea.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                aria-label="한국관광공사 웹사이트 새 창에서 열기"
              >
                <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span>{t("kakaoApi")}</span>
              <a
                href="https://developers.kakao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                aria-label="카카오 개발자 사이트 새 창에서 열기"
              >
                <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* License Information */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-xs text-gray-500 space-y-2">
            <p className="font-medium">{t("license")}</p>
            <p className="leading-relaxed">{t("copyright")}</p>
            <p className="text-gray-400">
              © 2024 경주 관광 가이드. 2025 관광데이터 활용 공모전 출품작
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
