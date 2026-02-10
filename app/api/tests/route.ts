import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { dbQueries } from '@/lib/db';
import { authDbQueries } from '@/lib/auth-db';
import { CreateTestSchema } from '@/lib/validations';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tests = await dbQueries.getAllTests(session.user.id);
    return NextResponse.json(tests);
  } catch (error) {
    console.error('Failed to fetch tests:', error);
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in database
    if (session.user.email) {
      await authDbQueries.upsertUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
    }

    const body = await request.json();

    const validation = CreateTestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const { name, variants } = validation.data;
    const test = await dbQueries.createTest(name, variants, session.user.id);

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error('Failed to create test:', error);
    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
  }
}
