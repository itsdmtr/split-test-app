import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { dbQueries } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = await params;
    const deleted = await dbQueries.deleteTest(testId, session.user.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete test:', error);
    return NextResponse.json({ error: 'Failed to delete test' }, { status: 500 });
  }
}
