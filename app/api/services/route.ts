import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, details, active = true } = body;

    if (!name || !details || !Array.isArray(details)) {
      return NextResponse.json({ error: 'Name and details array are required' }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: { name, details, active }
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}