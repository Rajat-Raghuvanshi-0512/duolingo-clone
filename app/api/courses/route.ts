import { db } from '@/db/drizzle';
import { NextResponse } from 'next/server';
import { courses } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const courses = await db.query.courses.findMany();
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, imageSrc } = await request.json();
  const course = await db
    .insert(courses)
    .values({ title, imageSrc })
    .returning();
  return NextResponse.json(course[0]);
}
