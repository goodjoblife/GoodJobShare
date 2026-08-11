import { ExperienceType } from 'apis/experience';
import graphqlClient from 'utils/graphqlClient';

const queryRelatedExperiencesGql = /* GraphQL */ `
  query($id: ID!, $start: Int!, $limit: Int!) {
    experience(id: $id) {
      id
      relatedExperiences(start: $start, limit: $limit) {
        id
        type
        originalCompanyName
        company {
          name
        }
        job_title {
          name
        }
        created_at
        salary {
          type
          amount
        }

        __typename

        ... on InterviewExperience {
          sections {
            interview_subtitle: subtitle
            content
          }
          averageSectionRating
        }

        ... on WorkExperience {
          sections {
            work_subtitle: subtitle
            content
            aspect
            rating
          }
          week_work_time
          recommend_to_others
          averageSectionRating
        }
      }
    }
  }
`;

// Same schema type as SectionWithRating, but this query does not select
// `aspect` or `rating` for interview sections.
type InterviewSection = {
  subtitle: string;
  content: string;
};

type WorkSection = {
  subtitle: string;
  content: string;
  aspect: string;
  rating: number | null;
};

export type WorkExperienceInRelatedExperiences = {
  id: string;
  type: ExperienceType.WORK;
  originalCompanyName: string;
  company: { name: string };
  job_title: { name: string };
  created_at: string;
  salary: { type: string; amount: number } | null;
  sections: WorkSection[];
  week_work_time: number | null;
  recommend_to_others: string | null;
  averageSectionRating: number | null;
};

export type InterviewExperienceInRelatedExperiences = {
  id: string;
  type: ExperienceType.INTERVIEW;
  originalCompanyName: string;
  company: { name: string };
  job_title: { name: string };
  created_at: string;
  salary: { type: string; amount: number } | null;
  sections: InterviewSection[];
  averageSectionRating: number | null;
};

type RawWorkExperience = Omit<
  WorkExperienceInRelatedExperiences,
  'sections'
> & {
  __typename: 'WorkExperience';
  sections: {
    work_subtitle: string;
    content: string;
    aspect: string;
    rating: number | null;
  }[];
};

type RawInterviewExperience = Omit<
  InterviewExperienceInRelatedExperiences,
  'sections'
> & {
  __typename: 'InterviewExperience';
  sections: { interview_subtitle: string; content: string }[];
};

type QueryRelatedExperiencesData = {
  experience: {
    relatedExperiences: (RawWorkExperience | RawInterviewExperience)[];
  } | null;
};

const resolveWorkExperience = (
  raw: RawWorkExperience,
): WorkExperienceInRelatedExperiences => {
  const { __typename, sections, ...rest } = raw;
  return {
    ...rest,
    sections: sections.map(({ work_subtitle, ...section }) => ({
      ...section,
      subtitle: work_subtitle,
    })),
  };
};

const resolveInterviewExperience = (
  raw: RawInterviewExperience,
): InterviewExperienceInRelatedExperiences => {
  const { __typename, sections, ...rest } = raw;
  return {
    ...rest,
    sections: sections.map(({ interview_subtitle, ...section }) => ({
      ...section,
      subtitle: interview_subtitle,
    })),
  };
};

const queryRelatedExperiences = ({
  id,
  start,
  limit,
}: {
  id: string;
  start: number;
  limit: number;
}): Promise<
  (
    | WorkExperienceInRelatedExperiences
    | InterviewExperienceInRelatedExperiences)[]
> =>
  graphqlClient<QueryRelatedExperiencesData>({
    query: queryRelatedExperiencesGql,
    variables: { id, start, limit },
  }).then(({ experience }) => {
    if (experience === null) {
      return [];
    }

    return experience.relatedExperiences.map(raw =>
      raw.__typename === 'WorkExperience'
        ? resolveWorkExperience(raw)
        : resolveInterviewExperience(raw),
    );
  });

export default queryRelatedExperiences;
