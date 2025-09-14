import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, UserCheck, UserCog, UserTie } from "lucide-react";

export default function AdministratorLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
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
                <CardTitle className="text-2xl font-bold">Administrator Login</CardTitle>
                <CardDescription>Select your role to continue</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full h-14 text-lg" asChild>
            <Link href="/">
              <UserCheck className="mr-2 h-6 w-6" />
              Class Teacher / Mentor
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg" variant="secondary" asChild>
            <Link href="/">
              <UserCog className="mr-2 h-6 w-6" />
              Subject Teacher / Faculty
            </Link>
          </Button>
          <Button className="w-full h-14 text-lg" variant="secondary" asChild>
            <Link href="/">
              <UserTie className="mr-2 h-6 w-6" />
              Principal
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
