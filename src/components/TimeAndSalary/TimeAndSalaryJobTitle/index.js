import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose, setStatic } from 'recompose';
import R from 'ramda';
import qs from 'qs';

import Loading from 'common/Loader';
import { P } from 'common/base';
import FanPageBlock from 'common/FanPageBlock';
import { withPermission } from 'common/permission-context';
import WorkingHourBlock from '../common/WorkingHourBlock';
import { queryJobTitle } from '../../../actions/timeAndSalaryJobTitle';
import { isFetching, isFetched } from '../../../constants/status';
import renderHelmet from './helmet';

import {
  querySelector,
  pageSelector,
  pathnameSelector,
  searchCriteriaSelector,
  paramsSelector,
} from 'common/routing/selectors';

import styles from '../views/view.module.css';
import { searchOptions } from '../SearchBar';
import Pagination from '../../common/Pagination/Pagination';

// TODO: remove these after API is ready
const groupSortBy = 'week_work_time';
const order = 'descending';

const castValidSearchCriteria = R.when(
  searchBy => !searchOptions.some(R.propEq('value', searchBy)),
  R.always(R.head(searchOptions).value),
);

const jobTitleSelector = R.compose(
  params => params.jobTitle,
  paramsSelector,
);

const castValidPage = R.compose(
  R.when(Number.isNaN, R.always(1)),
  page => parseInt(page, 10),
);

class TimeAndSalaryJobTitle extends Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    status: PropTypes.string,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }),
    queryJobTitle: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchPermission: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.queryJobTitle({
      jobTitle: jobTitleSelector(this.props),
    });
    this.props.fetchPermission();
    this.props.setPage(
      castValidPage(pageSelector(this.props)),
      this.props.pageSize,
    );
  }

  componentDidUpdate(prevProps) {
    if (jobTitleSelector(prevProps) !== jobTitleSelector(this.props)) {
      this.props.queryJobTitle({
        jobTitle: jobTitleSelector(this.props),
      });
      this.props.fetchPermission();
    }
    if (pageSelector(prevProps) !== pageSelector(this.props)) {
      this.props.setPage(
        castValidPage(pageSelector(this.props)),
        this.props.pageSize,
      );
    }
  }

  render() {
    const { data, status, page, pageSize, canViewTimeAndSalary } = this.props;
    const pathname = pathnameSelector(this.props);

    const jobTitle = jobTitleSelector(this.props);
    const title = `${jobTitle} 薪水、加班情況`;

    const queryParams = querySelector(this.props);

    return (
      <section className={styles.searchResult}>
        {renderHelmet({ title, pathname, jobTitle })}
        <h2 className={styles.heading}>{title}</h2>
        {isFetching(status) && <Loading size="s" />}
        {isFetched(status) &&
          ((data && (
            <React.Fragment>
              <WorkingHourBlock
                data={data
                  .update('time_and_salary', list =>
                    list.slice((page - 1) * pageSize, page * pageSize),
                  )
                  .toJS()}
                groupSortBy={groupSortBy}
                isExpanded
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
              尚未有「
              {jobTitle}
              」的薪時資訊
            </P>
          ))}
      </section>
    );
  }
}

const ssr = setStatic(
  'fetchData',
  ({ store: { state, dispatch }, ...props }) => {
    const searchBy = castValidSearchCriteria(searchCriteriaSelector(props));
    const jobTitle = jobTitleSelector(props);
    const page = castValidPage(pageSelector(props));

    return dispatch(
      queryJobTitle({
        groupSortBy,
        order,
        searchBy,
        jobTitle,
        page,
        pageSize: state.timeAndSalaryJobTitle.get('pageSize'),
      }),
    );
  },
);

const hoc = compose(
  ssr,
  withPermission,
);

export default hoc(TimeAndSalaryJobTitle);
