import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { dbQueries } from '@/lib/db';
import { authDbQueries } from '@/lib/auth-db';
import { CreateTestSchema } from '@/lib/validations';

export async function GET() {
  try {
    const session = await auth();
    console.log('GET /api/tests - Session:', JSON.stringify(session, null, 2));

    if (!session?.user?.id || !session?.user?.email) {
      console.error('GET /api/tests - No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the actual database user ID by email
    const dbUser = await authDbQueries.upsertUser({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    });
    const dbUserId = dbUser.id;
    console.log('GET /api/tests - Database user ID:', dbUserId);

    console.log('GET /api/tests - Fetching tests for user:', dbUserId);
    const tests = await dbQueries.getAllTests(dbUserId);
    console.log('GET /api/tests - Tests fetched:', tests?.length || 0);
    return NextResponse.json(tests);
  } catch (error) {
    console.error('GET /api/tests - Error:', error);
    console.error('GET /api/tests - Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json({ error: 'Failed to fetch tests', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log('POST /api/tests - Session:', JSON.stringify(session, null, 2));

    if (!session?.user?.id) {
      console.error('POST /api/tests - No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in database and get their actual database ID
    let dbUserId = session.user.id;
    if (session.user.email) {
      console.log('POST /api/tests - Upserting user:', session.user.id);
      const dbUser = await authDbQueries.upsertUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
      dbUserId = dbUser.id; // Use the database user ID, not session ID
      console.log('POST /api/tests - Database user ID:', dbUserId);
    }

    const body = await request.json();
    console.log('POST /api/tests - Request body:', JSON.stringify(body, null, 2));

    const validation = CreateTestSchema.safeParse(body);
    if (!validation.success) {
      console.error('POST /api/tests - Validation failed:', validation.error.issues);
      return NextResponse.json({ error: validation.error.issues }, { status: 400 });
    }

    const { name, variants } = validation.data;
    console.log('POST /api/tests - Creating test:', { name, variantCount: variants.length, userId: dbUserId });
    const test = await dbQueries.createTest(name, variants, dbUserId);
    console.log('POST /api/tests - Test created:', test.id);

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error('POST /api/tests - Error:', error);
    console.error('POST /api/tests - Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json({ error: 'Failed to create test', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
