import fetchUtil from 'utils/fetchUtil';
import R from 'ramda';

import graphqlClient from 'utils/graphqlClient';
import { createExperienceReport as createExperienceReportGql } from 'graphql/reports';

export const postExperiencesReports = ({ reason, reasonCategory, token }) => {
  return graphqlClient({
    query: createExperienceReportGql,
    token,
    variables: {
      input: {
        reason,
        reasonCategory,
      },
    },
  });
};

export const getReports = ({ id }) =>
  fetchUtil(`/experiences/${id}/reports`)
    .get()
    .then(R.prop('reports'));
