
"use client";

import { usePathname, useRouter } from 'next/navigation';
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
  LogOut,
  Settings,
  Users,
  Video,
  User,
  Mail,
  UserPlus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const studentNav = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/lessons', label: 'Lessons', icon: Video },
    { href: '/student/1', label: 'My Profile', icon: Users },
];

const parentNav = [
    { href: '/parent/dashboard', label: 'Student Profile', icon: User },
    { href: '/messages', label: 'Messages', icon: Mail },
]

const adminNav = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/quizzes', label: 'Quizzes', icon: Award },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
    { href: '/messages', label: 'Messages', icon: Mail },
];

const principalNav = [
    { href: '/principal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/principal/users', label: 'User Management', icon: UserPlus },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
    { href: '/messages', label: 'Messages', icon: Mail },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isStudentArea = pathname.startsWith('/student');
  const isPrincipalArea = pathname.startsWith('/principal');
  const isParentArea = pathname.startsWith('/parent');
  const isMessagesArea = pathname.startsWith('/messages');

  const getNavItems = () => {
    if(isStudentArea) return studentNav;
    if(isParentArea) return parentNav;
    if(isPrincipalArea) return principalNav;
    // For adminNav, we want to know which page is active, but also handle messages
    if (isMessagesArea && !isParentArea && !isPrincipalArea) return adminNav;
    return adminNav;
  }

  const navItems = getNavItems();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const getAvatar = () => {
    if(isStudentArea) {
        return (
            <div className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="Ravi Kumar" />
                    <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sidebar-foreground">Ravi Kumar</p>
                <p className="text-sm text-sidebar-foreground/80">Class 10A</p>
            </div>
        )
    }
    if (isPrincipalArea) {
        return (
            <div className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/principal/100/100" alt="Principal" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sidebar-foreground">Principal</p>
                <p className="text-sm text-sidebar-foreground/80">GyanSetu School</p>
            </div>
        )
    }
     if (isParentArea) {
        return (
            <div className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/parent/100/100" alt="Parent" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sidebar-foreground">Parent/Guardian</p>
                <p className="text-sm text-sidebar-foreground/80">of Ravi Kumar</p>
            </div>
        )
    }
    return (
       <div className="p-4 flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/seed/teacher/100/100" alt="Class Teacher" />
                <AvatarFallback>CT</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sidebar-foreground">Class Teacher</p>
            <p className="text-sm text-sidebar-foreground/80">Class 10A</p>
        </div>
    )
  }

  const isActive = (path: string) => {
    if (path === '/' && !isPrincipalArea) return pathname === '/';
    if (path === '/principal/dashboard') return pathname === '/principal/dashboard';
    if (path === '/parent/dashboard') return pathname === '/parent/dashboard';
    if (path === '/messages') return pathname === '/messages';
    // Make student profile link active for any student id
    if (path.startsWith('/student/')) return pathname.startsWith('/student/');
    return pathname.startsWith(path) && path !== '/';
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
            {getAvatar()}
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
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
              {!isStudentArea && !isParentArea && (
                <>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                    <Link href="/login/parent">
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
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
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
