import { useTranslations } from "next-intl";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loading({ size = "md", text }: LoadingProps) {
  const t = useTranslations("common");

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-8"
      role="status"
      aria-live="polite"
    >
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]}`}
      />
      <span
        className="mt-2 text-sm text-gray-600"
        aria-label={text || t("loading")}
      >
        {text || t("loading")}
      </span>
    </div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}
