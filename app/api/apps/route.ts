import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apps = await prisma.app.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(apps);
  } catch (error) {
    console.error('Failed to fetch apps:', error);
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, details, techStack, screenshots, link } = body;

    if (!name || !details || !Array.isArray(techStack) || !Array.isArray(screenshots) || !link) {
      return NextResponse.json({ error: 'Name, details, techStack, screenshots, and link are required' }, { status: 400 });
    }

    const newApp = await prisma.app.create({
      data: { name, details, techStack, screenshots, link }
    });

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error('Failed to create app:', error);
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 });
  }
}