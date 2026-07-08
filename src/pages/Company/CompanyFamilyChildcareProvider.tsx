import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import FamilyChildcare from 'components/CompanyAndJobTitle/FamilyChildcare';
import { FamilyChildcareData } from 'components/CompanyAndJobTitle/FamilyChildcare/FamilyChildcare';
import { PageType, TabType } from 'constants/companyJobTitle';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyName, { companyNameSelector } from './useCompanyName';

const HARDCODED_DATA: FamilyChildcareData = {
  parentalLeave: {
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
  },
  familyCareLeave: {
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
  },
  flexibleHours: {
    title: '是否有彈性上下班時間制度？',
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  remoteWork: {
    title: '遠端工作制度',
    summaryBullets: ['有遠端工作制度 (100筆)', '每週遠端工作 1 天 (80筆)'],
    dataCount: 150,
    availability: {
      title: '是否可以遠端工作？',
      dataCount: 100,
      items: [
        { label: '是', percentage: 15 },
        { label: '否', percentage: 60 },
        { label: '不知道', percentage: 25 },
      ],
    },
    compliance: {
      title: '遠端工作每週天數？',
      dataCount: 100,
      items: [
        { label: '1天', percentage: 5 },
        { label: '2天', percentage: 5 },
        { label: '3天', percentage: 65 },
        { label: '大於3天', percentage: 25 },
      ],
    },
  },
};

type Params = { companyName: string };

const CompanyFamilyChildcareProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyName();

  useEffect(() => {
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  return (
    <FamilyChildcare
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      data={HARDCODED_DATA}
    />
  );
};

CompanyFamilyChildcareProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName })),
    dispatch(queryRatingStatistics(companyName)),
  ]);
};

export default CompanyFamilyChildcareProvider;
