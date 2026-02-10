import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/db';
import { CreateTestSchema } from '@/lib/validations';

export async function GET() {
  try {
    const tests = await dbQueries.getAllTests();
    return NextResponse.json(tests);
  } catch (error) {
    console.error('Failed to fetch tests:', error);
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = CreateTestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const { name, variants } = validation.data;
    const test = await dbQueries.createTest(name, variants);

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error('Failed to create test:', error);
    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
  }
}
