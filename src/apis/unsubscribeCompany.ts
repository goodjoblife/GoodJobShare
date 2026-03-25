import graphqlClient from 'utils/graphqlClient';

const unsubscribeCompanyGql = /* GraphQL */ `
  mutation UnsubscribeCompany($input: UnsubscribeCompanyInput!) {
    unsubscribeCompany(input: $input) {
      success
    }
  }
`;
type UnsubscribeCompanyData = {
  unsubscribeCompany: { success: boolean };
};

const unsubscribeCompany = async ({
  companyId,
  token,
}: {
  companyId: string;
  token?: string;
}): Promise<boolean> => {
  const data = await graphqlClient<UnsubscribeCompanyData>({
    query: unsubscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.unsubscribeCompany.success;
};

export default unsubscribeCompany;
