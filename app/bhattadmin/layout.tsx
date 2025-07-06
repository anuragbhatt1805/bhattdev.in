'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthUser {
  id: string;
  username: string;
  isAdmin: boolean;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Auth check failed');
        }
        
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          setAuthenticated(true);
          setUser(data.user);
          
          // Check if user is admin
          if (!data.user.isAdmin) {
            setAuthenticated(false);
            router.push('/bhattadmin');
            return;
          }
          
          // If on login page and authenticated, redirect to dashboard
          if (pathname === '/bhattadmin') {
            router.push('/bhattadmin/dashboard');
          }
        } else {
          setAuthenticated(false);
          setUser(null);
          // If not on login page and not authenticated, redirect to login
          if (pathname !== '/bhattadmin') {
            router.push('/bhattadmin');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthenticated(false);
        setUser(null);
        if (pathname !== '/bhattadmin') {
          router.push('/bhattadmin');
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading spinner while checking authentication
  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If on login page, always show children (login form)
  if (pathname === '/bhattadmin') {
    return <>{children}</>;
  }

  // For dashboard pages, only show if authenticated and is admin
  if (!authenticated || !user?.isAdmin) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}