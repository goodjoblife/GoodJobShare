import graphqlClient from 'utils/graphqlClient';
import {
  createExperienceReportGql,
  createSalaryWorkTimeReportGql,
  getExperienceReportsGql,
  getSalaryWorkTimeReportsGql,
} from 'graphql/reports';

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
