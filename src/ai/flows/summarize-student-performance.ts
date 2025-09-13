'use server';

/**
 * @fileOverview Summarizes a student's performance across all modules, highlighting strengths and weaknesses.
 *
 * - summarizeStudentPerformance - A function that generates the student performance summary.
 * - SummarizeStudentPerformanceInput - The input type for the summarizeStudentPerformance function.
 * - SummarizeStudentPerformanceOutput - The return type for the summarizeStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentPerformanceInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  moduleResults: z.array(
    z.object({
      moduleName: z.string().describe('The name of the module.'),
      score: z.number().describe('The student\'s score in the module.'),
      completionTime: z
        .number()
        .describe('The time taken to complete the module, in seconds.'),
      attendancePercentage: z
        .number()
        .describe('The student\'s attendance percentage in the module.'),
    })
  ).describe('An array of results for each module the student has taken.'),
});
export type SummarizeStudentPerformanceInput = z.infer<
  typeof SummarizeStudentPerformanceInputSchema
>;

const SummarizeStudentPerformanceOutputSchema = z.object({
  summary: z.string().describe('A summary of the student\'s performance.'),
});
export type SummarizeStudentPerformanceOutput = z.infer<
  typeof SummarizeStudentPerformanceOutputSchema
>;

export async function summarizeStudentPerformance(
  input: SummarizeStudentPerformanceInput
): Promise<SummarizeStudentPerformanceOutput> {
  return summarizeStudentPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentPerformancePrompt',
  input: {schema: SummarizeStudentPerformanceInputSchema},
  output: {schema: SummarizeStudentPerformanceOutputSchema},
  prompt: `You are an AI assistant that summarizes a student\'s performance across multiple modules.

  Student Name: {{{studentName}}}

  Module Results:
  {{#each moduleResults}}
  - Module Name: {{{moduleName}}}, Score: {{{score}}}, Completion Time: {{{completionTime}}} seconds, Attendance: {{{attendancePercentage}}}%
  {{/each}}

  Based on the student\'s performance in each module, provide a concise summary highlighting their strengths and weaknesses. Focus on areas where the student excels and areas where they may need additional support.
  Ensure the summary is easy to understand for teachers and parents.
  `,
});

const summarizeStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'summarizeStudentPerformanceFlow',
    inputSchema: SummarizeStudentPerformanceInputSchema,
    outputSchema: SummarizeStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
