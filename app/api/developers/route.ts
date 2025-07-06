import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const developers = await prisma.developer.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(developers);
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    return NextResponse.json({ error: 'Failed to fetch developers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, organization, picture, bio, socialLinks } = body;

    if (!name || !position || !organization || !picture || !bio) {
      return NextResponse.json({ error: 'Name, position, organization, picture, and bio are required' }, { status: 400 });
    }

    const newDeveloper = await prisma.developer.create({
      data: { 
        name, 
        position, 
        organization, 
        picture, 
        bio, 
        socialLinks: socialLinks || {} 
      }
    });

    return NextResponse.json(newDeveloper, { status: 201 });
  } catch (error) {
    console.error('Failed to create developer:', error);
    return NextResponse.json({ error: 'Failed to create developer' }, { status: 500 });
  }
}