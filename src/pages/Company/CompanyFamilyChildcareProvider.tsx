import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyPolicyReviewStatistics,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import FamilyChildcare from 'components/CompanyAndJobTitle/FamilyChildcare';
import { FamilyChildcareData } from 'components/CompanyAndJobTitle/FamilyChildcare/FamilyChildcareSection';
import {
  toAvailabilityDistribution,
  toLeaveSection,
} from 'components/CompanyAndJobTitle/policyReviewStatistics';
import { PageType, TabType } from 'constants/companyJobTitle';
import { Policy } from 'constants/policy';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import { isFetched } from 'utils/fetchBox';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';

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

  useEffect(() => {
    dispatch(queryCompanyPolicyReviewStatistics(companyName));
  }, [dispatch, companyName]);

  const policyReviewStatisticsBox = useSelector(
    companyPolicyReviewStatisticsBoxSelectorByName(companyName),
  );
  const policyReviewStatistics = isFetched(policyReviewStatisticsBox)
    ? policyReviewStatisticsBox.data
    : null;

  const data: FamilyChildcareData = {
    parentalLeave: toLeaveSection(
      policyReviewStatistics,
      Policy.PARENTAL_LEAVE,
    ),
    familyCareLeave: toLeaveSection(
      policyReviewStatistics,
      Policy.FAMILY_CARE_LEAVE,
    ),
    flexibleHours: toAvailabilityDistribution(
      policyReviewStatistics,
      Policy.FLEXIBLE_WORKING_HOUR,
    ),
    remoteWork: toLeaveSection(policyReviewStatistics, Policy.REMOTE_WORK),
  };

  return (
    <CompanyAndJobTitleWrapper
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
    >
      <FamilyChildcare data={data} />
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
    dispatch(queryCompanyPolicyReviewStatistics(companyName)),
  ]);
};

export default CompanyFamilyChildcareProvider;
