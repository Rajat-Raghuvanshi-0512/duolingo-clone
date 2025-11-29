import { db } from '@/db/drizzle';
import { lessons } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const paramsData = await params;
    const { lessonId } = paramsData;
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, parseInt(lessonId)),
    });
    return NextResponse.json(lesson);
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
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { lessonId } = paramsData;
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, parseInt(lessonId)),
  });
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }
  const { title, unitId, order } = await request.json();
  const updatedLesson = await db
    .update(lessons)
    .set({ title, unitId, order })
    .where(eq(lessons.id, parseInt(lessonId)))
    .returning();
  return NextResponse.json(updatedLesson[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { lessonId } = paramsData;
  const lesson = await db
    .delete(lessons)
    .where(eq(lessons.id, parseInt(lessonId)))
    .returning();
  return NextResponse.json(lesson[0]);
}
