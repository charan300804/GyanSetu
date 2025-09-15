
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/actions";
import { ArrowLeft, UserCheck, UserCog, Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdministratorLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (role: "teacher" | "faculty" | "principal") => {
    // In a real app, you'd have a specific login form for each administrator type.
    // For this prototype, we'll simulate a successful login and redirect.
    const result = await login(`${role}`, "password", role);

    if (result.success) {
      toast({
        title: "Login Successful",
        description: `Redirecting to ${role} dashboard...`,
      });

      // Set userType in sessionStorage for dashboard layout
      let userId = "t-1";
      if(role === 'faculty') {
        userId = "t-2";
      } else if (role === 'principal') {
        userId = "p-1";
      }
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userType', role);
      sessionStorage.setItem('userId', userId);


      if (role === "teacher") router.push("/");
      if (role === "faculty") router.push("/courses");
      if (role === "principal") router.push("/principal/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: result.error,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
              <Link href="/login">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">
                Administrator Login
              </CardTitle>
              <CardDescription>Select your role to continue</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full h-14 text-lg"
            onClick={() => handleLogin("teacher")}
          >
            <UserCheck className="mr-2 h-6 w-6" />
            Class Teacher / Mentor
          </Button>
          <Button
            className="w-full h-14 text-lg"
            variant="secondary"
            onClick={() => handleLogin("faculty")}
          >
            <UserCog className="mr-2 h-6 w-6" />
            Subject Teacher / Faculty
          </Button>
          <Button
            className="w-full h-14 text-lg"
            variant="secondary"
            onClick={() => handleLogin("principal")}
          >
            <Briefcase className="mr-2 h-6 w-6" />
            Principal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
