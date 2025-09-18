
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
  }, [pathname]); // Re-check on path change

  useEffect(() => {
    if (!isAuthChecked) {
      return; // Don't do anything until auth state is checked
    }

    const userType = sessionStorage.getItem('userType');

    // If authenticated, handle redirects from public pages to dashboards
    if (isAuthenticated && isPublicPage) {
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
          router.push('/');
          break;
        default:
          // If userType is unknown, log them out as a fallback
          sessionStorage.clear();
          router.push('/login');
          break;
      }
    }
    // If not authenticated, redirect from private pages to login
    else if (!isAuthenticated && !isPublicPage) {
      router.push('/login');
    }

  }, [isAuthChecked, isAuthenticated, isPublicPage, router, pathname]);


  if (!isAuthChecked) {
    // Render a loading state or nothing while checking auth.
    // This prevents a flash of the login page on a refresh when authenticated.
    return null; 
  }
  
  // If we are on a public page, just render children (login, register)
  // or wait for the redirect effect to kick in if authenticated.
  if (isPublicPage) {
    return isAuthenticated ? null : <>{children}</>;
  }

  // If we are on a private page and not authenticated, wait for redirect.
  if (!isAuthenticated) {
    return null;
  }
  
  // If authenticated and on a private page, render the dashboard.
  return <DashboardLayout>{children}</DashboardLayout>;
}
