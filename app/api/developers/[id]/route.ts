import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, position, organization, picture, bio, socialLinks } = body;

    const updatedDeveloper = await prisma.developer.update({
      where: { id: params.id },
      data: { name, position, organization, picture, bio, socialLinks }
    });

    return NextResponse.json(updatedDeveloper);
  } catch (error) {
    console.error('Failed to update developer:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Developer not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update developer' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.developer.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Developer deleted successfully' });
  } catch (error) {
    console.error('Failed to delete developer:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Developer not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete developer' }, { status: 500 });
  }
}