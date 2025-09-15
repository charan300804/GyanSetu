export type Student = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  class: string;
  attendance: number;
  overallScore: number;
};

export type Teacher = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'Class Teacher' | 'Subject Teacher' | 'Principal';
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

export type TimetableEntry = {
  day: string;
  periods: {
    time: string;
    subject: string;
    teacher: string;
  }[];
};

export type Assignment = {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export type LessonVideo = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  thumbnailUrl: string;
  videoUrl: string;
  watched: boolean;
};

export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
};

export type Quiz = {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
};
