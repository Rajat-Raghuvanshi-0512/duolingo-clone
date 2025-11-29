import { db } from '@/db/drizzle';
import { courses } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const paramsData = await params;
    const { courseId } = paramsData;
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, parseInt(courseId)),
    });
    return NextResponse.json(course);
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
  { params }: { params: Promise<{ courseId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { courseId } = paramsData;
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(courseId)),
  });
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
  const { title, imageSrc } = await request.json();
  const updatedCourse = await db
    .update(courses)
    .set({ title, imageSrc })
    .where(eq(courses.id, parseInt(courseId)))
    .returning();
  return NextResponse.json(updatedCourse[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { courseId } = paramsData;
  const course = await db
    .delete(courses)
    .where(eq(courses.id, parseInt(courseId)))
    .returning();
  return NextResponse.json(course[0]);
}
