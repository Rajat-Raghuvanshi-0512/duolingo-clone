import { db } from '@/db/drizzle';
import { units } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const paramsData = await params;
    const { unitId } = paramsData;
    const unit = await db.query.units.findFirst({
      where: eq(units.id, parseInt(unitId)),
    });
    return NextResponse.json(unit);
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
  { params }: { params: Promise<{ unitId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { unitId } = paramsData;
  const unit = await db.query.units.findFirst({
    where: eq(units.id, parseInt(unitId)),
  });
  if (!unit) {
    return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
  }
  const { title, description, courseId, order } = await request.json();
  const updatedUnit = await db
    .update(units)
    .set({ title, description, courseId, order })
    .where(eq(units.id, parseInt(unitId)))
    .returning();
  return NextResponse.json(updatedUnit[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const paramsData = await params;
  const { unitId } = paramsData;
  const unit = await db
    .delete(units)
    .where(eq(units.id, parseInt(unitId)))
    .returning();
  return NextResponse.json(unit[0]);
}
