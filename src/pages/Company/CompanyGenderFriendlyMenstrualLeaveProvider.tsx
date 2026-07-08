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
  title: '生理假',
  summaryBullets: ['請不到生理假 (80筆)', '生理假不符合勞基法 (60筆)'],
  dataCount: 100,
  availability: {
    title: '是否請得到生理假',
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  compliance: {
    title: '生理假法規符合度',
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
  { value: '是', label: '請得到生理假' },
  { value: '否', label: '請不到生理假' },
  { value: '不知道', label: '不知道' },
];

const RECORDS: LeavePolicyRecord[] = [
  {
    id: '1',
    jobTitle: 'QA',
    region: 'IT',
    availability: '是',
    compliance: '優於',
    experience: '每個月可以請兩天，應該優於勞基法。我偶爾會請，沒有什麼問題',
    sharedAt: '2025.08.11',
  },
  {
    id: '2',
    jobTitle: 'Data Engineer',
    region: 'IT',
    availability: '是',
    compliance: '符合',
    experience: '請得到，主管也是女性，可以理解女生的需求',
    sharedAt: '2025.07.11',
  },
];

type Params = { companyName: string };

const CompanyGenderFriendlyMenstrualLeaveProvider: React.FC &
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
      tabType={TabType.GENDER_FRIENDLY}
      section={SECTION}
      availabilityColumnTitle="是否請得到生理假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      records={RECORDS}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyGenderFriendlyMenstrualLeaveProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyGenderFriendlyMenstrualLeaveProvider;
