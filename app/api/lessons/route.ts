import { db } from '@/db/drizzle';
import { NextResponse } from 'next/server';
import { lessons } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const lessons = await db.query.lessons.findMany();
  return NextResponse.json(lessons);
}

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, unitId, order } = await request.json();
  const lesson = await db
    .insert(lessons)
    .values({ title, unitId, order })
    .returning();
  return NextResponse.json(lesson[0]);
}
