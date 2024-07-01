import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/api/revalidate') {
        // Check if the request method is POST
        if (request.method !== 'POST') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Check if the request body contains the token
        const contentType = request.headers.get('content-type');
        if (contentType !== 'application/json') {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
        }

        return request.json().then((body) => {
            const token = body.token;

            // Verify the token
            if (token !== process.env.REVALIDATE_TOKEN) {
                console.log(token)
                console.log(process.env.REVALIDATE_TOKEN)
                return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
            }

            // Allow the request to proceed
            return NextResponse.next();
        }).catch(() => {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        });
    }

    // Allow the request to proceed for other routes
    return NextResponse.next();
}

export const config = {
    matcher: '/api/revalidate',
};
