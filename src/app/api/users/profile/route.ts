import { NextResponse } from 'next/server';

import { getProfile } from '@/features/landing-page/lib/apis/profile.api';

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';

  if (
    (error instanceof Error && 'status' in error && error.status === 401) ||
    message === 'Authentication required'
  ) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ status: false, message }, { status: 500 });
}

export async function GET() {
  try {
    const user = await getProfile();
    return NextResponse.json(user);
  } catch (error) {
    return handleError(error);
  }
}
