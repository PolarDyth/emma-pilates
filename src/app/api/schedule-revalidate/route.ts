import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export async function POST(request: Request) {
    try {
        const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
        if (!webhookSecret) {
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }
        const body = await request.text();
        const signature = request.headers.get(SIGNATURE_HEADER_NAME);
        if (!signature) {
            return NextResponse.json({ error: 'No signature' }, { status: 401 });
        }
        const valid = await isValidSignature(body, signature, webhookSecret);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        // Optional: check document type to only revalidate on schedule/class/author changes
        const parsed = JSON.parse(body);
        const affectedTypes = ['schedule', 'class', 'author'];
        if (!parsed?._type || affectedTypes.includes(parsed._type)) {
            revalidateTag('schedule', {});
        }

        return NextResponse.json({ revalidated: true });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'POST only' }, { status: 405 });
}


