import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryRatingStatistics } from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import LeavePolicySection, {
  LeavePolicyRecord,
} from 'components/CompanyAndJobTitle/LeavePolicySection';
import {
  LeaveBulletByLabel,
  LeaveSection,
} from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import remoteWorkIcon from 'components/CompanyAndJobTitle/remoteWorkIcon.svg';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyName, { companyNameSelector } from './useCompanyName';

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

const SECTION: LeaveSection = {
  dataCount: 150,
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
      { label: '1天', percentage: 5 },
      { label: '2天', percentage: 5 },
      { label: '3天', percentage: 65 },
      { label: '大於3天', percentage: 25 },
    ],
  },
};

const FILTER_OPTIONS = [
  { value: '是', label: '可以遠端工作' },
  { value: '否', label: '無法遠端工作' },
  { value: '不知道', label: '不知道' },
];

const RECORDS: LeavePolicyRecord[] = [
  {
    id: '1',
    jobTitle: 'Backend Engineer',
    region: 'IT',
    availability: '是',
    compliance: '3天',
    experience: '每週可以遠端三天，非常彈性，工作生活品質大幅提升',
    sharedAt: '2025.09.10',
  },
  {
    id: '2',
    jobTitle: 'Analyst',
    region: '營運',
    availability: '否',
    compliance: undefined,
    experience: '主管要求每天到辦公室，遠端工作只有緊急情況才允許',
    sharedAt: '2025.08.03',
  },
];

type Params = { companyName: string };

const CompanyFamilyChildcareRemoteWorkProvider: React.FC &
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
      title="遠端工作制度"
      icon={remoteWorkIcon}
      availabilityTitle="是否可以遠端工作？"
      availabilityBulletByLabel={AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="遠端工作每週天數？"
      complianceBulletByLabel={COMPLIANCE_BULLET_BY_LABEL}
      section={SECTION}
      availabilityColumnTitle="是否可以遠端工作"
      complianceColumnTitle="每週遠端工作天數"
      filterOptions={FILTER_OPTIONS}
      records={RECORDS}
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
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyFamilyChildcareRemoteWorkProvider;
