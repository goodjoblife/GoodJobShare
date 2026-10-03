import graphqlClient from 'utils/graphqlClient';

const queryMyPublishesGql = /* GraphQL */ `
  query MyPublishes {
    me {
      experiences {
        id
        type
        title
        status
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
        archive {
          is_archived
          reason
        }
      }
    }
  }
`;

type Status = 'published' | 'hidden';

type Archive = {
  is_archived: boolean;
  reason: string | null;
};

type QueryMyPublishesData = {
  me: {
    experiences: {
      id: string;
      type: string;
      title: string | null;
      status: Status;
      archive: Archive;
    }[];
    replies: {
      id: string;
      content: string;
      experience: { id: string; title: string | null };
      status: Status;
    }[];
    salary_work_times: {
      id: string;
      company: { name: string };
      job_title: { name: string };
      status: Status;
      archive: Archive;
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
