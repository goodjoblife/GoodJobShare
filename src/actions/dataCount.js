import { getExperiences } from '../apis/experiencesApi';
import { fetchTimeAndSalary } from '../apis/timeAndSalaryApi';
import fetchLaborRightsMetaList from '../apis/laborRightsApi';

export const SET_EXPERIENCE_COUNT = '@@dataCount/SET_EXPERIENCE_COUNT';
export const SET_TIME_AND_SALARY_COUNT = '@@dataCount/SET_TIME_AND_SALARY_COUNT';
export const SET_LABOR_RIGHTS_COUNT = '@@dataCount/SET_LABOR_RIGHTS_COUNT';

export const setExperienceCount = (count, hasFetched, err) => ({
  type: SET_EXPERIENCE_COUNT,
  count,
  hasFetched,
  err,
});

export const setTimeAndSalaryCount = (count, hasFetched, err) => ({
  type: SET_TIME_AND_SALARY_COUNT,
  count,
  hasFetched,
  err,
});

export const setLaborRightsCount = (count, hasFetched, err) => ({
  type: SET_LABOR_RIGHTS_COUNT,
  count,
  hasFetched,
  err,
});

export const queryExperienceCount = () =>
dispatch => {
  const query = {
    limit: 1,
    start: 0,
    sort: 'created_at',
  };

  return getExperiences(query).then(data => {
    const count = data.total;
    dispatch(setExperienceCount(count, true, null));
  }).catch(err => {
    dispatch(setExperienceCount(0, false, err));
  });
};

export const queryTimeAndSalaryCount = () =>
dispatch =>
  fetchTimeAndSalary().then(data => {
    const count = data.total;
    dispatch(setTimeAndSalaryCount(count, true, null));
  }).catch(err => {
    dispatch(setTimeAndSalaryCount(0, false, err));
  });

export const queryLaborRightsCount = () =>
dispatch =>
  fetchLaborRightsMetaList().then(data => {
    const count = data.length;
    dispatch(setLaborRightsCount(count, true, null));
  }).catch(err => {
    dispatch(setLaborRightsCount(0, false, err));
  });
