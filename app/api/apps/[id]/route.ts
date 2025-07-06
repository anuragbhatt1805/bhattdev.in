import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, details, techStack, screenshots, link } = body;

    const updatedApp = await prisma.app.update({
      where: { id: params.id },
      data: { name, details, techStack, screenshots, link }
    });

    return NextResponse.json(updatedApp);
  } catch (error) {
    console.error('Failed to update app:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update app' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.app.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'App deleted successfully' });
  } catch (error) {
    console.error('Failed to delete app:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete app' }, { status: 500 });
  }
}