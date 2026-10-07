import graphqlClient from 'utils/graphqlClient';

const createExperienceLikeGql = /* GraphQL */ `
  mutation($input: CreateExperienceLikeInput!) {
    createExperienceLike(input: $input) {
      experienceLike {
        id
      }
    }
  }
`;

type CreateExperienceLikeData = {
  createExperienceLike: { experienceLike: { id: string } };
};

const createExperienceLike = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<CreateExperienceLikeData['createExperienceLike']> =>
  graphqlClient<CreateExperienceLikeData>({
    query: createExperienceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  }).then(data => data.createExperienceLike);

export default createExperienceLike;
