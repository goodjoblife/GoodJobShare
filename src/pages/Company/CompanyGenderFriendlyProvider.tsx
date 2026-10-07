import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyEsgSalaryData,
  queryCompanyPolicyReviewStatistics,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import GenderFriendly from 'components/CompanyAndJobTitle/GenderFriendly';
import { GenderFriendlyData } from 'components/CompanyAndJobTitle/GenderFriendly/GenderFriendly';
import { toLeaveSection } from 'components/CompanyAndJobTitle/policyReviewStatistics';
import { PageType, TabType } from 'constants/companyJobTitle';
import { Policy } from 'constants/policy';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import { isFetched } from 'utils/fetchBox';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviewStatistics from './useCompanyPolicyReviewStatistics';

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
  // esgYearStatisticsList 依年份新到舊排序，第一筆即最新年度。
  const femaleManagerStatisticsItem =
    esgYearStatisticsList && esgYearStatisticsList.length > 0
      ? esgYearStatisticsList[0].femaleManagerStatisticsItem
      : null;

  const policyReviewStatistics = useCompanyPolicyReviewStatistics(companyName);

  const data: GenderFriendlyData = {
    menstrualLeave: toLeaveSection(
      policyReviewStatistics,
      Policy.MENSTRUAL_LEAVE,
    ),
  };

  return (
    <CompanyAndJobTitleWrapper
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.GENDER_FRIENDLY}
    >
      <GenderFriendly
        data={data}
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
    dispatch(queryCompanyPolicyReviewStatistics(companyName)),
  ]);
};

export default CompanyGenderFriendlyProvider;
