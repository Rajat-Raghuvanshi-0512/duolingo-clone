import { db } from '@/db/drizzle';
import { NextResponse } from 'next/server';
import { units } from '@/db/schema';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const units = await db.query.units.findMany();
  return NextResponse.json(units);
}

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, description, courseId, order } = await request.json();
  const unit = await db
    .insert(units)
    .values({ title, description, courseId, order })
    .returning();
  return NextResponse.json(unit[0]);
}
