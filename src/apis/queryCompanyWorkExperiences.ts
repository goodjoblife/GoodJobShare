import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';

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

export type WorkExperience = {
  id: string;
  type: string;
  originalCompanyName: string;
  reportCount: number;
  reports: {
    id: string;
    reasonCategory: string;
    reason: string;
    createdAt: string;
  }[];
  company: {
    name: string;
    salary_work_time_statistics: {
      job_average_salaries: {
        job_title: { name: string };
        average_salary: { type: string; amount: number };
        data_count: number;
      }[];
    };
  };
  job_title: {
    name: string;
    salary_distribution: {
      bins: {
        data_count: number;
        range: { type: string; from: number; to: number };
      }[];
    };
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: { type: string; amount: number } | null;
  title: string | null;
  created_at: string;
  sections: {
    subtitle: string;
    content: string;
    aspect: string | null;
    rating: number | null;
  }[];
  week_work_time: number | null;
  recommend_to_others: string | null;
  averageSectionRating: number | null;
  reply_count: number;
  like_count: number;
  sector: string | null;
  gender: string | null;
  jobLevel: string | null;
};

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
