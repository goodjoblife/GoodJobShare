import { InterviewExperience, WorkExperience } from 'apis/experience';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

const queryExperienceGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      ${experiencePartialGql}

      __typename

      ... on InterviewExperience {
        ${interviewExperiencePartialGql({
          sectionTitleKey: 'interview_subtitle',
        })}
      }

      ... on WorkExperience {
        ${workExperiencesPartialGql({ sectionTitleKey: 'work_subtitle' })}
      }
    }
  }
`;

type RawWorkExperienceSection = {
  work_subtitle: string;
  content: string;
  aspect: string;
  rating: number | null;
};

type RawInterviewExperienceSection = {
  interview_subtitle: string;
  content: string;
  rating: number | null;
};

type QueryExperienceData = {
  experience:
    | (Omit<WorkExperience, 'sections'> & {
        __typename: 'WorkExperience';
        sections: RawWorkExperienceSection[];
      })
    | (Omit<InterviewExperience, 'sections'> & {
        __typename: 'InterviewExperience';
        sections: RawInterviewExperienceSection[];
      })
    | null;
};

const resolveWorkExperienceSections = (
  sections: RawWorkExperienceSection[],
): WorkExperience['sections'] =>
  sections.map(({ work_subtitle, ...rest }) => ({
    ...rest,
    subtitle: work_subtitle,
  }));

const resolveInterviewExperienceSections = (
  sections: RawInterviewExperienceSection[],
): InterviewExperience['sections'] =>
  sections.map(({ interview_subtitle, ...rest }) => ({
    ...rest,
    subtitle: interview_subtitle,
  }));

const queryExperience = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<WorkExperience | InterviewExperience | null> =>
  graphqlClient<QueryExperienceData>({
    query: queryExperienceGql,
    variables: { id },
    token,
  }).then(({ experience }) => {
    if (experience === null) {
      return null;
    }

    if (experience.__typename === 'WorkExperience') {
      const { __typename, sections, ...rest } = experience;
      return {
        ...rest,
        sections: resolveWorkExperienceSections(sections),
      };
    }

    const { __typename, sections, ...rest } = experience;
    return {
      ...rest,
      sections: resolveInterviewExperienceSections(sections),
    };
  });

export default queryExperience;
