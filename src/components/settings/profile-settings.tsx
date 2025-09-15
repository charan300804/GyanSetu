
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
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  avatar: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        name: "",
        email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const userType = sessionStorage.getItem('userType');
    let name = "User";
    let email = "user@example.com";
    let avatar = "https://picsum.photos/seed/user/100/100";

    if (userType === 'student') {
        name = "Ravi Kumar";
        email = "ravi.kumar@example.com";
        avatar = "https://picsum.photos/seed/1/100/100";
    } else if (userType === 'teacher' || userType === 'faculty') {
        name = "Mr. Sharma";
        email = "sharma@example.com";
        avatar = "https://picsum.photos/seed/teacher/100/100";
    } else if (userType === 'principal') {
        name = "Principal Singh";
        email = "principal@example.com";
        avatar = "https://picsum.photos/seed/principal/100/100";
    } else if (userType === 'parent') {
        name = "Parent of Ravi Kumar";
        email = "parent.ravi@example.com";
        avatar = "https://picsum.photos/seed/parent/100/100";
    }

    form.reset({ name, email });
    setAvatarPreview(avatar);
    setIsLoading(false);
  }, [form]);


  const onSubmit = (data: ProfileFormValues) => {
    setIsSubmitting(true);
    console.log("Updating profile:", data);
    
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your personal information has been successfully updated.",
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      form.setValue('avatar', file); // Set the file in the form state for submission
    }
  };

  const getFallback = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {isLoading ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ) : (
                <>
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={avatarPreview || ''} alt={form.getValues('name')} />
                      <AvatarFallback>{getFallback(form.getValues('name'))}</AvatarFallback>
                    </Avatar>
                     <FormControl>
                        <Input type="file" accept="image/*" className="max-w-xs" onChange={handleAvatarChange} />
                    </FormControl>
                  </div>
                   <FormMessage />
                </FormItem>
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
