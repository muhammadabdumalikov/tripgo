'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const publicPaths = ['/login', '/register', '/forgot-password'];
const authRequiredPaths = ['/dashboard', '/organizer'];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // Check if the current path requires authentication
      const requiresAuth = authRequiredPaths.some(path => pathname.startsWith(path));
      const isPublicPath = publicPaths.includes(pathname);

      if (requiresAuth && !isAuthenticated) {
        // Redirect to login if trying to access protected route while not authenticated
        router.push('/login');
      } else if (isAuthenticated && isPublicPath) {
        // Redirect to dashboard if trying to access public route while authenticated
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show loading spinner only for protected routes
  if (isLoading && authRequiredPaths.some(path => pathname.startsWith(path))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#febd2d]"></div>
      </div>
    );
  }

  return <>{children}</>;
} 