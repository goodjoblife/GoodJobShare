import R from 'ramda';

import {
  getPopularCompanyAverageSalaryQuery,
  getPopularJobTitleSalaryDistributionQuery,
} from 'graphql/popularCompanyAndJobTitle';
import graphqlClient from 'utils/graphqlClient';

export const getPopularCompanyAverageSalary = () =>
  graphqlClient({
    query: getPopularCompanyAverageSalaryQuery,
  }).then(R.prop('popular_companies'));

export const getPopularJobTitleSalaryDistribution = () =>
  graphqlClient({
    query: getPopularJobTitleSalaryDistributionQuery,
  }).then(R.prop('popular_job_titles'));
