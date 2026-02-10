import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;
    const test = await dbQueries.getTestById(testId);

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json(test);
  } catch (error) {
    console.error('Failed to fetch test details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test details' },
      { status: 500 }
    );
  }
}
