
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useEffect, useState } from 'react';

// A mock function to check if a user is authenticated.
const checkUserAuth = () => {
    if (typeof window === 'undefined') {
        return { auth: false, checked: false };
    }
    // We use sessionStorage to persist the "login" state just for the current browser session.
    return { auth: sessionStorage.getItem('isAuthenticated') === 'true', checked: true };
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const isPublicPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  useEffect(() => {
    const authStatus = checkUserAuth();
    setIsAuthenticated(authStatus.auth);
    setIsAuthChecked(authStatus.checked);
  }, [pathname]); // Re-check on path change to be safe

  useEffect(() => {
    // This effect runs when auth state is resolved or path changes.
    // It handles redirects.
    if (isAuthChecked) {
        if (isAuthenticated && isPublicPage) {
            const userType = sessionStorage.getItem('userType');
            switch (userType) {
                case 'student':
                    router.push('/student/dashboard');
                    break;
                case 'parent':
                    router.push('/parent/dashboard');
                    break;
                case 'principal':
                    router.push('/principal/dashboard');
                    break;
                case 'teacher':
                case 'faculty':
                    router.push('/'); // Teacher/Faculty dashboard is at root
                    break;
                default:
                    router.push('/login');
            }
        } else if (!isAuthenticated && !isPublicPage) {
            router.push('/login');
        }
    }
  }, [isAuthChecked, isAuthenticated, isPublicPage, router, pathname]);


  if (!isAuthChecked) {
    // Render a loading state or nothing while checking auth.
    // This prevents a flash of the login page on a refresh when authenticated.
    return null; 
  }

  // If we are on a public page and authenticated, wait for redirect effect.
  if (isPublicPage && isAuthenticated) {
    return null;
  }
  
  if (isPublicPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // While redirecting, show nothing to prevent flashing the dashboard layout.
    return null;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
}
