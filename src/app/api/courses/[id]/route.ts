import { NextRequest, NextResponse } from 'next/server';
import { tourCourses } from '@/lib/course-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const course = tourCourses.find(c => c.id === id);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200'
      }
    });

  } catch (error) {
    console.error('Course detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}