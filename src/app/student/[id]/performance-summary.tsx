"use client";

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { SummarizeStudentPerformanceInput } from '@/ai/flows/summarize-student-performance';
import { generateStudentSummary } from '@/lib/actions';

type PerformanceSummaryProps = SummarizeStudentPerformanceInput;

export function PerformanceSummary({
  studentName,
  moduleResults,
}: PerformanceSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');

    const result = await generateStudentSummary({ studentName, moduleResults });

    if (result.success) {
      setSummary(result.summary);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance Summary</CardTitle>
        <CardDescription>
          Generate a summary of this student's strengths and weaknesses.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
        {!isLoading && !summary && (
            <div className="flex items-center justify-center text-center text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
                Click the button to generate an AI-powered summary of {studentName}'s performance.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          className="w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate AI Summary'}
        </Button>
      </CardFooter>
    </Card>
  );
}
