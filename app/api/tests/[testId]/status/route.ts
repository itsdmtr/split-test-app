import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { authDbQueries } from '@/lib/auth-db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the actual database user ID
    const dbUser = await authDbQueries.upsertUser({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    });

    const { testId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['live', 'stopped'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "live" or "stopped"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('split_tests')
      .update({ status })
      .eq('id', testId)
      .eq('user_id', dbUser.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to update status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
