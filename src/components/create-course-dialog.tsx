"use client";

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [courseName, setCourseName] = useState('');
  const [language, setLanguage] = useState('');

  const handleCreateCourse = () => {
    if (!courseName || !language) {
        toast({
            variant: 'destructive',
            title: 'Missing Fields',
            description: 'Please provide both a course name and a language.',
        });
        return;
    }
    // In a real app, you would call a server action here to create the course
    console.log({ courseName, language });
    toast({
        title: 'Course Created',
        description: `The course "${courseName}" in ${language} has been created.`,
    });
    setOpen(false);
    setCourseName('');
    setLanguage('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Course Name
            </Label>
            <Input id="name" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="col-span-3" placeholder="e.g., Mathematics 101" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Language
            </Label>
            <Select onValueChange={setLanguage} value={language}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Punjabi">Punjabi</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
            </DialogClose>
          <Button onClick={handleCreateCourse}>Create Course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
