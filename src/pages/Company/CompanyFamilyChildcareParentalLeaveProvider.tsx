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
  title: '育嬰假(育嬰留職停薪)',
  summaryBullets: ['請得到育嬰假 (60筆)', '育嬰假優於勞基法 (50筆)'],
  dataCount: 200,
  availability: {
    title: '是否請得到育嬰假?',
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  compliance: {
    title: '育嬰假法規符合度',
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

const RECORDS: LeavePolicyRecord[] = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    region: 'RD',
    availability: '是',
    compliance: '優於',
    experience: '公司育嬰假制度完善，主管也很支持，沒有任何壓力',
    sharedAt: '2025.09.01',
  },
  {
    id: '2',
    jobTitle: 'HR',
    region: '人資',
    availability: '否',
    compliance: '不符合',
    experience: '上司暗示不要請，說影響升遷，感覺公司文化還需改善',
    sharedAt: '2025.06.15',
  },
];

type Params = { companyName: string };

const CompanyFamilyChildcareParentalLeaveProvider: React.FC &
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
      availabilityColumnTitle="是否請得到育嬰假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      records={RECORDS}
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
