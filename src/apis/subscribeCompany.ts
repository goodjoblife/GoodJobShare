import graphqlClient from 'utils/graphqlClient';

const subscribeCompanyGql = /* GraphQL */ `
  mutation SubscribeCompany($input: SubscribeCompanyInput!) {
    subscribeCompany(input: $input) {
      success
    }
  }
`;

type SubscribeCompanyData = { subscribeCompany: { success: boolean } };

const subscribeCompany = async ({
  companyId,
  token,
}: {
  companyId: string;
  token?: string;
}): Promise<boolean> => {
  const data = await graphqlClient<SubscribeCompanyData>({
    query: subscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.subscribeCompany.success;
};

export default subscribeCompany;
