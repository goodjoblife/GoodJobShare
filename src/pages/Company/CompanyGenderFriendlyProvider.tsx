import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyEsgSalaryData,
  queryCompanyPolicyReviewStatistics,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import GenderFriendly from 'components/CompanyAndJobTitle/GenderFriendly';
import useFemaleManagerStatisticsItem from 'components/CompanyAndJobTitle/GenderFriendly/useFemaleManagerStatisticsItem';
import { toGenderFriendlyData } from 'components/CompanyAndJobTitle/policyReviewStatistics';
import { PageType, TabType } from 'constants/companyJobTitle';
import { ServerSideRender } from 'types/serverSideRender';

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

  const femaleManagerStatisticsItem = useFemaleManagerStatisticsItem(
    companyName,
  );

  const policyReviewStatistics = useCompanyPolicyReviewStatistics(companyName);
  const data = toGenderFriendlyData(policyReviewStatistics);

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
