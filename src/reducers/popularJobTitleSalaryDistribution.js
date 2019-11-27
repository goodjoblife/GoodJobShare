import createReducer from 'utils/createReducer';

import fetchingStatus from '../constants/status';

const preloadedState = {
  data: [
    {
      job_title: {
        name: '軟體工程師',
      },
      bins: [
        {
          data_num: 5,
          range: {
            from: 30000,
            to: 40000,
            type: 'month',
          },
        },
        {
          data_num: 10,
          range: {
            from: 40000,
            to: 50000,
            type: 'month',
          },
        },
        {
          data_num: 20,
          range: {
            from: 50000,
            to: 60000,
            type: 'month',
          },
        },
        {
          data_num: 10,
          range: {
            from: 60000,
            to: 70000,
            type: 'month',
          },
        },
      ],
    },
    {
      job_title: {
        name: '設計師',
      },
      bins: [
        {
          data_num: 10,
          range: {
            from: 30000,
            to: 40000,
            type: 'month',
          },
        },
        {
          data_num: 20,
          range: {
            from: 40000,
            to: 50000,
            type: 'month',
          },
        },
        {
          data_num: 5,
          range: {
            from: 50000,
            to: 60000,
            type: 'month',
          },
        },
      ],
    },
  ],
  status: fetchingStatus.FETCHED,
  error: null,
};

export default createReducer(preloadedState, {});
