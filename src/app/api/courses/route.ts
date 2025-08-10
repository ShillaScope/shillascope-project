import { NextRequest, NextResponse } from 'next/server';
import { tourCourses } from '@/lib/course-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');
    const difficulty = searchParams.get('difficulty');
    const duration = searchParams.get('duration');

    let filteredCourses = tourCourses;

    // 테마 필터
    if (theme) {
      filteredCourses = filteredCourses.filter(course => 
        course.theme.toLowerCase().includes(theme.toLowerCase())
      );
    }

    // 난이도 필터
    if (difficulty) {
      filteredCourses = filteredCourses.filter(course => 
        course.difficulty === difficulty
      );
    }

    // 소요시간 필터
    if (duration) {
      filteredCourses = filteredCourses.filter(course => 
        course.duration === duration
      );
    }

    return NextResponse.json({
      data: filteredCourses,
      total: filteredCourses.length
    }, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200'
      }
    });

  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}