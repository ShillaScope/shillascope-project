import { NextResponse } from 'next/server';
import { TourApiService } from '@/lib/tour-api';

const tourApi = new TourApiService();

export async function GET() {
  try {
    console.log('Testing TourAPI connection...');
    console.log('API Key exists:', !!process.env.TOUR_API_KEY);
    console.log('API Key length:', process.env.TOUR_API_KEY?.length || 0);
    
    const response = await tourApi.getAttractionsByArea(1, 5);
    
    return NextResponse.json({
      success: true,
      data: response,
      message: 'TourAPI connection successful'
    });

  } catch (error) {
    console.error('TourAPI test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'TourAPI connection failed'
    }, { status: 500 });
  }
}