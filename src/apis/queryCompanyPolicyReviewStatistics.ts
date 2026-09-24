import { YesNoOrUnknownCount } from 'apis/salaryWorkTime';
import { Policy, RemoteWorkPolicy } from 'constants/policy';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyPolicyReviewStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      policyReviewStatistics {
        policy
        hasPolicyCount {
          yes
          no
          unknown
        }
        complianceCount {
          yes
          no
          unknown
        }
        remoteWorkPolicyCount {
          remoteWorkPolicy
          count
        }
      }
    }
  }
`;

// Must be the same as graphql schema (RemoteWorkPolicyCount)
export type RemoteWorkPolicyCount = {
  remoteWorkPolicy: RemoteWorkPolicy;
  count: number;
};

// Must be the same as graphql schema (CompanyPolicyReviewStatistics)
export type PolicyReviewStatistics = {
  policy: Policy;
  hasPolicyCount: YesNoOrUnknownCount;
  // policy 為 FLEXIBLE_WORKING_HOUR、REMOTE_WORK 時為 null
  complianceCount: YesNoOrUnknownCount | null;
  // 僅 policy 為 REMOTE_WORK 時有值
  remoteWorkPolicyCount: RemoteWorkPolicyCount[] | null;
};

type QueryCompanyPolicyReviewStatisticsData = {
  company:
    | (Company & {
        policyReviewStatistics: PolicyReviewStatistics[];
      })
    | null;
};

const queryCompanyPolicyReviewStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<PolicyReviewStatistics[] | null> =>
  graphqlClient<QueryCompanyPolicyReviewStatisticsData>({
    query: queryCompanyPolicyReviewStatisticsGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.policyReviewStatistics : null));

export default queryCompanyPolicyReviewStatistics;
