import { NextResponse } from 'next/server';
import { getOrders, createNewOrder } from '@/shared/lib/apis/orders/orders.api';

function handleError(error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    if (message === 'Unauthorized' || message === 'No token found') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const params = Object.fromEntries(searchParams.entries());
        const data = await getOrders(params);
        return NextResponse.json(data);
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = await createNewOrder(body);
        return NextResponse.json(data);
    } catch (error) {
        return handleError(error);
    }
}