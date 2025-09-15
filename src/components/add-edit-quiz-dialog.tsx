
"use client";

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import { useToast } from '@/hooks/use-toast';
import { addQuiz, updateQuiz } from '@/lib/actions';
import type { Quiz, Question, Option } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ScrollArea } from './ui/scroll-area';

const optionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Option text cannot be empty.'),
});

const questionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Question text cannot be empty.'),
  options: z.array(optionSchema).min(2, 'Must have at least two options.').max(4, 'Cannot have more than four options.'),
  correctOptionId: z.string({ required_error: "Please select a correct answer." }),
});

const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  subject: z.string().min(2, 'Subject must be at least 2 characters.'),
  questions: z.array(questionSchema).min(1, 'A quiz must have at least one question.'),
});

type AddEditQuizDialogProps = {
  children: React.ReactNode;
  quiz?: Quiz;
};

export function AddEditQuizDialog({ children, quiz }: AddEditQuizDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!quiz;

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: isEditMode ? {
        title: quiz.title,
        subject: quiz.subject,
        questions: quiz.questions,
    } : {
      title: '',
      subject: '',
      questions: [{ id: `q-${Date.now()}`, text: '', options: [{ id: `o-1`, text: ''}, {id: `o-2`, text: ''}], correctOptionId: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (values: z.infer<typeof quizSchema>) => {
    const result = await (isEditMode
      ? updateQuiz(quiz!.id, values as Quiz)
      : addQuiz(values as Omit<Quiz, 'id'>));

    if (result.success) {
      toast({
        title: `Quiz ${isEditMode ? 'Updated' : 'Created'}`,
        description: `The quiz has been successfully ${isEditMode ? 'updated' : 'created'}.`,
      });
      setOpen(false);
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Quiz' : 'Create New Quiz'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the quiz details below." : 'Fill in the details to create a new quiz.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] p-4">
                <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Science Chapter 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>Questions</FormLabel>
                  {fields.map((question, qIndex) => (
                    <Card key={question.id} className="p-4 bg-secondary">
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Question {qIndex + 1}</h4>
                            {fields.length > 1 && (
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(qIndex)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                         </div>
                        <FormField
                          control={form.control}
                          name={`questions.${qIndex}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder={`Question ${qIndex + 1} text`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Controller
                            control={form.control}
                            name={`questions.${qIndex}.correctOptionId`}
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Options (select the correct answer)</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="space-y-2"
                                    >
                                        <OptionsArray form={form} qIndex={qIndex} radioGroupField={field} />
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                         />
                      </div>
                    </Card>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ id: `q-${Date.now()}`, text: '', options: [{ id: `o-1`, text: ''}, {id: `o-2`, text: ''}], correctOptionId: '' })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
                </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? 'Saving...'
                  : isEditMode
                  ? 'Save Changes'
                  : 'Create Quiz'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function OptionsArray({ form, qIndex, radioGroupField }: { form: any, qIndex: number, radioGroupField: any }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `questions.${qIndex}.options`,
    });

    return (
        <div className="space-y-2">
            {fields.map((option, oIndex) => (
                <div key={option.id} className="flex items-center gap-2">
                    <FormControl>
                        <RadioGroupItem value={option.id} />
                    </FormControl>
                    <FormField
                        control={form.control}
                        name={`questions.${qIndex}.options.${oIndex}.text`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder={`Option ${oIndex + 1}`} {...field} />
                            </FormControl>
                             <FormMessage />
                            </FormItem>
                        )}
                    />
                    {fields.length > 2 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(oIndex)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground"/>
                        </Button>
                    )}
                </div>
            ))}
             {fields.length < 4 && (
                <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => append({ id: `o-${Date.now()}`, text: '' })}
                >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Option
                </Button>
            )}
        </div>
    )
}
