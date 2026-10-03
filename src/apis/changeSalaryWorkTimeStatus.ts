import { PublishStatus } from 'constants/publishStatus';
import graphqlClient from 'utils/graphqlClient';

const changeSalaryWorkTimeStatusGql = /* GraphQL */ `
  mutation($input: ChangeSalaryWorkTimeStatusInput!) {
    changeSalaryWorkTimeStatus(input: $input) {
      salary_work_time {
        id
      }
    }
  }
`;

type ChangeSalaryWorkTimeStatusData = {
  changeSalaryWorkTimeStatus: { salary_work_time: { id: string | null } };
};

const changeSalaryWorkTimeStatus = ({
  id,
  status,
  token,
}: {
  id: string;
  status: PublishStatus;
  token?: string;
}): Promise<void> =>
  graphqlClient<ChangeSalaryWorkTimeStatusData>({
    query: changeSalaryWorkTimeStatusGql,
    variables: { input: { id, status } },
    token,
  }).then(() => undefined);

export default changeSalaryWorkTimeStatus;
