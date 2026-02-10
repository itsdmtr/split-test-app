import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;

    // Get all redirects for this test
    const { data: redirects, error } = await supabase
      .from('redirect_analytics')
      .select('variant_index')
      .eq('test_id', testId);

    if (error) throw error;

    // Calculate stats
    const totalClicks = redirects?.length || 0;
    const variantClicks: { [key: number]: number } = {};

    redirects?.forEach((redirect) => {
      variantClicks[redirect.variant_index] =
        (variantClicks[redirect.variant_index] || 0) + 1;
    });

    return NextResponse.json({
      total_clicks: totalClicks,
      variant_clicks: variantClicks,
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
