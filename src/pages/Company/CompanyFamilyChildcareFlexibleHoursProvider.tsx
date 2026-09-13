import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryRatingStatistics } from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection, {
  FilterOption,
} from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveSection } from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviews from './useCompanyPolicyReviews';
import useHasPolicyFilter from './useHasPolicyFilter';

const SECTION: LeaveSection = {
  dataCount: 100,
  availability: {
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'yes', label: '有彈性上下班時間' },
  { value: 'no', label: '沒有彈性上下班時間' },
  { value: 'unknown', label: '不知道' },
];

type Params = { companyName: string };

const CompanyFamilyChildcareFlexibleHoursProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const page = usePage();
  const [selectedHasPolicy, toggleHasPolicy] = useHasPolicyFilter();
  const reviewsBox = useCompanyPolicyReviews({
    companyName,
    policy: 'FLEXIBLE_WORKING_HOUR',
    hasPolicy: selectedHasPolicy,
    start: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  return (
    <LeavePolicySection
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      title="彈性上下班時間制度"
      availabilityTitle="是否有彈性上下班時間制度？"
      section={SECTION}
      availabilityColumnTitle="是否有彈性上下班時間制度"
      filterOptions={FILTER_OPTIONS}
      selectedHasPolicy={selectedHasPolicy}
      onToggleHasPolicy={toggleHasPolicy}
      reviewsBox={reviewsBox}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyFamilyChildcareFlexibleHoursProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyFamilyChildcareFlexibleHoursProvider;
