import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { truncateText, formatDistance } from "@/lib/utils";

interface AttractionCardProps {
  id: string;
  title: string;
  address: string;
  image?: string;
  phone?: string;
  distance?: string;
  overview?: string;
}

export function AttractionCard({
  id,
  title,
  address,
  image,
  phone,
  distance,
  overview,
}: AttractionCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link
        href={`/ko/attractions/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={`${title} 상세 정보 보기`}
      >
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <MapPin className="w-12 h-12" aria-hidden="true" />
            </div>
          )}
          {distance && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {formatDistance(distance)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2">
            <MapPin
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="line-clamp-2">{address}</span>
          </div>

          {phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{phone}</span>
            </div>
          )}

          {overview && (
            <p className="text-sm text-gray-700 line-clamp-3">
              {truncateText(overview, 120)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
