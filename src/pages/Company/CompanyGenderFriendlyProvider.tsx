import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyEsgSalaryData,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import GenderFriendly from 'components/CompanyAndJobTitle/GenderFriendly';
import { GenderFriendlyData } from 'components/CompanyAndJobTitle/GenderFriendly/GenderFriendly';
import { PageType, TabType } from 'constants/companyJobTitle';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import { isFetched } from 'utils/fetchBox';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';

const HARDCODED_DATA: GenderFriendlyData = {
  menstrualLeave: {
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
  genderPayComparison: {
    jobTitlePayItems: [
      { jobTitle: '設備 (33職等)', femaleAvg: 85000, maleAvg: 90000 },
      { jobTitle: 'RD (33職等)', femaleAvg: 110000, maleAvg: 115000 },
      { jobTitle: 'IT (33職等)', femaleAvg: 105000, maleAvg: 110000 },
      { jobTitle: '人資 (32職等)', femaleAvg: 75000, maleAvg: 80000 },
      { jobTitle: '供應鏈 (32職等)', femaleAvg: 80000, maleAvg: 85000 },
    ],
  },
};

type Params = { companyName: string };

const CompanyGenderFriendlyProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();

  useEffect(() => {
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyEsgSalaryData({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  const esgSalaryDataBox = useSelector(
    companyEsgSalaryDataBoxSelectorByName(companyName),
  );
  const esgYearStatisticsList: EsgYearStatistics[] | null = isFetched(
    esgSalaryDataBox,
  )
    ? esgSalaryDataBox.data
    : null;
  // esgYearStatisticsList 依年份新到舊排序，但各指標的最新年度不一定相同，
  // 需另外找出「有 female manager 資料」的最新一筆，不能直接取聯集最新年度的第一筆。
  const femaleManagerYearStatistics = esgYearStatisticsList
    ? esgYearStatisticsList.find(
        item => item.femaleManagerStatisticsItem !== null,
      )
    : null;
  const femaleManagerStatisticsItem = femaleManagerYearStatistics
    ? femaleManagerYearStatistics.femaleManagerStatisticsItem
    : null;

  return (
    <CompanyAndJobTitleWrapper
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.GENDER_FRIENDLY}
    >
      <GenderFriendly
        data={HARDCODED_DATA}
        femaleManagerStatisticsItem={femaleManagerStatisticsItem}
      />
    </CompanyAndJobTitleWrapper>
  );
};

CompanyGenderFriendlyProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName })),
    dispatch(queryCompanyEsgSalaryData({ companyName })),
    dispatch(queryRatingStatistics(companyName)),
  ]);
};

export default CompanyGenderFriendlyProvider;
