// app/api/tsubasa/start/route.js
import { NextResponse } from 'next/server';
import { Tsubasa } from '../../../tsubasa/tsubasa';

export async function POST(request) {
    try {
        // Parse the incoming JSON data
        const { 'count-repeat': countRepeat, 'count-delay': countDelay } = await request.json();
        
        const tsubasa = new Tsubasa();
        
        // Call the main function of Tsubasa with the parsed data
        const result = await tsubasa.main(countRepeat, countDelay);
        
        // Return the result as a JSON response
        return NextResponse.json(result);
    } catch (error) {
        // Return error message if something goes wrong
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
