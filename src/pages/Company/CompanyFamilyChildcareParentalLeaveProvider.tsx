import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryRatingStatistics } from 'actions/company';
import Glike from 'common/icons/Glike';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection from 'components/CompanyAndJobTitle/LeavePolicySection';
import {
  LeaveBulletByLabel,
  LeaveSection,
} from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import parentalLeaveIcon from 'components/CompanyAndJobTitle/parentalLeaveIcon.svg';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviews from './useCompanyPolicyReviews';

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

const SECTION: LeaveSection = {
  dataCount: 200,
  availability: {
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  compliance: {
    dataCount: 100,
    items: [
      { label: '符合勞基法', percentage: 5 },
      { label: '優於勞基法', percentage: 5 },
      { label: '不符合勞基法', percentage: 65 },
      { label: '不知道', percentage: 25 },
    ],
  },
};

const FILTER_OPTIONS = [
  { value: '是', label: '請得到育嬰假' },
  { value: '否', label: '請不到育嬰假' },
  { value: '不知道', label: '不知道' },
];

type Params = { companyName: string };

const CompanyFamilyChildcareParentalLeaveProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const page = usePage();
  const { records, totalCount } = useCompanyPolicyReviews({
    companyName,
    policy: 'PARENTAL_LEAVE',
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
      title="育嬰假(育嬰留職停薪)"
      icon={parentalLeaveIcon}
      availabilityTitle="是否請得到育嬰假?"
      availabilityBulletByLabel={AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="育嬰假法規符合度"
      complianceBulletByLabel={COMPLIANCE_BULLET_BY_LABEL}
      section={SECTION}
      availabilityColumnTitle="是否請得到育嬰假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      records={records}
      totalCount={totalCount}
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
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyFamilyChildcareParentalLeaveProvider;
