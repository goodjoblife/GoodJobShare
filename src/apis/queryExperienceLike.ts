import graphqlClient from 'utils/graphqlClient';

const queryExperienceLikeGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

type QueryExperienceLikeData = {
  experience: { liked: boolean } | null;
};

const queryExperienceLike = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<boolean> =>
  graphqlClient<QueryExperienceLikeData>({
    query: queryExperienceLikeGql,
    variables: { id },
    token,
  }).then(data => {
    if (data.experience === null) {
      throw new Error(`Experience ${id} not found`);
    }
    return data.experience.liked;
  });

export default queryExperienceLike;
