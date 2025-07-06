import { NextRequest, NextResponse } from 'next/server';
import { validateUserSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const sessionData = validateUserSession(token);
    
    if (!sessionData) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: sessionData.user.id,
        username: sessionData.user.username,
        isAdmin: sessionData.user.isAdmin
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}