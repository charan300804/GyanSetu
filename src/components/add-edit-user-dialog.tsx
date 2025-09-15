
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addUser, updateUser, type UserRole } from '@/lib/actions';
import type { Teacher } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  role: z.enum(['Class Teacher', 'Subject Teacher']),
});

type AddEditUserDialogProps = {
  children: React.ReactNode;
  teacher?: Teacher;
};

export function AddEditUserDialog({ children, teacher }: AddEditUserDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!teacher;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teacher?.name || '',
      email: teacher?.email || '',
      role: teacher?.role === 'Principal' ? 'Class Teacher' : (teacher?.role || 'Class Teacher'),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const action = isEditMode
      ? updateUser(teacher.id, values as { name: string; email: string; role: UserRole })
      : addUser(values as { name: string; email: string; role: UserRole });
    
    const result = await action;

    if (result.success) {
      toast({
        title: `User ${isEditMode ? 'Updated' : 'Added'}`,
        description: `The user account for ${values.name} has been successfully ${isEditMode ? 'updated' : 'created'}.`,
      });
      setOpen(false);
      // In a real app, you'd likely trigger a data re-fetch here instead of reloading.
      window.location.reload(); 
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the user's details below." : 'Enter the details for the new user.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                      <SelectItem value="Subject Teacher">Subject Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
