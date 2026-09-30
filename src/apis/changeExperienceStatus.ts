import graphqlClient from 'utils/graphqlClient';

const changeExperienceStatusGql = /* GraphQL */ `
  mutation($input: ChangeExperienceStatusInput!) {
    changeExperienceStatus(input: $input) {
      experience {
        id
      }
    }
  }
`;

type ChangeExperienceStatusData = {
  changeExperienceStatus: { experience: { id: string } };
};

const changeExperienceStatus = ({
  id,
  status,
  token,
}: {
  id: string;
  status: 'published' | 'hidden';
  token?: string;
}): Promise<ChangeExperienceStatusData['changeExperienceStatus']> =>
  graphqlClient<ChangeExperienceStatusData>({
    query: changeExperienceStatusGql,
    variables: { input: { id, status } },
    token,
  }).then(data => data.changeExperienceStatus);

export default changeExperienceStatus;
