
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
  
  const getUserType = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('userType');
    }
    return 'teacher'; // Default for server render
  }

  const userType = getUserType();

  const getNavItems = () => {
    switch (userType) {
        case 'student': return studentNav;
        case 'parent': return parentNav;
        case 'principal': return principalNav;
        case 'teacher':
        case 'faculty':
        default:
            return adminNav;
    }
  }

  const navItems = getNavItems();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('studentId');
    router.push('/login');
  };

  const getAvatar = () => {
    switch (userType) {
      case 'student':
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
      case 'principal':
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
      case 'parent':
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
      case 'faculty':
         return (
           <div className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-2 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/faculty1/100/100" alt="Subject Teacher" />
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sidebar-foreground">Subject Teacher</p>
                <p className="text-sm text-sidebar-foreground/80">Science</p>
            </div>
        )
      default: // teacher
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
  }

  const isActive = (path: string) => {
    // Handle exact matches for root-level dashboards or specific pages
    if (path === '/' && pathname !== '/') return false;
    if (path === '/' && pathname === '/') return true;
    if (['/student/dashboard', '/parent/dashboard', '/principal/dashboard', '/settings', '/messages'].includes(path)) {
        return pathname === path;
    }
    // Handle student profile being active for any student ID
    if (path === '/student/1' && pathname.startsWith('/student/')) return true;
    
    // Handle parent paths
    if (userType === 'parent' && path === '/parent/dashboard' && pathname.startsWith('/parent')) return true;

    // Handle other nested routes
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
