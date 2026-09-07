import { NextResponse } from 'next/server';

import { getAddresses } from '@/features/layout/lib/apis/addresses.api';

export async function GET() {
  try {
    const data = await getAddresses();

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && 'status' in error && error.status === 401) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
