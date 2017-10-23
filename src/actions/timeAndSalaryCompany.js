import { push } from 'react-router-redux';

import { fetchSearchCompany } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_COMPANY_DATA = '@@timeAndSalaryCompany/SET_COMPANY_DATA';
export const SET_COMPANY_STATUS = '@@timeAndSalaryCompany/SET_COMPANY_STATUS';

export const setCompanyData = (status, sortBy, order, company, data, error) => ({
  type: SET_COMPANY_DATA,
  sortBy,
  order,
  company,
  status,
  data,
  error,
});

export const queryCompany = ({ sortBy, order, company }) =>
  (dispatch, getState) => {
    if (sortBy !== getState().timeAndSalaryCompany.get('sortBy') || order !== getState().timeAndSalaryCompany.get('order') || company !== getState().timeAndSalaryCompany.get('company')) {
      dispatch(setCompanyData(fetchingStatus.UNFETCHED, sortBy, order, company, [], null));
    }

    if (getState().timeAndSalaryCompany.get('status') === fetchingStatus.FETCHING) {
      return Promise.resolve();
    }

    dispatch({
      type: SET_COMPANY_STATUS,
      status: fetchingStatus.FETCHING,
    });

    const opt = {
      company,
      group_sort_by: sortBy,
      group_sort_order: order,
    };

    return fetchSearchCompany(opt).then(data => {
      dispatch(setCompanyData(fetchingStatus.FETCHED, sortBy, order, company, data, null));
    }).catch(err => {
      dispatch(setCompanyData(fetchingStatus.ERROR, sortBy, order, company, [], err));
    });
  };

export const switchPath = path =>
  dispatch =>
    dispatch(push(`/time-and-salary/${path}`));
