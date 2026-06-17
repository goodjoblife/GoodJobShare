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
  title: '彈性上下班時間制度',
  summaryBullets: [],
  dataCount: 100,
  availability: {
    title: '是否有彈性上下班時間制度？',
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
};

const FILTER_OPTIONS = [
  { value: '是', label: '有彈性上下班時間' },
  { value: '否', label: '沒有彈性上下班時間' },
  { value: '不知道', label: '不知道' },
];

const RECORDS: LeavePolicyRecord[] = [
  {
    id: '1',
    jobTitle: 'Software Engineer',
    region: 'RD',
    availability: '是',
    experience: '可以彈性調整上下班時間，只要工作完成即可，非常自由',
    sharedAt: '2025.09.05',
  },
  {
    id: '2',
    jobTitle: 'Operations',
    region: '營運',
    availability: '否',
    experience: '固定九點上班，沒有彈性，主管很重視打卡時間',
    sharedAt: '2025.07.20',
  },
];

type Params = { companyName: string };

const CompanyFamilyChildcareFlexibleHoursProvider: React.FC &
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
      availabilityColumnTitle="是否有彈性上下班時間制度"
      filterOptions={FILTER_OPTIONS}
      records={RECORDS}
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
