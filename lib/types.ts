// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

// Course Types with Modules
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  resources?: { title: string; url: string }[];
}

export interface CourseWithModules {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  level: string;
  category: string;
  features: string[];
  instructor: {
    name: string;
    role: string;
  };
  lessons: Lesson[];
}

// Enrollment Types
export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  currentLessonId: string | null;
  validTill: string; // "Lifetime" or date
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Course Context Types
export interface CourseContextType {
  enrollments: Enrollment[];
  isLoading: boolean;
  enrollInCourse: (courseId: string) => Promise<boolean>;
  updateProgress: (courseId: string, lessonId: string) => void;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  isEnrolled: (courseId: string) => boolean;
}
