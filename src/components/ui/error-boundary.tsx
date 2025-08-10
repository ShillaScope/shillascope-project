"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const t = useTranslations("common");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      role="alert"
    >
      <AlertTriangle
        className="w-16 h-16 text-red-500 mb-4"
        aria-hidden="true"
      />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("error")}</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        {error.message || "알 수 없는 오류가 발생했습니다."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        aria-label={t("retry")}
      >
        <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
        {t("retry")}
      </button>
    </div>
  );
}
