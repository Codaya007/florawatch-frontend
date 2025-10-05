import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const SENTINEL_CLIENT_ID = process.env.SENTINEL_CLIENT_ID;
    const SENTINEL_CLIENT_SECRET = process.env.SENTINEL_CLIENT_SECRET;

    if (!SENTINEL_CLIENT_ID || !SENTINEL_CLIENT_SECRET) {
        return NextResponse.json(
            { error: 'Missing Sentinel Hub credentials in environment variables.' },
            { status: 500 }
        );
    }
    
    const body = new URLSearchParams({
        client_id: SENTINEL_CLIENT_ID,
        client_secret: SENTINEL_CLIENT_SECRET,
        grant_type: "client_credentials",
    });

    try {
        // 2. Llamada al servidor externo Sentinel Hub desde el servidor Next.js
        const externalResponse = await fetch(
            "https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                body: body.toString(),
            }
        );

        if (!externalResponse.ok) {
            const errorText = await externalResponse.text();
            console.error("Sentinel Hub Auth Error:", externalResponse.status, errorText);
            return NextResponse.json(
                { error: `Sentinel Hub Authentication Failed: ${externalResponse.statusText}` },
                { status: externalResponse.status }
            );
        }

        const data = await externalResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching token via proxy:', error);
        return NextResponse.json(
            { error: 'Internal server error while fetching token.' },
            { status: 500 }
        );
    }
}