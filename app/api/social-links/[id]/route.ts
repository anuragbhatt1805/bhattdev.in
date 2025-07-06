import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, link } = body;

    if (!title || !link) {
      return NextResponse.json({ error: 'Title and link are required' }, { status: 400 });
    }

    const updatedSocialLink = await prisma.socialLink.update({
      where: { id: params.id },
      data: { title, link }
    });

    return NextResponse.json(updatedSocialLink);
  } catch (error) {
    console.error('Failed to update social link:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.socialLink.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    console.error('Failed to delete social link:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}