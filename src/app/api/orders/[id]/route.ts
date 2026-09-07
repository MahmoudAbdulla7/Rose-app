import { NextResponse } from 'next/server';
import { getOrderById } from '@/shared/lib/apis/orders/orders.api';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await getOrderById(id);
        return NextResponse.json(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        if (message === 'Unauthorized' || message === 'No token found') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}