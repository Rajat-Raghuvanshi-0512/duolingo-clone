import { db } from '@/db/drizzle';
import { challengeOptions } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const paramsData = await params;
    const { challengeOptionId } = paramsData;
    const challengeOption = await db.query.challengeOptions.findFirst({
      where: eq(challengeOptions.id, parseInt(challengeOptionId)),
    });
    return NextResponse.json(challengeOption);
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
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { challengeOptionId } = paramsData;
  const challengeOption = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, parseInt(challengeOptionId)),
  });
  if (!challengeOption) {
    return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
  }
  const { text, correct, challengeId, imageSrc, audioSrc } =
    await request.json();
  const updatedChallengeOption = await db
    .update(challengeOptions)
    .set({ text, correct, challengeId, imageSrc, audioSrc })
    .where(eq(challengeOptions.id, parseInt(challengeOptionId)))
    .returning();
  return NextResponse.json(updatedChallengeOption[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { challengeOptionId } = paramsData;
  const challenge = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, parseInt(challengeOptionId)))
    .returning();
  return NextResponse.json(challenge[0]);
}
