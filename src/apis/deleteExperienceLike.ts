import graphqlClient from 'utils/graphqlClient';

const deleteExperienceLikeGql = /* GraphQL */ `
  mutation($input: DeleteExperienceLikeInput!) {
    deleteExperienceLike(input: $input) {
      deletedExperienceId
    }
  }
`;

type DeleteExperienceLikeData = {
  deleteExperienceLike: { deletedExperienceId: string };
};

const deleteExperienceLike = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<DeleteExperienceLikeData['deleteExperienceLike']> =>
  graphqlClient<DeleteExperienceLikeData>({
    query: deleteExperienceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  }).then(data => data.deleteExperienceLike);

export default deleteExperienceLike;
