"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerStudent } from "@/lib/actions";

export default function StudentRegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    tempPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match.",
      });
      return;
    }
    setIsLoading(true);

    const result = await registerStudent({
      studentId: formData.studentId,
      tempPassword: formData.tempPassword,
      newPassword: formData.newPassword,
    });

    if (result.success) {
      toast({
        title: "Registration Successful",
        description: "Your account is activated. Please log in with your new password.",
      });
      router.push("/login/student");
    } else {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12">
      <Card className="mx-auto max-w-sm">
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
                Student Registration
              </CardTitle>
              <CardDescription>
                Activate your account using the credentials from your school.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Your school-provided ID"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tempPassword">Temporary Password</Label>
              <Input
                id="tempPassword"
                type="password"
                placeholder="The temporary password from your school"
                value={formData.tempPassword}
                onChange={handleInputChange}
                required
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Activate Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login/student" className="underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
