import R from 'ramda';

import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyPolicyReviewsGql = /* GraphQL */ `
  query(
    $companyName: String!
    $policy: PolicyEnum!
    $start: Int!
    $limit: Int!
  ) {
    company(name: $companyName) {
      policyReviewsResult(policy: $policy, start: $start, limit: $limit) {
        count
        policyReviews {
          id
          jobTitle
          sector
          review
          hasPolicy
          compliance
          remoteWorkPolicy
          createdAt
        }
      }
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

export type Policy =
  | 'MENSTRUAL_LEAVE'
  | 'PARENTAL_LEAVE'
  | 'FAMILY_CARE_LEAVE'
  | 'FLEXIBLE_WORKING_HOUR'
  | 'REMOTE_WORK';

type YesNoOrUnknownCount = {
  yes: number;
  no: number;
  unknown: number;
};

type RemoteWorkPolicyCount = {
  remoteWorkPolicy:
    | 'ONE_DAY_PER_WEEK'
    | 'TWO_DAYS_PER_WEEK'
    | 'THREE_DAYS_PER_WEEK'
    | 'FOUR_DAYS_PER_WEEK'
    | 'NO_LIMIT';
  count: number;
};

export type PolicyReview = {
  id: string;
  jobTitle: string;
  sector: string | null;
  review: string | null;
  hasPolicy: 'yes' | 'no' | 'unknown';
  compliance: 'yes' | 'no' | 'unknown' | null;
  remoteWorkPolicy: RemoteWorkPolicyCount['remoteWorkPolicy'] | null;
  createdAt: string;
};

export type CompanyPolicyReviewStatistics = {
  policy: Policy;
  hasPolicyCount: YesNoOrUnknownCount;
  complianceCount: YesNoOrUnknownCount | null;
  remoteWorkPolicyCount: RemoteWorkPolicyCount[] | null;
};

export type CompanyPolicyReviews = {
  policyReviewsResult: {
    count: number;
    policyReviews: PolicyReview[];
  };
  policyReviewStatistics: CompanyPolicyReviewStatistics[];
};

type QueryCompanyPolicyReviewsData = {
  company: (Company & CompanyPolicyReviews) | null;
};

const queryCompanyPolicyReviews = ({
  companyName,
  policy,
  start,
  limit,
}: {
  companyName: string;
  policy: Policy;
  start: number;
  limit: number;
}): Promise<QueryCompanyPolicyReviewsData['company']> =>
  graphqlClient<QueryCompanyPolicyReviewsData>({
    query: queryCompanyPolicyReviewsGql,
    variables: { companyName, policy, start, limit },
  }).then(R.prop('company'));

export default queryCompanyPolicyReviews;
