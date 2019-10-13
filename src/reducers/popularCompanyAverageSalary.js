import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  data: [
    {
      company: {
        name: '聯發科',
      },
      average_salaries: [
        {
          job_title: {
            name: '軟體工程師',
          },
          average_salary: {
            amount: 76000,
            type: 'month',
          },
        },
        {
          job_title: {
            name: '數位IC設計工程師',
          },
          average_salary: {
            amount: 100000,
            type: 'month',
          },
        },
        {
          job_title: {
            name: '硬體工程師',
          },
          average_salary: {
            amount: 80000,
            type: 'month',
          },
        },
      ],
    },
    {
      company: {
        name: '大立光',
      },
      average_salaries: [
        {
          job_title: {
            name: '製程工程師',
          },
          average_salary: {
            amount: 76000,
            type: 'month',
          },
        },
        {
          job_title: {
            name: '數位IC設計工程師',
          },
          average_salary: {
            amount: 100000,
            type: 'month',
          },
        },
        {
          job_title: {
            name: '硬體工程師',
          },
          average_salary: {
            amount: 80000,
            type: 'month',
          },
        },
      ],
    },
  ],
  status: fetchingStatus.FETCHED,
  error: null,
});

export default createReducer(preloadedState, {});
