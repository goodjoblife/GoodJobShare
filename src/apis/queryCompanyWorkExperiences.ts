import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { ExperienceType } from 'apis/experience';
import { JobAverageSalary, SalaryDistributionBin } from 'apis/salaryWorkTime';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';

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
  sector: string | null;
  gender: string | null;
  jobLevel: string | null;
};

const queryCompanyWorkExperiencesGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
    $aspectFilter: AspectFilter
  ) {
    company(name: $companyName) {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
        aspectFilter: $aspectFilter
      ) {
        count
        workExperiences {
          ${experiencePartialGql}
          ${workExperiencesPartialGql()}
        }
      }
    }
  }
`;

type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperience[];
        };
      })
    | null;
};

const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
  aspectFilter,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
  aspectFilter?: string;
}): Promise<QueryCompanyWorkExperiencesData['company']> =>
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: queryCompanyWorkExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy, aspectFilter },
  }).then(R.prop('company'));

export default queryCompanyWorkExperiences;
