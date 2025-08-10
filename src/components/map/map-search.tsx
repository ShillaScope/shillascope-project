"use client";

import { useState } from "react";
import { Search, X, MapPin } from "lucide-react";

interface MapSearchProps {
  attractions: Array<{
    id: string;
    title: string;
    addr1: string;
    map_x: string;
    map_y: string;
  }>;
  onLocationSelect: (attraction: any) => void;
}

export function MapSearch({ attractions, onLocationSelect }: MapSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAttractions, setFilteredAttractions] = useState<any[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const filtered = attractions.filter(
        (attraction) =>
          attraction.title.toLowerCase().includes(term.toLowerCase()) ||
          attraction.addr1.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAttractions(filtered);
      setIsOpen(true);
    } else {
      setFilteredAttractions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (attraction: any) => {
    setSearchTerm(attraction.title);
    setIsOpen(false);
    onLocationSelect(attraction);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredAttractions([]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="관광지 검색..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (filteredAttractions.length > 0) {
              setIsOpen(true);
            }
          }}
          className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && filteredAttractions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredAttractions.map((attraction) => (
            <button
              key={attraction.id}
              onClick={() => handleSelect(attraction)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {attraction.title}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {attraction.addr1}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 검색 결과 없음 */}
      {isOpen && searchTerm && filteredAttractions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
