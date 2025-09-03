export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  class: '10' | '12';
  location: string;
  state: string;
  interests: string[];
  preferredStreams?: string[];
  quizResults?: QuizResults;
}

export interface QuizResults {
  aptitudeScore: number;
  interestAreas: string[];
  recommendedStreams: string[];
  personalityType: string;
  completedAt: Date;
}

export interface College {
  id: string;
  name: string;
  location: string;
  courses: string[];
  facilities: string[];
  ranking: number;
  fees: number;
  admissionProcess: string;
  contactInfo: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredEducation: string[];
  skillsRequired: string[];
  averageSalary: string;
  growthProspects: string;
  relatedCareers: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'exam' | 'admission' | 'scholarship' | 'deadline';
  importance: 'high' | 'medium' | 'low';
  isCompleted: boolean;
}