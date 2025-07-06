import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.connection.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Connection deleted successfully' });
  } catch (error) {
    console.error('Failed to delete connection:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete connection' }, { status: 500 });
  }
}