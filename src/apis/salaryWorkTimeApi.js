import graphqlClient from 'utils/graphqlClient';

const querySalaryWorkTimeCountGql = /* GraphQL */ `
  query {
    salaryWorkTimeCount
  }
`;

export const querySalaryWorkTimeCountApi = async () => {
  const data = await graphqlClient({
    query: querySalaryWorkTimeCountGql,
  });
  return data.salaryWorkTimeCount;
};
