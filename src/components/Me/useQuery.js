import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import graphqlClient from 'utils/graphqlClient';
import useToken from 'hooks/useToken';
import api from '../../apis';

const myPublishesQuery = `
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

export const useFetchMyPublishes = () => {
  const token = useToken();
  const [state, callback] = useAsyncFn(
    () => graphqlClient({ query: myPublishesQuery, token }),
    [token],
  );

  return [state, callback];
};

export const useToggleExperienceStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return api.experiences.patchExperience({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleSalaryWorkTimeStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return api.timeAndSalary.patchWorking({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleReplyStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return api.experiences.patchReply({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
