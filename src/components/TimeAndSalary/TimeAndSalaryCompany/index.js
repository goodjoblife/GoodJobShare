import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import R from 'ramda';
import qs from 'qs';
import { compose, setStatic } from 'recompose';

import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import WorkingHourBlock from './WorkingHourBlock';
import { queryCompany } from '../../../actions/timeAndSalaryCompany';
import { isFetching, isFetched } from '../../../constants/status';
import renderHelmet from './helmet';

import {
  querySelector,
  pathnameSelector,
  paramsSelector,
} from 'common/routing/selectors';
import { pageSelector } from '../common/selectors';
import { validatePage } from '../common/validators';

import styles from '../views/view.module.css';
import Pagination from '../../common/Pagination/Pagination';

const companyNameSelector = R.compose(
  params => params.companyName,
  paramsSelector,
);

class TimeAndSalaryCompany extends Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    status: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }),
    queryCompany: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchPermission: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.queryCompany({
      companyName: companyNameSelector(this.props),
    });
    this.props.fetchPermission();
  }

  componentDidUpdate(prevProps) {
    if (companyNameSelector(prevProps) !== companyNameSelector(this.props)) {
      this.props.queryCompany({
        companyName: companyNameSelector(this.props),
      });
      this.props.fetchPermission();
    }
  }

  render() {
    const { data, status, canViewTimeAndSalary } = this.props;
    const pathname = pathnameSelector(this.props);
    const page = validatePage(pageSelector(this.props));
    const pageSize = 10;

    const companyName = companyNameSelector(this.props);
    const title = `${companyName} 薪水、加班情況`;

    const queryParams = querySelector(this.props);

    return (
      <section className={styles.searchResult}>
        {renderHelmet({ title, pathname, companyName })}
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) &&
          ((data && (
            <React.Fragment>
              <WorkingHourBlock
                data={data
                  // pagination over time_and_salary
                  .update('time_and_salary', list =>
                    list.slice((page - 1) * pageSize, page * pageSize),
                  )
                  .toJS()}
                hideContent={!canViewTimeAndSalary}
              />
              <Pagination
                totalCount={data.get('time_and_salary').size}
                unit={pageSize}
                currentPage={page}
                createPageLinkTo={toPage =>
                  qs.stringify(
                    { ...queryParams, p: toPage },
                    { addQueryPrefix: true },
                  )
                }
              />
              <FanPageBlock className={styles.fanPageBlock} />
            </React.Fragment>
          )) || (
            <P size="l" bold className={styles.searchNoResult}>
              尚未有公司「
              {companyName}
              」的薪時資訊
            </P>
          ))}
      </section>
    );
  }
}

const ssr = setStatic('fetchData', ({ store: { dispatch }, ...props }) => {
  const companyName = companyNameSelector(props);

  return dispatch(queryCompany({ companyName }));
});

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(TimeAndSalaryCompany);
