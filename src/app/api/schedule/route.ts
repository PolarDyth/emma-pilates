import { NextResponse } from 'next/server';
import { getCalendarWeek } from '@/lib/schedule-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const anchor = searchParams.get('anchor') || new Date().toISOString().slice(0, 10);
    const data = await getCalendarWeek(anchor);
    return NextResponse.json(data, { status: 200, headers: { 'Cache-Tag': 'schedule' } });
}


