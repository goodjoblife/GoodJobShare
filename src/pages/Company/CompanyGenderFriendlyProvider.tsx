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
import { PageType, TabType } from 'constants/companyJobTitle';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import { isFetched } from 'utils/fetchBox';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviews, {
  toLeaveSection,
} from './useCompanyPolicyReviews';

const GENDER_PAY_COMPARISON = {
  jobTitlePayItems: [
    { jobTitle: '設備 (33職等)', femaleAvg: 85000, maleAvg: 90000 },
    { jobTitle: 'RD (33職等)', femaleAvg: 110000, maleAvg: 115000 },
    { jobTitle: 'IT (33職等)', femaleAvg: 105000, maleAvg: 110000 },
    { jobTitle: '人資 (32職等)', femaleAvg: 75000, maleAvg: 80000 },
    { jobTitle: '供應鏈 (32職等)', femaleAvg: 80000, maleAvg: 85000 },
  ],
};

type Params = { companyName: string };

const CompanyGenderFriendlyProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const { statistics } = useCompanyPolicyReviews({
    companyName,
    policy: 'MENSTRUAL_LEAVE',
    start: 0,
    limit: 1,
  });

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
  // esgYearStatisticsList 依年份新到舊排序，第一筆即最新年度。
  const femaleManagerStatisticsItem =
    esgYearStatisticsList && esgYearStatisticsList.length > 0
      ? esgYearStatisticsList[0].femaleManagerStatisticsItem
      : null;

  return (
    <CompanyAndJobTitleWrapper
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.GENDER_FRIENDLY}
    >
      <GenderFriendly
        data={{
          menstrualLeave: toLeaveSection(
            statistics.find(item => item.policy === 'MENSTRUAL_LEAVE'),
            'MENSTRUAL_LEAVE',
          ),
          genderPayComparison: GENDER_PAY_COMPARISON,
        }}
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
