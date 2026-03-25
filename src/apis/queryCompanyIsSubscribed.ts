import graphqlClient from 'utils/graphqlClient';

const queryCompanyIsSubscribedGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      id
      isSubscribed
    }
  }
`;

type QueryCompanyIsSubscribedData = {
  company: {
    id: string;
    isSubscribed: boolean;
  } | null;
};

const queryCompanyIsSubscribed = async ({
  companyName,
  token,
}: {
  companyName: string;
  token?: string;
}): Promise<{ isSubscribed: boolean; companyId: string | null }> => {
  const data = await graphqlClient<QueryCompanyIsSubscribedData>({
    query: queryCompanyIsSubscribedGql,
    token,
    variables: { companyName },
  });

  if (!data.company) {
    return {
      isSubscribed: false,
      companyId: null,
    };
  }

  return {
    isSubscribed: data.company.isSubscribed,
    companyId: data.company.id,
  };
};

export default queryCompanyIsSubscribed;
