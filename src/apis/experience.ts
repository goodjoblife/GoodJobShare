import { JobAverageSalary, SalaryDistributionBin } from 'apis/salaryWorkTime';

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
    salary_work_time_statistics: {
      job_average_salaries: JobAverageSalary[];
    };
  };
  job_title: {
    name: string;
    salary_distribution: {
      bins: SalaryDistributionBin[] | null;
    };
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
};
