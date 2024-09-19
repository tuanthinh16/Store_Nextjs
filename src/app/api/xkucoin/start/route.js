// app/api/tsubasa/start/route.js
import { NextResponse } from 'next/server';
import { KucoinAPIClient } from '../../../xkucoin/x';

export async function POST(request) {
    const { 'count-repeat': countRepeat, 'count-delay': countDelay } = await request.json();
    const xkucoin = new KucoinAPIClient();

    try {
        const result = await xkucoin.main(countRepeat,countDelay);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
