import { PolicyReviewStatistics } from 'apis/queryCompanyPolicyReviewStatistics';
import { Policy } from 'constants/policy';

import { GenderFriendlyData } from './GenderFriendly';
import { toLeaveSection } from '../policyReviewStatistics';

const toGenderFriendlyData = (
  statisticsList: PolicyReviewStatistics[] | null,
): GenderFriendlyData => ({
  menstrualLeave: toLeaveSection(statisticsList, Policy.MENSTRUAL_LEAVE),
});

export default toGenderFriendlyData;
