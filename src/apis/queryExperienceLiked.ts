import graphqlClient from 'utils/graphqlClient';

const queryExperienceLikedGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

type QueryExperienceLikedData = {
  experience: { liked: boolean } | null;
};

const queryExperienceLiked = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<boolean> =>
  graphqlClient<QueryExperienceLikedData>({
    query: queryExperienceLikedGql,
    variables: { id },
    token,
  }).then(data => {
    if (data.experience === null) {
      throw new Error(`Experience ${id} not found`);
    }
    return data.experience.liked;
  });

export default queryExperienceLiked;
