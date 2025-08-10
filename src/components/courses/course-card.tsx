import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Star } from "lucide-react";
import {
  TourCourse,
  getDifficultyLabel,
  getDifficultyColor,
} from "@/lib/course-data";

interface CourseCardProps {
  course: TourCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link
        href={`/courses/${course.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={`${course.title} 코스 상세 정보 보기`}
      >
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                course.difficulty
              )}`}
            >
              {getDifficultyLabel(course.difficulty)}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {course.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {course.theme}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Course Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock
                className="w-4 h-4 mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>소요시간: {course.duration}</span>
            </div>

            <div className="flex items-center">
              <MapPin
                className="w-4 h-4 mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>총 거리: {course.totalDistance}</span>
            </div>

            <div className="flex items-center">
              <Users
                className="w-4 h-4 mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{course.stops.length}개 관광지</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                #{tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
