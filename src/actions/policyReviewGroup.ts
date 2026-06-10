import { Thunk, Dispatch, GetState } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';
import createPolicyReviewGroupApi, {
  PolicyReviewInput,
} from 'apis/createPolicyReviewGroup';
import changePolicyReviewGroupStatusApi from 'apis/changePolicyReviewGroupStatus';
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

export const changePolicyReviewGroupStatus = ({
  groupId,
  status,
}: {
  groupId: string;
  status: string;
}): Thunk => async (_: Dispatch, getState: GetState): Promise<boolean> => {
  const token = tokenSelector(getState());
  return changePolicyReviewGroupStatusApi({ groupId, status, token });
};
