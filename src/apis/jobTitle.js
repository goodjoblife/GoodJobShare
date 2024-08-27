import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleQuery,
  queryJobTitleOverviewGql,
  getJobTitleTimeAndSalaryQuery,
  getJobTitleWorkExperiencesQuery,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';

// TODO: DEPRECATED
export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const queryJobTitleOverview = ({
  jobTitle,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}) =>
  graphqlClient({
    query: queryJobTitleOverviewGql,
    variables: {
      jobTitle,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('job_title'));

export const getJobTitleTimeAndSalary = ({
  jobTitle,
  companyName,
  start,
  limit,
}) =>
  graphqlClient({
    query: getJobTitleTimeAndSalaryQuery,
    variables: { jobTitle, companyName, start, limit },
  }).then(R.prop('job_title'));

export const getJobTitleWorkExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
}) =>
  graphqlClient({
    query: getJobTitleWorkExperiencesQuery,
    variables: { jobTitle, companyName, start, limit },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
