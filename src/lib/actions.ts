"use server";

import { summarizeStudentPerformance } from "@/ai/flows/summarize-student-performance";
import type { SummarizeStudentPerformanceInput } from "@/ai/flows/summarize-student-performance";

export async function generateStudentSummary(input: SummarizeStudentPerformanceInput) {
  try {
    const result = await summarizeStudentPerformance(input);
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error("Error generating student summary:", error);
    return { success: false, error: "Failed to generate summary. Please try again." };
  }
}
