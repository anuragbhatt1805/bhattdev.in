import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.delete('auth-token');
  return response;
}