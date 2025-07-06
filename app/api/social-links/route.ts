import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('Failed to fetch social links:', error);
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, link } = body;

    if (!title || !link) {
      return NextResponse.json({ error: 'Title and link are required' }, { status: 400 });
    }

    const newSocialLink = await prisma.socialLink.create({
      data: { title, link }
    });

    return NextResponse.json(newSocialLink, { status: 201 });
  } catch (error) {
    console.error('Failed to create social link:', error);
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}