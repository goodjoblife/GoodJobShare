import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Loading from 'common/Loader';
import ImmutablePropTypes from 'react-immutable-proptypes';
import $ from 'jquery';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Star } from 'common/icons';
import Select from 'common/form/Select';
import InfoTimeModal from '../../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../../TimeAndSalary/common/InfoSalaryModal';
import timeAndSalaryBoardStyles from '../../TimeAndSalary/TimeAndSalaryBoard/TimeAndSalaryBoard.module.css';
import timeAndSalaryBannerStyles from '../../TimeAndSalary/Banner.module.css';
import timeAndSalaryCommonStyles from '../../TimeAndSalary/views/view.module.css';
import fetchingStatus from '../../../constants/status';
import { MAX_ROWS_IF_HIDDEN } from '../../../constants/hideContent';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';
import styles from '../CampaignTimeAndSalary.module.css';

import { queryCampaignTimeAndSalary } from '../../../actions/campaignTimeAndSalaryBoard';
import GradientMask from '../../common/GradientMask';

import DashBoardTable from '../../TimeAndSalary/common/DashBoardTable';

const pathnameMapping = {
  '/time-and-salary/campaigns/:campaign_name/work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    sortBy: 'week_work_time',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    sortBy: 'week_work_time',
    order: 'ascending',
  },
  '/time-and-salary/campaigns/:campaign_name/salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    sortBy: 'estimated_hourly_wage',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    sortBy: 'estimated_hourly_wage',
    order: 'ascending',
  },
  '/time-and-salary/campaigns/:campaign_name/latest': {
    title: '最新薪時資訊',
    label: '資料時間（新到舊）',
    sortBy: 'created_at',
    order: 'descending',
  },
  '/time-and-salary/campaigns/:campaign_name/sort/time-asc': {
    title: '最舊薪時資訊',
    label: '資料時間（舊到新）',
    sortBy: 'created_at',
    order: 'ascending',
  },
};

const selectOptions = R.pipe(
  R.toPairs,
  R.map(([path, opt]) => ({ value: path, label: opt.label }))
);

const injectPermissionBlock = rows => {
  const newRows = rows.slice(0, MAX_ROWS_IF_HIDDEN);
  newRows.push(
    <tr>
      <td colSpan="8" className={timeAndSalaryBoardStyles.noPadding}>
        <GradientMask />
      </td>
    </tr>
  );
  newRows.push(
    <tr>
      <td colSpan="8" className={timeAndSalaryBoardStyles.noBefore}>
        <BasicPermissionBlock rootClassName={timeAndSalaryBoardStyles.permissionBlockBoard} />
      </td>
    </tr>
  );
  return newRows;
};

export default class CampaignTimeAndSalaryBoard extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    status: PropTypes.string,
    match: PropTypes.object.isRequired,
    queryCampaignTimeAndSalary: PropTypes.func,
    switchPath: PropTypes.func,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchMyPermission: PropTypes.func.isRequired,
  }

  static fetchData({ match, store: { dispatch } }) {
    const { path, params: { campaign_name: campaignName } } = match;
    const { sortBy, order } = pathnameMapping[path];

    return dispatch(queryCampaignTimeAndSalary({ campaignName, sortBy, order }));
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
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
  }

  componentDidMount() {
    const { path, params: { campaign_name: campaignName } } = this.props.match;
    const { sortBy, order } = pathnameMapping[path];

    this.props.queryCampaignTimeAndSalary({ campaignName, sortBy, order });
    this.props.fetchMyPermission();

    $(window).on('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.path !== nextProps.match.path) {
      const { path, params: { campaign_name: campaignName } } = nextProps.match;
      const { sortBy, order } = pathnameMapping[path];
      this.props.queryCampaignTimeAndSalary({ campaignName, sortBy, order });
      this.props.fetchMyPermission();
    }
  }

  componentWillUnmount() {
    $(window).off('scroll', this.handleScroll);
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

  handleScroll() {
    if (!this.props.canViewTimeAndSalary) { return; }
    const view = $(window).scrollTop() + window.innerHeight;
    const threshold = $(document).height() - 100;
    if (view < threshold) return;

    const { path, params: { campaign_name: campaignName } } = this.props.match;
    const { sortBy, order } = pathnameMapping[path];
    this.props.queryCampaignTimeAndSalary({ campaignName, sortBy, order });
  }

  createPostProcessRows = () => {
    if (!this.props.canViewTimeAndSalary) {
      return injectPermissionBlock;
    }
    return R.identity;
  }

  render() {
    const { path, params: { campaign_name } } = this.props.match;
    const { title } = pathnameMapping[path];
    const { status, data, switchPath } = this.props;
    const raw = data.toJS();

    return (
      <section className={timeAndSalaryCommonStyles.searchResult}>
        <h2 className={styles.heading}>{title}</h2>
        <Link className={cn(timeAndSalaryBannerStyles.btnS, timeAndSalaryBannerStyles.btnYellowLine)} to="/time-and-salary/latest">
          <Star /> 全站薪資工時
        </Link>
        <div className={timeAndSalaryCommonStyles.result}>
          <div className={timeAndSalaryBoardStyles.sortRow}>
            <div className={timeAndSalaryBoardStyles.extremeDescription} />
            <div className={timeAndSalaryCommonStyles.sort}>
              <div className={timeAndSalaryCommonStyles.label}> 排序：</div>
              <div className={timeAndSalaryCommonStyles.select}>
                <Select
                  options={selectOptions(pathnameMapping)}
                  onChange={e => switchPath(e.target.value.replace(':campaign_name', campaign_name))}
                  value={path}
                  hasNullOption={false}
                />
              </div>
            </div>
          </div>
          <DashBoardTable
            data={raw}
            postProcessRows={this.createPostProcessRows()}
            toggleInfoSalaryModal={this.toggleInfoSalaryModal}
            toggleInfoTimeModal={this.toggleInfoTimeModal}
          />
          <div className={timeAndSalaryBoardStyles.status}>
            { status === fetchingStatus.FETCHING && (<Loading size="s" />) }
          </div>
          <InfoSalaryModal
            isOpen={this.state.infoSalaryModal.isOpen}
            close={this.toggleInfoSalaryModal}
          />
          <InfoTimeModal
            isOpen={this.state.infoTimeModal.isOpen}
            close={this.toggleInfoTimeModal}
          />
        </div>
      </section>
    );
  }
}
