
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const defaultValues: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function PasswordSettings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  const onSubmit = (data: PasswordFormValues) => {
    setIsSubmitting(true);
    console.log("Updating password for user.");
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would check if the currentPassword is correct first.
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        form.reset();
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password here. Choose a strong, unique password.
        </CardDescription>
      </CardHeader>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
                <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
