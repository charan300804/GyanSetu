export type Student = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  class: string;
  attendance: number;
  overallScore: number;
};

export type Course = {
  id: string;
  name: string;
  language: 'English' | 'Punjabi' | 'Hindi';
};

export type ModuleResult = {
  moduleName: string;
  score: number;
  completionTime: number; // in seconds
  attendancePercentage: number;
};

export type Performance = {
  studentId: string;
  courseId: string;
  progress: number;
  modules: ModuleResult[];
};
