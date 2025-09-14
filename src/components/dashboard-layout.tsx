
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Award,
  BarChart3,
  BookOpenText,
  HeartHandshake,
  Languages,
  LayoutDashboard,
  Settings,
  Users,
  Video,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const studentNav = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/lessons', label: 'Lessons', icon: Video },
    { href: '/student/1', label: 'My Profile', icon: Users },
];

const adminNav = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/quizzes', label: 'Quizzes', icon: Award },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudentArea = pathname.startsWith('/student');

  const navItems = isStudentArea ? studentNav : adminNav;

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    // Make student profile link active for any student id
    if (path.startsWith('/student/')) return pathname.startsWith('/student/');
    return pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <BookOpenText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-sidebar-foreground">
                GyanSetu
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {isStudentArea ? (
                <div className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                        <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="Ravi Kumar" />
                        <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-sidebar-foreground">Ravi Kumar</p>
                    <p className="text-sm text-sidebar-foreground/80">Class 10A</p>
                </div>
            ) : (
               <div className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                        <AvatarImage src="https://picsum.photos/seed/teacher/100/100" alt="Class Teacher" />
                        <AvatarFallback>CT</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-sidebar-foreground">Class Teacher</p>
                    <p className="text-sm text-sidebar-foreground/80">Class 10A</p>
                </div>
            )}
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} disabled={item.disabled}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              {!isStudentArea && (
                <>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                    <Link href="/#">
                        <HeartHandshake />
                        <span>Parental Access</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                    <Link href="/#">
                        <Languages />
                        <span>Language</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/settings')}>
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Header content can go here, like a search bar */}
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
