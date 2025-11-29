import { db } from '@/db/drizzle';
import { challenges } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const paramsData = await params;
    const { challengeId } = paramsData;
    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, parseInt(challengeId)),
    });
    return NextResponse.json(challenge);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { challengeId } = paramsData;
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, parseInt(challengeId)),
  });
  if (!challenge) {
    return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
  }
  const { question, lessonId, order, type } = await request.json();
  const updatedChallenge = await db
    .update(challenges)
    .set({ question, lessonId, order, type })
    .where(eq(challenges.id, parseInt(challengeId)))
    .returning();
  return NextResponse.json(updatedChallenge[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { challengeId } = paramsData;
  const challenge = await db
    .delete(challenges)
    .where(eq(challenges.id, parseInt(challengeId)))
    .returning();
  return NextResponse.json(challenge[0]);
}
