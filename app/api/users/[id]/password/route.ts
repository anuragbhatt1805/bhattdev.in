import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateUserSession, hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated and is admin
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionData = validateUserSession(token);
    if (!sessionData || !sessionData.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { password } = body;

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: params.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Failed to update password:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}