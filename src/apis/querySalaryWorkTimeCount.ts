import graphqlClient from 'utils/graphqlClient';

const querySalaryWorkTimeCountGql = /* GraphQL */ `
  query {
    salaryWorkTimeCount
  }
`;

type QuerySalaryWorkTimeCountData = {
  salaryWorkTimeCount: number;
};

const querySalaryWorkTimeCount = async (): Promise<number> => {
  const data = await graphqlClient<QuerySalaryWorkTimeCountData>({
    query: querySalaryWorkTimeCountGql,
  });
  return data.salaryWorkTimeCount;
};

export default querySalaryWorkTimeCount;
