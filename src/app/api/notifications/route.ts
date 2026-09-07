import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getNotifications } from '@/features/layout/lib/apis/notifications.api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '20');

    const data = await getNotifications({ page, limit });

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
