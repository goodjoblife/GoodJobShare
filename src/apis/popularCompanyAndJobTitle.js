import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getPopularCompanyAverageSalaryQuery,
  getPopularJobTitleSalaryDistributionQuery,
} from 'graphql/popularCompanyAndJobTitle';

const getPopularCompanyAverageSalary = () =>
  graphqlClient({
    query: getPopularCompanyAverageSalaryQuery,
  }).then(R.prop('popular_companies'));

const getPopularJobTitleSalaryDistribution = () =>
  graphqlClient({
    query: getPopularJobTitleSalaryDistributionQuery,
  }).then(R.prop('popular_job_titles'));

export default {
  getPopularCompanyAverageSalary,
  getPopularJobTitleSalaryDistribution,
};
