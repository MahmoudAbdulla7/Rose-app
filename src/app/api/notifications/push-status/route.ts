import { NextResponse } from 'next/server';

import { getPushStatus } from '@/features/layout/lib/apis/push-notifications.api';

export async function GET() {
  try {
    const payload = await getPushStatus();

    return NextResponse.json({
      status: true,
      payload,
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
