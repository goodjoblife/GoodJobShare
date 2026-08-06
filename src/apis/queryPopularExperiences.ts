import { ExperienceType } from 'apis/experience';
import graphqlClient from 'utils/graphqlClient';

const queryPopularExperiencesGql = /* GraphQL */ `
  {
    popular_experiences(returnNumber: 3) {
      id
      type
      created_at
      title
      preview
      job_title {
        name
      }
      originalCompanyName
      company {
        name
      }
      like_count
      reply_count
    }
  }
`;

export type PopularExperience = {
  id: string;
  type: ExperienceType;
  created_at: string;
  title: string | null;
  preview: string | null;
  job_title: { name: string };
  originalCompanyName: string;
  company: { name: string };
  like_count: number;
  reply_count: number;
};

type QueryPopularExperiencesData = {
  popular_experiences: PopularExperience[];
};

const queryPopularExperiences = (): Promise<PopularExperience[]> =>
  graphqlClient<QueryPopularExperiencesData>({
    query: queryPopularExperiencesGql,
  }).then(data => data.popular_experiences);

export default queryPopularExperiences;
