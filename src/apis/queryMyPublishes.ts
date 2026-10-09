import { PublishStatus } from 'constants/publishStatus';
import graphqlClient from 'utils/graphqlClient';

const queryMyPublishesGql = /* GraphQL */ `
  query MyPublishes {
    me {
      experiences {
        id
        type
        title
        status
        created_at
        archive {
          is_archived
          reason
        }
      }

      replies {
        id
        content
        experience {
          id
          title
        }
        status
        created_at
      }

      salary_work_times {
        id
        company {
          name
        }
        job_title {
          name
        }
        status
        created_at
        archive {
          is_archived
          reason
        }
      }

      policyReviewGroupList {
        groupId
        company {
          name
        }
        jobTitle
        status
        archive {
          is_archived
          reason
        }
        createdAt
      }
    }
  }
`;

type Archive = {
  is_archived: boolean;
  reason: string;
};

type QueryMyPublishesData = {
  me: {
    experiences: {
      id: string;
      type: 'work' | 'interview' | 'intern';
      title: string | null;
      status: PublishStatus;
      created_at: string;
      archive: Archive;
    }[];
    replies: {
      id: string;
      content: string;
      experience: { id: string; title: string | null } | null;
      status: PublishStatus;
      created_at: string;
    }[];
    salary_work_times: {
      id: string;
      company: { name: string };
      job_title: { name: string };
      status: PublishStatus;
      created_at: string;
      archive: Archive;
    }[];
    policyReviewGroupList: {
      groupId: string;
      company: { name: string };
      jobTitle: string;
      status: PublishStatus;
      archive: Archive;
      createdAt: string;
    }[];
  };
};

const queryMyPublishes = ({
  token,
}: {
  token?: string;
}): Promise<QueryMyPublishesData> =>
  graphqlClient<QueryMyPublishesData>({ query: queryMyPublishesGql, token });

export default queryMyPublishes;
