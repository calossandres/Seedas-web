import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import prisma from '../../../lib/db';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(request) {
    const payload = await request.json();
    const headerList = headers();
    const heads = {
        'svix-id': headerList.get('svix-id'),
        'svix-timestamp': headerList.get('svix-timestamp'),
        'svix-signature': headerList.get('svix-signature'),
    };

    const wh = new Webhook(webhookSecret);
    let evt = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads
        );
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({}, { status: 400 });
    }

    const eventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.update') {
        const { id, ...attributes } = evt.data;
        console.log(id);
        console.log(attributes);
        
        await prisma.user.upsert({
            where: { externalId: id },
            create: {
                externalId: id,
                ...attributes,
            },
            update: { ...attributes },
        });
    }

    return NextResponse.json({ received: true });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
