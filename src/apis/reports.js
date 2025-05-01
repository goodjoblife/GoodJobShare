import graphqlClient from 'utils/graphqlClient';
import {
  createExperienceReportGql,
  createSalaryWorkTimeReportGql,
} from 'graphql/reports';

export const createExperienceReportApi = ({
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

export const createSalaryWorkTimeReportApi = ({
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
