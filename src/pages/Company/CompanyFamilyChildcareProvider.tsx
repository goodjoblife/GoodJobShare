import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import {
  CompanyPolicyReviewStatistics,
  Policy,
} from 'apis/queryCompanyPolicyReviews';
import { paramsSelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import FamilyChildcare from 'components/CompanyAndJobTitle/FamilyChildcare';
import { PageType, TabType } from 'constants/companyJobTitle';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviews, {
  toLeaveSection,
} from './useCompanyPolicyReviews';

type Params = { companyName: string };

const CompanyFamilyChildcareProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const { statistics } = useCompanyPolicyReviews({
    companyName,
    policy: 'PARENTAL_LEAVE',
    start: 0,
    limit: 1,
  });
  const statisticsByPolicy = (
    policy: Policy,
  ): CompanyPolicyReviewStatistics | undefined =>
    statistics.find(item => item.policy === policy);

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
      <FamilyChildcare
        data={{
          parentalLeave: toLeaveSection(
            statisticsByPolicy('PARENTAL_LEAVE'),
            'PARENTAL_LEAVE',
          ),
          familyCareLeave: toLeaveSection(
            statisticsByPolicy('FAMILY_CARE_LEAVE'),
            'FAMILY_CARE_LEAVE',
          ),
          flexibleHours: toLeaveSection(
            statisticsByPolicy('FLEXIBLE_WORKING_HOUR'),
            'FLEXIBLE_WORKING_HOUR',
          ).availability,
          remoteWork: toLeaveSection(
            statisticsByPolicy('REMOTE_WORK'),
            'REMOTE_WORK',
          ),
        }}
      />
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
