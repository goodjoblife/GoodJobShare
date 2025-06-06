import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WorkExperiences from 'components/CompanyAndJobTitle/WorkExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
import { jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import { isFetched, getFetched } from 'utils/fetchBox';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';

const useWorkExperiencesBoxSelector = pageName => {
  return useCallback(
    state => {
      const box = workExperiencesBoxSelectorByName(pageName)(state);
      if (isFetched(box)) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        const data = {
          ...box.data,
          workExperiences: box.data.workExperiences.map(
            e => experienceBoxSelectorAtId(e.id)(state).data || e,
          ),
        };
        return getFetched(data);
      }
      return box;
    },
    [pageName],
  );
};

const JobTitleWorkExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleWorkExperiences({
        jobTitle,
        companyName: companyName || undefined,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useWorkExperiencesBoxSelector(jobTitle);

  return (
    <WorkExperiences
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      tabType={TAB_TYPE.WORK_EXPERIENCE}
      boxSelector={boxSelector}
    />
  );
};

JobTitleWorkExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const companyName = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    }),
  );
};

export default JobTitleWorkExperiencesProvider;
