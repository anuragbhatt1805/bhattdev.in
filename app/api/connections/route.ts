import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const connections = await prisma.connection.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(connections);
  } catch (error) {
    console.error('Failed to fetch connections:', error);
    return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceId, subject, message } = body;

    if (!name || !email || !serviceId || !subject || !message) {
      return NextResponse.json({ error: 'Name, email, serviceId, subject, and message are required' }, { status: 400 });
    }

    const newConnection = await prisma.connection.create({
      data: { name, email, phone, serviceId, subject, message }
    });

    return NextResponse.json(newConnection, { status: 201 });
  } catch (error) {
    console.error('Failed to create connection:', error);
    return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
  }
}