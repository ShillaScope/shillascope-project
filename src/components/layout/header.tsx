"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: "/ko" },
    { name: t("attractions"), href: "/ko/attractions" },
    { name: t("courses"), href: "/ko/courses" },
    { name: t("map"), href: "/ko/map" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/ko"
            className="flex items-center space-x-2 text-gyeongju-brown hover:text-gyeongju-gold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
            aria-label="경주 관광 가이드 홈으로 이동"
          >
            <MapPin className="w-8 h-8" aria-hidden="true" />
            <span className="text-xl font-bold">경주 가이드</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-8"
            role="navigation"
            aria-label="주 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/ko"
              className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="한국어로 변경"
            >
              한국어
            </Link>
            <Link
              href="/en"
              className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Switch to English"
            >
              English
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">메뉴 열기</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                href="/ko"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                한국어
              </Link>
              <Link
                href="/en"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                English
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
