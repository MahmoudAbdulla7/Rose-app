import { NextResponse } from 'next/server';

import {
  deletePushSubscription,
  registerPushSubscription,
} from '@/features/layout/lib/apis/push-notifications.api';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    const payload = await registerPushSubscription(subscription);

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
        message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { endpoint } = await request.json();

    const payload = await deletePushSubscription(endpoint);

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
        message,
      },
      { status: 500 },
    );
  }
}
