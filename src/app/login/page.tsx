import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Shield, Briefcase } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">GyanSetu Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <Button className="w-full h-14 text-lg" asChild>
            <Link href="/login/student">
              <User className="mr-2 h-6 w-6" />
              Student
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg" variant="outline" asChild>
            <Link href="/register/student">
              Student Registration
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg" variant="secondary" asChild>
            <Link href="/login/administrator">
              <Briefcase className="mr-2 h-6 w-6" />
              Administrator
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg" variant="secondary" asChild>
             <Link href="/login/parent">
              <Shield className="mr-2 h-6 w-6" />
              Parent / Guardian
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
