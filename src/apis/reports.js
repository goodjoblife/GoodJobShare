import fetchUtil from 'utils/fetchUtil';
import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  createExperienceReportGql,
  createSalaryWorkTimeReportGql,
  getExperienceReportsGql,
  getSalaryWorkTimeReportsGql,
} from 'graphql/reports';

export const getReports = ({ id }) =>
  fetchUtil(`/experiences/${id}/reports`)
    .get()
    .then(R.prop('reports'));

export const createExperienceReportApi = async ({
  id,
  reasonCategory,
  reason,
  token,
}) =>
  graphqlClient({
    query: createExperienceReportGql,
    variables: {
      input: {
        experienceId: id,
        reasonCategory: reasonCategory,
        reason,
      },
    },
    token,
  });

export const createSalaryWorkTimeReportApi = async ({
  id,
  reasonCategory,
  reason,
  token,
}) =>
  graphqlClient({
    query: createSalaryWorkTimeReportGql,
    variables: {
      input: {
        salaryWorkTimeId: id,
        reasonCategory: reasonCategory,
        reason,
      },
    },
    token,
  });

// TODO: 以下兩個 API 等下一個 PR 再使用並修正
export const getExperienceReportsApi = async ({ id, token }) => {
  const data = await graphqlClient({
    query: getExperienceReportsGql,
    variables: {
      id,
    },
    token,
  });
  return data.experience.reports;
};

export const getSalaryWorkTimeReportsApi = async ({
  token,
  companyName,
  salaryWorkTimesLimit = 10,
}) => {
  const data = await graphqlClient({
    query: getSalaryWorkTimeReportsGql,
    variables: {
      companyName,
      salaryWorkTimesLimit,
    },
    token,
  });
  return data.salaryWorkTimeReports;
};
