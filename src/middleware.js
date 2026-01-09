import { NextResponse } from 'next/server';

// Simple in-memory rate limiter
const rateLimit = new Map();

export function middleware(request) {
    // Only limit API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const limit = 100; // Limit per minute
        const windowMs = 60 * 1000; // 1 minute

        const record = rateLimit.get(ip);
        const now = Date.now();

        if (record) {
            if (now - record.startTime > windowMs) {
                // Reset window
                rateLimit.set(ip, { count: 1, startTime: now });
            } else {
                // Increment count
                record.count += 1;
                if (record.count > limit) {
                    return new NextResponse('Too Many Requests', { status: 429 });
                }
            }
        } else {
            // New record
            rateLimit.set(ip, { count: 1, startTime: now });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
