import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Follow redirects to get the final URL
        const response = await fetch(url, {
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NextJS-App/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch URL');
        }

        // Get the final URL after redirects
        const finalUrl = response.url;

        return NextResponse.json({ url: finalUrl });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to resolve URL '+error }, { status: 500 });
    }
}