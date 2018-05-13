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
import CommonNotFound from 'common/NotFound';
import InfoTimeModal from '../../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../../TimeAndSalary/common/InfoSalaryModal';
import AboutThisJobModal from '../../TimeAndSalary/common/AboutThisJobModal';
import timeAndSalaryBoardStyles from '../../TimeAndSalary/TimeAndSalaryBoard/TimeAndSalaryBoard.module.css';
import timeAndSalaryBannerStyles from '../../TimeAndSalary/Banner.module.css';
import timeAndSalaryCommonStyles from '../../TimeAndSalary/views/view.module.css';
import fetchingStatus, { isFetched } from '../../../constants/status';
import { MAX_ROWS_IF_HIDDEN } from '../../../constants/hideContent';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';
import styles from '../CampaignTimeAndSalary.module.css';

import { queryCampaignInfoList } from '../../../actions/campaignInfo';
import { queryCampaignTimeAndSalary } from '../../../actions/campaignTimeAndSalaryBoard';
import GradientMask from '../../common/GradientMask';

import DashBoardTable from '../../TimeAndSalary/common/DashBoardTable';
import { campaignNameSelector, campaignEntriesSelector } from '../../../selectors/campaignSelector';

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

const queryJobTitlesFromCampaignEntries = (campaignEntries, campaignName) => {
  const campaignInfo = campaignEntries.get(campaignName);
  return campaignInfo ? campaignInfo.toJS().queryJobTitles : [];
};

export default class CampaignTimeAndSalaryBoard extends Component {
  static propTypes = {
    campaignName: PropTypes.string.isRequired,
    campaignEntries: ImmutablePropTypes.map.isRequired,
    campaignEntriesStatus: PropTypes.string.isRequired,
    queryCampaignInfoListIfNeeded: PropTypes.func.isRequired,
    data: ImmutablePropTypes.list,
    totalCount: PropTypes.number,
    status: PropTypes.string,
    match: PropTypes.object.isRequired,
    queryCampaignTimeAndSalary: PropTypes.func,
    switchPath: PropTypes.func,
    canViewTimeAndSalary: PropTypes.bool.isRequired,
    fetchMyPermission: PropTypes.func.isRequired,
  }

  static fetchData({ match, store: { dispatch, getState } }) {
    const { path } = match;
    const { sortBy, order } = pathnameMapping[path];
    const campaignName = campaignNameSelector(match);

    return dispatch(queryCampaignInfoList()).then(() => {
      const campaignEntries = campaignEntriesSelector(getState());
      const jobTitles = queryJobTitlesFromCampaignEntries(campaignEntries, campaignName);
      return dispatch(queryCampaignTimeAndSalary(campaignName, { sortBy, order, jobTitles }));
    });
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
    aboutThisJobModal: {
      isOpen: false,
      title: '',
      aboutThisJob: '',
    },
  }

  componentDidMount() {
    const { campaignName, campaignEntries, match: { path } } = this.props;
    const jobTitles = queryJobTitlesFromCampaignEntries(campaignEntries, campaignName);
    const { sortBy, order } = pathnameMapping[path];
    this.props.queryCampaignInfoListIfNeeded().then(() => {
      this.props.queryCampaignTimeAndSalary(campaignName, { sortBy, order, jobTitles });
    });
    this.props.fetchMyPermission();

    $(window).on('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { campaignName: prevCampaignName, match: { path: prevPath } } = prevProps;
    const { campaignName, campaignEntries, match: { path } } = this.props;

    if (prevPath !== path || prevCampaignName !== campaignName) {
      const jobTitles = queryJobTitlesFromCampaignEntries(campaignEntries, campaignName);
      const { sortBy, order } = pathnameMapping[path];
      this.props.queryCampaignInfoListIfNeeded().then(() => {
        this.props.queryCampaignTimeAndSalary(campaignName, { sortBy, order, jobTitles });
      });
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
  toggleAboutThisJobModal = (aboutThisJob, title) => {
    const state = this.state;
    state.aboutThisJobModal.isOpen = !state.aboutThisJobModal.isOpen;
    if (state.aboutThisJobModal.isOpen) {
      state.aboutThisJobModal.title = title;
      state.aboutThisJobModal.aboutThisJob = aboutThisJob;
    }
    this.setState(state);
  }

  handleScroll() {
    if (!this.props.canViewTimeAndSalary) { return; }
    if (this.props.data.size >= this.props.totalCount) { return; }
    const view = $(window).scrollTop() + window.innerHeight;
    const threshold = $(document).height() - 100;
    if (view < threshold) return;

    const { campaignName, match: { path } } = this.props;
    const { sortBy, order } = pathnameMapping[path];
    this.props.queryCampaignTimeAndSalary(campaignName, { sortBy, order });
  }

  createPostProcessRows = () => {
    if (!this.props.canViewTimeAndSalary) {
      return injectPermissionBlock;
    }
    return R.identity;
  }

  render() {
    const { campaignName, campaignEntries, campaignEntriesStatus, match: { path } } = this.props;
    const { title } = pathnameMapping[path];
    const { status, data, switchPath } = this.props;
    const raw = data.toJS();

    // 如果 campaignName 不在清單中，代表 Not Found
    if (isFetched(campaignEntriesStatus) && !campaignEntries.has(campaignName)) {
      return <CommonNotFound />;
    }

    const isLoading = campaignEntriesStatus === fetchingStatus.FETCHIING || status === fetchingStatus.FETCHING;

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
                  onChange={e => switchPath(e.target.value.replace(':campaign_name', campaignName))}
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
            toggleAboutThisJobModal={this.toggleAboutThisJobModal}
          />
          <div className={timeAndSalaryBoardStyles.status}>
            { isLoading && (<Loading size="s" />) }
          </div>
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
