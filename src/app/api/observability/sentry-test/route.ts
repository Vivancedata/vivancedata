import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

function getConfiguredDsn(): string | undefined {
  return process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
}

function getProvidedToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('x-observability-token');
  if (headerToken) {
    return headerToken.trim();
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return null;
}

export async function GET() {
  const dsn = getConfiguredDsn();

  return NextResponse.json({
    sentryConfigured: Boolean(dsn),
    testTokenConfigured: Boolean(process.env.OBSERVABILITY_TEST_TOKEN),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
  });
}

export async function POST(request: NextRequest) {
  const dsn = getConfiguredDsn();
  if (!dsn) {
    return NextResponse.json(
      { error: 'Sentry DSN is not configured.' },
      { status: 503 }
    );
  }

  const expectedToken = process.env.OBSERVABILITY_TEST_TOKEN;
  if (!expectedToken) {
    return NextResponse.json(
      { error: 'OBSERVABILITY_TEST_TOKEN is not configured.' },
      { status: 503 }
    );
  }

  const providedToken = getProvidedToken(request);
  if (!providedToken || providedToken !== expectedToken) {
    return NextResponse.json(
      { error: 'Unauthorized observability test request.' },
      { status: 401 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { marker?: unknown };
  const marker =
    typeof body.marker === 'string' && body.marker.trim().length > 0
      ? body.marker.trim().slice(0, 120)
      : `manual-${new Date().toISOString()}`;

  const eventId = Sentry.captureMessage(`Observability test event (${marker})`, {
    level: 'info',
    tags: {
      source: 'api/observability/sentry-test',
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    },
    extra: {
      marker,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
    },
  });

  await Sentry.flush(2_000);

  return NextResponse.json({
    success: true,
    eventId,
    marker,
  });
}
