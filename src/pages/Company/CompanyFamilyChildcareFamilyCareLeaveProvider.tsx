import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryRatingStatistics } from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection, {
  LeavePolicyRecord,
} from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveSection } from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyName, { companyNameSelector } from './useCompanyName';

const SECTION: LeaveSection = {
  title: '家庭照顧假',
  summaryBullets: [
    '請不到家庭照顧假 (50筆)',
    '家庭照顧假不清楚是否符合勞基法 (40筆)',
  ],
  dataCount: 100,
  availability: {
    title: '是否請得到家庭照顧假？',
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  compliance: {
    title: '家庭照顧假法規符合度',
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
  { value: '是', label: '請得到家庭照顧假' },
  { value: '否', label: '請不到家庭照顧假' },
  { value: '不知道', label: '不知道' },
];

const RECORDS: LeavePolicyRecord[] = [
  {
    id: '1',
    jobTitle: 'Product Manager',
    region: '產品部',
    availability: '否',
    compliance: '不符合',
    experience: '主管說這個假不好請，建議用年假代替',
    sharedAt: '2025.08.20',
  },
  {
    id: '2',
    jobTitle: 'Designer',
    region: '設計部',
    availability: '不知道',
    compliance: '不知道',
    experience: '不確定公司是否有這個假，從來沒聽同事提過',
    sharedAt: '2025.07.05',
  },
];

type Params = { companyName: string };

const CompanyFamilyChildcareFamilyCareLeaveProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyName();
  const page = usePage();

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  return (
    <LeavePolicySection
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      section={SECTION}
      availabilityColumnTitle="是否請得到家庭照顧假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      records={RECORDS}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyFamilyChildcareFamilyCareLeaveProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyFamilyChildcareFamilyCareLeaveProvider;
