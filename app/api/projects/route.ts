import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, details, link, screenshots, techStack } = body;

    if (!name || !details || !Array.isArray(details) || !Array.isArray(screenshots) || !Array.isArray(techStack)) {
      return NextResponse.json({ error: 'Name, details, screenshots, and techStack arrays are required' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: { name, details, link, screenshots, techStack }
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}