import { db } from '@/db/drizzle';
import { NextResponse } from 'next/server';
import { challenges } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const challenges = await db.query.challenges.findMany();
  return NextResponse.json(challenges);
}

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { question, lessonId, order, type } = await request.json();
  const challenge = await db
    .insert(challenges)
    .values({ question, lessonId, order, type })
    .returning();
  return NextResponse.json(challenge[0]);
}
