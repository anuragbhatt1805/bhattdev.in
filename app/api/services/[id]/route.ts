import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, details, active } = body;

    const updatedService = await prisma.service.update({
      where: { id: params.id },
      data: { name, details, active }
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Failed to update service:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.service.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Failed to delete service:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}