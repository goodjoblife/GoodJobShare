import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyEsgSalaryData,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { paramsSelector } from 'common/routing/selectors';
import GenderFriendly from 'components/CompanyAndJobTitle/GenderFriendly';
import { GenderFriendlyData } from 'components/CompanyAndJobTitle/GenderFriendly/GenderFriendly';
import { PageType, TabType } from 'constants/companyJobTitle';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import { isFetched } from 'utils/fetchBox';

import useCompanyName, { companyNameSelector } from './useCompanyName';

const HARDCODED_DATA: GenderFriendlyData = {
  menstrualLeave: {
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
  const companyName = useCompanyName();

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
  const esgSalaryData: ESGSalaryData | null = isFetched(esgSalaryDataBox)
    ? esgSalaryDataBox.data
    : null;
  const femaleManagerStatistics =
    esgSalaryData && esgSalaryData.femaleManagerStatistics;
  const femaleManagerStatisticsItem =
    femaleManagerStatistics && femaleManagerStatistics.length > 0
      ? femaleManagerStatistics[femaleManagerStatistics.length - 1]
      : null;

  return (
    <GenderFriendly
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.GENDER_FRIENDLY}
      data={HARDCODED_DATA}
      femaleManagerStatisticsItem={femaleManagerStatisticsItem}
    />
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
