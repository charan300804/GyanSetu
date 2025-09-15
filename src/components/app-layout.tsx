"use client";

import { usePathname, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useEffect, useState } from 'react';

// A mock function to check if a user is authenticated.
const checkUserAuth = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    // We use sessionStorage to persist the "login" state just for the current browser session.
    return sessionStorage.getItem('isAuthenticated') === 'true';
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const isPublicPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  useEffect(() => {
    const handleAuth = () => {
        // When the user navigates to a login page, we can assume they are "logging in"
        // and for the simulation, we can set them as authenticated.
        if (pathname.startsWith('/login/student') || pathname.startsWith('/login/parent') || pathname.startsWith('/login/administrator')) {
            sessionStorage.setItem('isAuthenticated', 'true');
        }
        
        setIsAuthenticated(checkUserAuth());
        setIsAuthChecked(true);
    };
    handleAuth();
  }, [pathname]);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated && !isPublicPage) {
      router.push('/login');
    }
  }, [isAuthChecked, isAuthenticated, isPublicPage, router]);


  if (!isAuthChecked) {
    // Render a loading state or nothing while checking auth
    return null; 
  }

  if (!isAuthenticated && !isPublicPage) {
    // Render a loading state or nothing while redirecting
    return null;
  }
  
  if (isPublicPage) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
