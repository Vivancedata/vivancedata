import { NextResponse } from 'next/server';
import { deliveryStatus } from '@/lib/email';

// Read the environment per request, never at build time: a status baked into
// a static response would keep saying "ready" after the key was removed.
export const dynamic = 'force-dynamic';

/**
 * Can a lead reach the inbox right now? 200 when it can, 503 when it cannot.
 *
 * The production smoke check calls this so a missing email provider fails
 * loudly within the hour. It reports configuration only: it sends nothing and
 * names no key, recipient or provider account.
 */
export function GET() {
  const status = deliveryStatus();
  const deliverable = status === 'ready';
  return NextResponse.json(
    { deliverable, status },
    { status: deliverable ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
