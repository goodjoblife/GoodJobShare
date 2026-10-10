import { PolicyReviewStatistics } from 'apis/queryCompanyPolicyReviewStatistics';
import { Policy } from 'constants/policy';

import { FamilyChildcareData } from './FamilyChildcareSection';
import {
  toAvailabilityDistribution,
  toLeaveSection,
} from '../policyReviewStatistics';

const toFamilyChildcareData = (
  statisticsList: PolicyReviewStatistics[] | null,
): FamilyChildcareData => ({
  parentalLeave: toLeaveSection(statisticsList, Policy.PARENTAL_LEAVE),
  familyCareLeave: toLeaveSection(statisticsList, Policy.FAMILY_CARE_LEAVE),
  flexibleHours: toAvailabilityDistribution(
    statisticsList,
    Policy.FLEXIBLE_WORKING_HOUR,
  ),
  remoteWork: toLeaveSection(statisticsList, Policy.REMOTE_WORK),
});

export default toFamilyChildcareData;
