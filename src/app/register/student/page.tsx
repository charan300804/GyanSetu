import Link from "next/link";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export default function StudentRegistrationPage() {
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
                <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
                <CardDescription>
                    Create your account to get started with GyanSetu.
                </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="Ravi Kumar" required />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10a">Class 10A</SelectItem>
                        <SelectItem value="10b">Class 10B</SelectItem>
                        <SelectItem value="9a">Class 9A</SelectItem>
                        <SelectItem value="9b">Class 9B</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="student-id">Student ID</Label>
              <Input id="student-id" placeholder="Your school-provided ID" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/login/student">Register</Link>
            </Button>
          </div>
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
