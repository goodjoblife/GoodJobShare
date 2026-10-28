import createPolicyReviewGroupApi, {
  CreatePolicyReviewGroupResult,
  PolicyReviewInput,
} from 'apis/createPolicyReviewGroup';
import { AppThunk } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';

import { queryMyPublishIds } from './me';

export const createPolicyReviewGroup = ({
  company,
  jobTitle,
  sector,
  policyReviews,
}: {
  company: { query: string };
  jobTitle: string;
  sector?: string;
  policyReviews: PolicyReviewInput[];
}): AppThunk<Promise<CreatePolicyReviewGroupResult>> => async (
  dispatch,
  getState,
) => {
  const token = tokenSelector(getState());

  const result = await createPolicyReviewGroupApi({
    company,
    jobTitle,
    sector,
    policyReviews,
    token,
  });

  await dispatch(queryMyPublishIds());

  return result;
};
