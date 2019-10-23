import STATUS, { isFetching, isFetched } from '../constants/status';
import { companyStatus as companyStatusSelector } from '../selectors/companyAndJobTitle';

export const SET_STATUS = '@@company/SET_STATUS';

const setStatus = (companyName, status, data = null, error = null) => ({
  type: SET_STATUS,
  companyName,
  status,
  data,
  error,
});

export const fetchCompany = companyName => (dispatch, getState, { api }) => {
  const status = companyStatusSelector(companyName)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(companyName, STATUS.FETCHING));

  return api.company
    .getCompany(companyName)
    .then(data => {
      data = {
        ...data,
        salary_work_time_statistics: {
          ...data.salary_work_time_statistics,
          overtime_frequency_count: [
            {
              overtime_frequency: 0,
              count: 5,
            },
            {
              overtime_frequency: 1,
              count: 10,
            },
            {
              overtime_frequency: 2,
              count: 20,
            },
            {
              overtime_frequency: 3,
              count: 30,
            },
          ],
        },
        job_title_average_salaries: [
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
      };
      dispatch(setStatus(companyName, STATUS.FETCHED, data));
    })
    .catch(error => {
      dispatch(setStatus(companyName, STATUS.ERROR, null, error));
      throw error;
    });
};

export default {
  fetchCompany,
};
