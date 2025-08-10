import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDataHash(data: any): string {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

export function formatDistance(distance: string | number): string {
  const dist = typeof distance === 'string' ? parseFloat(distance) : distance;
  if (dist < 1000) {
    return `${Math.round(dist)}m`;
  }
  return `${(dist / 1000).toFixed(1)}km`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function isValidCoordinate(x: string, y: string): boolean {
  const longitude = parseFloat(x);
  const latitude = parseFloat(y);
  
  return !isNaN(longitude) && 
         !isNaN(latitude) && 
         longitude >= -180 && 
         longitude <= 180 && 
         latitude >= -90 && 
         latitude <= 90;
}

// 경주 중심 좌표 (불국사 기준)
export const GYEONGJU_CENTER = {
  lat: 35.7898,
  lng: 129.3320
};

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}