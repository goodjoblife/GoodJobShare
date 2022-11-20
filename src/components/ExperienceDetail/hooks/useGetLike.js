import { useAsyncFn } from 'react-use';
import graphqlClient from 'utils/graphqlClient';
import { useToken } from 'hooks/auth';

const getLikeQuery = `
  query Like($id: ID!) {
    experience(id: $id) {
      id
      like_count
      liked
    }
  }
`;

const useGetLike = experienceId => {
  const token = useToken();
  return useAsyncFn(async () => {
    return await graphqlClient({
      query: getLikeQuery,
      variables: { id: experienceId },
      token,
    });
  }, [experienceId, token]);
};

export default useGetLike;
