export enum ExperienceType {
  WORK = 'work',
  INTERVIEW = 'interview',
  INTERN = 'intern',
}

type ExperienceReport = {
  id: string;
  reasonCategory: string;
  reason: string | null;
  createdAt: string;
};

type Salary = {
  type: string;
  amount: number;
};

type SectionWithRating = {
  aspect: string;
  subtitle: string;
  content: string;
  rating: number | null;
};

// Same schema type as SectionWithRating, but interviewExperiencePartialGql
// does not select `aspect`.
type InterviewSection = {
  subtitle: string;
  content: string;
  rating: number | null;
};

// Must be the same schema as
// ${experiencePartialGql}
// ${workExperiencesPartialGql()}
export type WorkExperience = {
  id: string;
  type: ExperienceType.WORK;
  originalCompanyName: string;
  reportCount: number;
  reports: ExperienceReport[];
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: Salary | null;
  title: string | null;
  created_at: string;
  sections: SectionWithRating[];
  week_work_time: number | null;
  recommend_to_others: string | null;
  averageSectionRating: number | null;
  reply_count: number;
  like_count: number;
  sector: string | null;
  gender: string | null;
  jobLevel: string | null;
};

// Must be the same schema as
// ${experiencePartialGql}
// ${interviewExperiencePartialGql()}
export type InterviewExperience = {
  id: string;
  type: ExperienceType.INTERVIEW;
  originalCompanyName: string;
  reportCount: number;
  reports: ExperienceReport[];
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: Salary | null;
  title: string | null;
  created_at: string;
  sections: InterviewSection[];
  interview_time: {
    year: number;
    month: number;
  };
  interview_result: string;
  averageSectionRating: number | null;
  interview_qas:
    | {
        question: string;
        answer: string | null;
      }[]
    | null;
  interview_sensitive_questions: string[] | null;
  reply_count: number;
  like_count: number;
};
