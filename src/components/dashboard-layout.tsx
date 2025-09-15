
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
  const isSettingsArea = pathname.startsWith('/settings');

  const getNavItems = () => {
    if(isStudentArea) return studentNav;
    if(isParentArea) return parentNav;
    if(isPrincipalArea) return principalNav;
    if(isMessagesArea) return adminNav;
    if(isSettingsArea) {
      // This is a bit of a hack to determine context, in a real app
      // you would have this from a session/auth context provider.
      if(sessionStorage.getItem('userType') === 'student') return studentNav;
      if(sessionStorage.getItem('userType') === 'parent') return parentNav;
      if(sessionStorage.getItem('userType') === 'principal') return principalNav;
      return adminNav;
    }
    return adminNav;
  }

  const navItems = getNavItems();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userType');
    router.push('/login');
  };

  const getAvatar = () => {
    let userType = '';
    if (isStudentArea) userType = 'student';
    else if (isParentArea) userType = 'parent';
    else if (isPrincipalArea) userType = 'principal';
    else if (isSettingsArea) userType = sessionStorage.getItem('userType') || 'teacher';
    else userType = 'teacher';
    
    // Persist user type for settings page
    if (userType) sessionStorage.setItem('userType', userType);


    if(userType === 'student') {
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
    if (userType === 'principal') {
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
     if (userType === 'parent') {
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
    // Exact match for dashboards and settings
    if (path === '/' || path === '/principal/dashboard' || path === '/parent/dashboard' || path === '/student/dashboard' || path === '/settings') {
      return pathname === path;
    }
    // Make student profile link active for any student id
    if (path.startsWith('/student/')) return pathname.startsWith('/student/');
    
    return pathname.startsWith(path) && path !== '/';
  };

  const userType = sessionStorage.getItem('userType');

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
              {userType !== 'student' && userType !== 'parent' && (
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
