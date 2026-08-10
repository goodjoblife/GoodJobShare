import createPolicyReviewGroupApi, {
  PolicyReviewInput,
} from 'apis/createPolicyReviewGroup';
import { Dispatch, GetState, Thunk } from 'reducers';
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
}): Thunk => async (
  dispatch: Dispatch,
  getState: GetState,
): Promise<unknown> => {
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
