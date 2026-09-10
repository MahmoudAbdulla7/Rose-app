import { NextResponse } from 'next/server';

import { getUnreadCount } from '@/features/layout/lib/apis/notifications.api';

export async function GET() {
  try {
    const unreadCount = await getUnreadCount();

    return NextResponse.json({
      status: true,
      payload: {
        unreadCount,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Authentication required') {
      return NextResponse.json(
        {
          status: false,
          message,
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        status: false,
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
