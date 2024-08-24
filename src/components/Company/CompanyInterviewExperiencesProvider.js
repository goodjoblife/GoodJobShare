import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import { paramsSelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryCompanyInterviewExperiences } from 'actions/company';
import {
  interviewExperiences as interviewExperiencesSelector,
  status as statusSelector,
  companyInterviewExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { usePageName, pageNameSelector } from './usePageName';

const useInterviewExperiencesBox = pageName => {
  const selector = useCallback(
    state => {
      const company = companyInterviewExperiencesBoxSelectorByName(pageName)(
        state,
      );
      return {
        status: statusSelector(company),
        interviewExperiences: interviewExperiencesSelector(company),
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const CompanyInterviewExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const page = usePage();

  useEffect(() => {
    dispatch(
      queryCompanyInterviewExperiences({
        companyName: pageName,
        start: 0,
        limit: 10,
      }),
    );
  }, [dispatch, pageName]);

  const [, fetchPermission, canView] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const { status, interviewExperiences } = useInterviewExperiencesBox(pageName);

  return (
    <InterviewExperiences
      pageType={pageType}
      pageName={pageName}
      page={page}
      canView={canView}
      tabType={tabType.INTERVIEW_EXPERIENCE}
      status={status}
      interviewExperiences={interviewExperiences}
    />
  );
};

CompanyInterviewExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return dispatch(
    queryCompanyInterviewExperiences({
      companyName: pageName,
      start: 0,
      limit: 10,
    }),
  );
};

export default CompanyInterviewExperiencesProvider;
