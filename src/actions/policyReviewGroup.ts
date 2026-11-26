import createPolicyReviewGroupApi, {
  CreatePolicyReviewGroupResult,
  PolicyReviewInput,
} from 'apis/createPolicyReviewGroup';
import { AppThunk } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';

import { queryCompanyPolicyReviewStatistics } from './company';
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

  // 送出後不再整頁 reload，所以要讓已快取的公司制度統計更新（背景進行，不等待）
  dispatch(
    queryCompanyPolicyReviewStatistics(result.policyReviewGroup.company.name, {
      force: true,
    }),
  );

  return result;
};
