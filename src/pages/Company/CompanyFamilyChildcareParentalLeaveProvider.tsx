import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyPolicyReviewStatistics,
  queryRatingStatistics,
} from 'actions/company';
import Glike from 'common/icons/Glike';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection, {
  FilterOption,
} from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveBulletByLabel } from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import parentalLeaveIcon from 'components/CompanyAndJobTitle/parentalLeaveIcon.svg';
import { toLeaveSection } from 'components/CompanyAndJobTitle/policyReviewStatistics';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { Policy } from 'constants/policy';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviewsBox from './useCompanyPolicyReviewsBox';
import useCompanyPolicyReviewStatistics from './useCompanyPolicyReviewStatistics';
import useHasPolicyFilter from './useHasPolicyFilter';

const AVAILABILITY_BULLET_BY_LABEL: LeaveBulletByLabel = {
  是: { text: '請得到育嬰假', icon: <Glike /> },
  否: '請不到育嬰假',
  不知道: '不確定是否請得到育嬰假',
};

const COMPLIANCE_BULLET_BY_LABEL: LeaveBulletByLabel = {
  符合勞基法: { text: '育嬰假符合勞基法', icon: <Glike /> },
  優於勞基法: { text: '育嬰假優於勞基法', icon: <Glike /> },
  不符合勞基法: '育嬰假不符合勞基法',
  不知道: '不確定育嬰假是否符合勞基法',
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'yes', label: '請得到育嬰假' },
  { value: 'no', label: '請不到育嬰假' },
  { value: 'unknown', label: '不知道' },
];

type Params = { companyName: string };

const CompanyFamilyChildcareParentalLeaveProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const page = usePage();
  const [selectedHasPolicy, toggleHasPolicy] = useHasPolicyFilter();
  const reviewsBox = useCompanyPolicyReviewsBox({
    companyName,
    policy: 'PARENTAL_LEAVE',
    hasPolicy: selectedHasPolicy,
    start: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  const policyReviewStatistics = useCompanyPolicyReviewStatistics(companyName);
  const section = toLeaveSection(policyReviewStatistics, Policy.PARENTAL_LEAVE);

  return (
    <LeavePolicySection
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      title="育嬰假(育嬰留職停薪)"
      icon={parentalLeaveIcon}
      availabilityTitle="是否請得到育嬰假?"
      availabilityBulletByLabel={AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="育嬰假法規符合度"
      complianceBulletByLabel={COMPLIANCE_BULLET_BY_LABEL}
      section={section}
      availabilityColumnTitle="是否請得到育嬰假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      selectedHasPolicy={selectedHasPolicy}
      onToggleHasPolicy={toggleHasPolicy}
      reviewsBox={reviewsBox}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyFamilyChildcareParentalLeaveProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryRatingStatistics(companyName)),
    dispatch(queryCompanyPolicyReviewStatistics(companyName)),
  ]);
};

export default CompanyFamilyChildcareParentalLeaveProvider;
