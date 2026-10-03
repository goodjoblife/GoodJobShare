import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import FamilyChildcare from 'components/CompanyAndJobTitle/FamilyChildcare';
import { FamilyChildcareData } from 'components/CompanyAndJobTitle/FamilyChildcare/FamilyChildcareSection';
import { PageType, TabType } from 'constants/companyJobTitle';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';

const HARDCODED_DATA: FamilyChildcareData = {
  parentalLeave: {
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
  },
  familyCareLeave: {
    dataCount: 100,
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
  },
  flexibleHours: {
    dataCount: 100,
    items: [
      { label: '是', percentage: 15 },
      { label: '否', percentage: 60 },
      { label: '不知道', percentage: 25 },
    ],
  },
  remoteWork: {
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
  },
};

type Params = { companyName: string };

const CompanyFamilyChildcareProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();

  useEffect(() => {
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  return (
    <CompanyAndJobTitleWrapper
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
    >
      <FamilyChildcare data={HARDCODED_DATA} />
    </CompanyAndJobTitleWrapper>
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
