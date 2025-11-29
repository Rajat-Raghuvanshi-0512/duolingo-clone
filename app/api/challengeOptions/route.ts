import { db } from '@/db/drizzle';
import { NextResponse } from 'next/server';
import { challengeOptions } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const challengeOptionsList = await db.query.challengeOptions.findMany();
  return NextResponse.json(challengeOptionsList);
}

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { text, correct, challengeId, imageSrc, audioSrc } =
    await request.json();
  const challengeOptionCreated = await db
    .insert(challengeOptions)
    .values({ text, correct, challengeId, imageSrc, audioSrc })
    .returning();
  return NextResponse.json(challengeOptionCreated[0]);
}
