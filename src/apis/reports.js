import fetchUtil from 'utils/fetchUtil';
import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { createExperienceReportGql } from 'graphql/reports';

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
