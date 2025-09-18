
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useEffect, useState } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<{ isAuthenticated: boolean; isChecked: boolean }>({
    isAuthenticated: false,
    isChecked: false,
  });

  const isPublicPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  useEffect(() => {
    // This effect runs once on mount to check the initial auth state from sessionStorage.
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    setAuthStatus({ isAuthenticated, isChecked: true });
  }, []);

  useEffect(() => {
    if (!authStatus.isChecked) {
      // Don't do anything until the initial auth check is complete.
      return;
    }

    // Redirect unauthenticated users from private pages to the login page.
    if (!authStatus.isAuthenticated && !isPublicPage) {
      router.push('/login');
      return; // Stop further execution
    }

    // Redirect authenticated users from public pages to their respective dashboards.
    if (authStatus.isAuthenticated && isPublicPage) {
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
          router.push('/');
          break;
        case 'faculty':
          router.push('/courses');
          break;
        default:
          // If userType is unknown or null, log them out as a fallback.
          sessionStorage.clear();
          router.push('/login');
          break;
      }
    }
  }, [authStatus, isPublicPage, pathname, router]);

  if (!authStatus.isChecked) {
    // Render nothing (or a loading spinner) while auth state is being determined.
    // This prevents a "flash" of content.
    return null;
  }

  if (isPublicPage) {
    // If we're on a public page, only show the content if the user is not authenticated.
    // If they are authenticated, the effect above will handle the redirect, so we render nothing.
    return authStatus.isAuthenticated ? null : <>{children}</>;
  }

  if (!isPublicPage && authStatus.isAuthenticated) {
    // If on a private page and authenticated, show the dashboard layout.
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // In all other cases (e.g., on a private page but not authenticated),
  // the redirect effect is handling navigation, so we render nothing to avoid flashes.
  return null;
}
