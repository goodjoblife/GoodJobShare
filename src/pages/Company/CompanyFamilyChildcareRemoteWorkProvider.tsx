import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyPolicyReviewStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection, {
  FilterOption,
} from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveBulletByLabel } from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import { toLeaveSection } from 'components/CompanyAndJobTitle/policyReviewStatistics';
import remoteWorkIcon from 'components/CompanyAndJobTitle/remoteWorkIcon.svg';
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
  是: '有遠端工作制度',
  否: '無遠端工作制度',
  不知道: '不確定是否有遠端工作制度',
};

const COMPLIANCE_BULLET_BY_LABEL: LeaveBulletByLabel = {
  '1天': '每週遠端工作 1 天',
  '2天': '每週遠端工作 2 天',
  '3天': '每週遠端工作 3 天',
  大於3天: '每週遠端工作超過 3 天',
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'yes', label: '可以遠端工作' },
  { value: 'no', label: '無法遠端工作' },
  { value: 'unknown', label: '不知道' },
];

type Params = { companyName: string };

const CompanyFamilyChildcareRemoteWorkProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const page = usePage();
  const [selectedHasPolicy, toggleHasPolicy] = useHasPolicyFilter();
  const reviewsBox = useCompanyPolicyReviewsBox({
    companyName,
    policy: 'REMOTE_WORK',
    hasPolicy: selectedHasPolicy,
    start: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  const policyReviewStatistics = useCompanyPolicyReviewStatistics(companyName);
  const section = toLeaveSection(policyReviewStatistics, Policy.REMOTE_WORK);

  return (
    <LeavePolicySection
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      title="遠端工作制度"
      icon={remoteWorkIcon}
      availabilityTitle="是否可以遠端工作？"
      availabilityBulletByLabel={AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="遠端工作每週天數？"
      complianceBulletByLabel={COMPLIANCE_BULLET_BY_LABEL}
      section={section}
      availabilityColumnTitle="是否可以遠端工作"
      complianceColumnTitle="每週遠端工作天數"
      filterOptions={FILTER_OPTIONS}
      selectedHasPolicy={selectedHasPolicy}
      onToggleHasPolicy={toggleHasPolicy}
      reviewsBox={reviewsBox}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyFamilyChildcareRemoteWorkProvider.fetchData = async ({
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

export default CompanyFamilyChildcareRemoteWorkProvider;
