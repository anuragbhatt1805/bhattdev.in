import { NextRequest, NextResponse } from 'next/server';
import { validateUser, createUserSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = await validateUser(username, password);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials or account is inactive' }, { status: 401 });
    }

    const token = createUserSession(user);
    
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}