import graphqlClient from 'utils/graphqlClient';

const queryExperienceCountGql = /* GraphQL */ `
  query {
    experienceCount
  }
`;

type QueryExperienceCountData = {
  experienceCount: number;
};

const queryExperienceCount = async (): Promise<number> => {
  const data = await graphqlClient<QueryExperienceCountData>({
    query: queryExperienceCountGql,
  });
  return data.experienceCount;
};

export default queryExperienceCount;
