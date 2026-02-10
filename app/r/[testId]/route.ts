import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/db';
import { selectVariant, generateSessionId } from '@/lib/split-logic';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;
    const test = await dbQueries.getTestById(testId);

    if (!test) {
      return new NextResponse('Test not found', { status: 404 });
    }

    const cookieStore = await cookies();
    const cookieName = `st_${testId}`;
    let sessionId = cookieStore.get(cookieName)?.value;

    if (!sessionId) {
      sessionId = generateSessionId();
    }

    // Use weighted distribution
    const variantIndex = selectVariant(test.variants, sessionId);
    const targetUrl = test.variants[variantIndex].url;

    // Log analytics (fire and forget - don't wait for it)
    supabase
      .from('redirect_analytics')
      .insert({ test_id: testId, variant_index: variantIndex })
      .then(() => {})
      .catch((err) => console.error('Analytics logging failed:', err));

    const response = NextResponse.redirect(targetUrl, 307);
    response.cookies.set(cookieName, sessionId, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Redirect error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
