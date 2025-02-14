import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleInterviewExperiencesQuery,
  queryJobTitleOverviewGql,
  getJobTitleTimeAndSalaryQuery,
  getJobTitleWorkExperiencesQuery,
  queryJobTitlesHavingDataGql,
  getJobTitleTimeAndSalaryStatisticsQuery,
  queryJobTitleOverviewStatisticsGql,
} from 'graphql/jobTitle';

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

export const queryJobTitleOverviewStatistics = ({ jobTitle }) =>
  graphqlClient({
    query: queryJobTitleOverviewStatisticsGql,
    variables: {
      jobTitle,
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

export const getJobTitleTimeAndSalaryStatistics = ({ jobTitle }) =>
  graphqlClient({
    query: getJobTitleTimeAndSalaryStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const getJobTitleInterviewExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
}) =>
  graphqlClient({
    query: getJobTitleInterviewExperiencesQuery,
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
