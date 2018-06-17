import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Loading from 'common/Loader';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';

import Select from 'common/form/Select';
import Pagination from 'common/Pagination';
import InfoTimeModal from '../common/InfoTimeModal';
import InfoSalaryModal from '../common/InfoSalaryModal';
import AboutThisJobModal from '../common/AboutThisJobModal';
import styles from './TimeAndSalaryBoard.module.css';
import commonStyles from '../views/view.module.css';
import fetchingStatus from '../../../constants/status';
import { MAX_ROWS_IF_HIDDEN } from '../../../constants/hideContent';
import CallToActionRow from './CallToActionRow';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';

import { queryTimeAndSalary } from '../../../actions/timeAndSalaryBoard';
import GradientMask from '../../common/GradientMask';

import DashBoardTable from '../common/DashBoardTable';

import {
  toQsString,
  querySelector,
  locationSearchToQuery,
} from './helper';
import { DATA_NUM_PER_PAGE } from '../../../constants/timeAndSalarSearch';

const pathnameMapping = {
  '/time-and-salary/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    sortBy: 'week_work_time',
    order: 'descending',
    hasExtreme: true,
  },
  '/time-and-salary/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    sortBy: 'week_work_time',
    order: 'ascending',
    hasExtreme: true,
  },
  '/time-and-salary/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    sortBy: 'estimated_hourly_wage',
    order: 'descending',
    hasExtreme: true,
  },
  '/time-and-salary/sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    sortBy: 'estimated_hourly_wage',
    order: 'ascending',
    hasExtreme: true,
  },
  '/time-and-salary/latest': {
    title: '最新薪時資訊',
    label: '資料時間（新到舊）',
    sortBy: 'created_at',
    order: 'descending',
    hasExtreme: false,
  },
  '/time-and-salary/sort/time-asc': {
    title: '最舊薪時資訊',
    label: '資料時間（舊到新）',
    sortBy: 'created_at',
    order: 'ascending',
    hasExtreme: false,
  },
};

const selectOptions = R.pipe(
  R.toPairs,
  R.map(([path, opt]) => ({ value: path, label: opt.label }))
);

const injectCallToActions = rows => {
  const flapMapIndexed = R.addIndex(R.chain);
  const injectEvery = N => (row, i) => {
    if (i % N === N - 1) {
      const nthInjected = parseInt(i / N, 10);
      return [row, (
        <CallToActionRow
          key={`injected-${nthInjected}`}
          position={i}
        />
      )];
    }
    return row;
  };
  return flapMapIndexed(injectEvery(100))(rows);
};

const injectPermissionBlock = rows => {
  const newRows = rows.slice(0, MAX_ROWS_IF_HIDDEN);
  newRows.push(
    <tr>
      <td colSpan="8" className={styles.noPadding}>
        <GradientMask />
      </td>
    </tr>
  );
  newRows.push(
    <tr>
      <td colSpan="8" className={styles.noBefore}>
        <BasicPermissionBlock rootClassName={styles.permissionBlockBoard} />
      </td>
    </tr>
  );
  return newRows;
};

const injectLoadingIconRow = R.prepend(
  <tr key="extreme-loading" className={styles.extremeRow}>
    <td colSpan="8" className={styles.noBefore}>
      <Loading size="s" />
    </td>
  </tr>
);

const injectExtremeDividerAt = nthRow => onClick => R.insert(
  nthRow, (
    <tr key="extreme-divider" className={styles.extremeRow}>
      <td colSpan="8" className={styles.noBefore}>
        <div className={styles.extremeDescription}>
          <span>
            以上資料為前 1 % 的資料，可能包含極端值或為使用者誤填，較不具參考價值，預設為隱藏。
            <button className={styles.toggle} onClick={onClick}>
              隱藏 -
            </button>
          </span>
        </div>
      </td>
    </tr>
  )
);

