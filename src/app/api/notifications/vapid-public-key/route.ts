import { NextResponse } from 'next/server';

import { getVapidPublicKey } from '@/features/layout/lib/apis/push-notifications.api';

export async function GET() {
  try {
    const payload = await getVapidPublicKey();

    return NextResponse.json({
      status: true,
      payload,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    return NextResponse.json(
      {
        status: false,
        message,
      },
      { status: 500 },
    );
  }
}