export default class TimeAndSalaryBoard extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    totalCount: PropTypes.number,
    currentPage: PropTypes.number,
    location: PropTypes.object.isRequired,
    status: PropTypes.string,
    match: PropTypes.object.isRequired,
    queryTimeAndSalary: PropTypes.func,
    switchPath: PropTypes.func,
    queryExtremeTimeAndSalary: PropTypes.func.isRequired,
    resetBoardExtremeData: PropTypes.func.isRequired,
    extremeStatus: PropTypes.string,
    extremeData: ImmutablePropTypes.list,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchMyPermission: PropTypes.func.isRequired,
  }

  static fetchData({ match, location, store: { dispatch } }) {
    const { path } = match;
    const { search } = location;
    const { sortBy, order } = pathnameMapping[path];

    const query = locationSearchToQuery(search);
    const { page } = querySelector(query);

    return dispatch(queryTimeAndSalary({ sortBy, order, page }));
  }

  constructor(props) {
    super(props);
    this.toggleInfoSalaryModal = this.toggleInfoSalaryModal.bind(this);
    this.toggleInfoTimeModal = this.toggleInfoTimeModal.bind(this);
  }

  state = {
    infoSalaryModal: {
      isOpen: false,
    },
    infoTimeModal: {
      isOpen: false,
    },
    aboutThisJobModal: {
      isOpen: false,
      title: '',
      aboutThisJob: '',
    },
    showExtreme: false,
  }

  componentDidMount() {
    const { path } = this.props.match;
    const { search } = this.props.location;
    const { sortBy, order } = pathnameMapping[path];

    const query = locationSearchToQuery(search);
    const { page } = querySelector(query);

    this.props.resetBoardExtremeData();
    this.props.queryTimeAndSalary({ sortBy, order, page });
    this.props.fetchMyPermission();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.path !== nextProps.match.path || this.props.location.search !== nextProps.location.search) {
      const { path } = nextProps.match;
      const { search } = nextProps.location;
      const { sortBy, order } = pathnameMapping[path];
      const query = locationSearchToQuery(search);
      const { page } = querySelector(query);
      this.setState({ showExtreme: false });
      this.props.resetBoardExtremeData();
      this.props.queryTimeAndSalary({ sortBy, order, page });
      this.props.fetchMyPermission();
    }
  }

  toggleInfoSalaryModal() {
    const state = this.state;
    state.infoSalaryModal.isOpen = !state.infoSalaryModal.isOpen;
    this.setState(state);
  }
  toggleInfoTimeModal() {
    const state = this.state;
    state.infoTimeModal.isOpen = !state.infoTimeModal.isOpen;
    this.setState(state);
  }
  toggleAboutThisJobModal = (aboutThisJob, title) => {
    const state = this.state;
    state.aboutThisJobModal.isOpen = !state.aboutThisJobModal.isOpen;
    if (state.aboutThisJobModal.isOpen) {
      state.aboutThisJobModal.title = title;
      state.aboutThisJobModal.aboutThisJob = aboutThisJob;
    }
    this.setState(state);
  }

  toggleShowExtreme = () => {
    const { showExtreme } = this.state;
    this.setState({ showExtreme: !showExtreme });
    this.props.queryExtremeTimeAndSalary();
  }

  decorateExtremeRows = rows => {
    if (!this.state.showExtreme) {
      return rows;
    }
    if (this.props.extremeStatus !== fetchingStatus.FETCHED) {
      return injectLoadingIconRow(rows);
    }
    // here, the first {nExtremeRows} rows are extreme data
    // we would like to highlight them with the right style
    const nExtremeRows = this.props.extremeData.size;
    const mapIndexed = R.addIndex(R.map);
    const IfExtremeRow = then => (row, i) =>
      ((i < nExtremeRows) ? then(row) : row);
    const wearExtremeStyle = row =>
      cloneElement(row, {
        className: cn(row.props.className, styles.extremeRow),
      });
    return R.pipe(
      mapIndexed(IfExtremeRow(wearExtremeStyle)),
      // inject a divider here to tell extreme rows apart from other rows
      injectExtremeDividerAt(nExtremeRows)(this.toggleShowExtreme),
    )(rows);
  }

  createPostProcessRows = () => {
    if (!this.props.canViewTimeAndSalary) {
      return injectPermissionBlock;
    }
    return R.pipe(
      this.decorateExtremeRows,
      injectCallToActions,
    );
  }

  // 給 Pagination 建立分頁的連結用
  createPageLinkTo = nextPage => {
    const { pathname } = this.props.location;
    const queryString = toQsString({ page: nextPage });

    return {
      pathname,
      search: `?${queryString}`,
    };
  }

  render() {
    const { path } = this.props.match;
    const { title, hasExtreme } = pathnameMapping[path];
    const { data, status, totalCount, currentPage, switchPath, extremeStatus, extremeData, canViewTimeAndSalary } = this.props;
    const { showExtreme } = this.state;
    let raw;
    if (showExtreme && extremeStatus === fetchingStatus.FETCHED) {
      raw = extremeData.concat(data).toJS();
    } else {
      raw = data.toJS();
    }

    return (
      <section className={commonStyles.searchResult}>
        <h2 className={commonStyles.heading}>{title}</h2>
        <div className={commonStyles.result}>
          <div className={styles.sortRow}>
            <div className={styles.extremeDescription}>
              {(hasExtreme && canViewTimeAndSalary) && (
                <span>
                  前 1 % 的資料可能包含極端值或為使用者誤填，較不具參考價值，預設為隱藏。
                  <button className={styles.toggle} onClick={this.toggleShowExtreme}>
                    {showExtreme ? '隱藏 -' : '展開 +'}
                  </button>
                </span>
              )}
            </div>
            <div className={commonStyles.sort}>
              <div className={commonStyles.label}> 排序：</div>
              <div className={commonStyles.select}>
                <Select
                  options={selectOptions(pathnameMapping)}
                  onChange={e => switchPath(e.target.value)}
                  value={path}
                  hasNullOption={false}
                />
              </div>
            </div>
          </div>
          {
            status === fetchingStatus.FETCHING ?
              <div className={styles.status}>
                <Loading size="s" />
              </div> :
              <DashBoardTable
                data={raw}
                postProcessRows={this.createPostProcessRows()}
                toggleInfoSalaryModal={this.toggleInfoSalaryModal}
                toggleInfoTimeModal={this.toggleInfoTimeModal}
                toggleAboutThisJobModal={this.toggleAboutThisJobModal}
              />
          }
          <Pagination
            totalCount={totalCount}
            unit={DATA_NUM_PER_PAGE}
            currentPage={currentPage}
            createPageLinkTo={this.createPageLinkTo}
          />
          <InfoSalaryModal
            isOpen={this.state.infoSalaryModal.isOpen}
            close={this.toggleInfoSalaryModal}
          />
          <InfoTimeModal
            isOpen={this.state.infoTimeModal.isOpen}
            close={this.toggleInfoTimeModal}
          />
          <AboutThisJobModal
            isOpen={this.state.aboutThisJobModal.isOpen}
            close={this.toggleAboutThisJobModal}
            title={this.state.aboutThisJobModal.title}
            aboutThisJob={this.state.aboutThisJobModal.aboutThisJob}
          />
        </div>
      </section>
    );
  }
}
