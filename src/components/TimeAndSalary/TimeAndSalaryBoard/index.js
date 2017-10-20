import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import Loading from 'common/Loader';
import ImmutablePropTypes from 'react-immutable-proptypes';
import $ from 'jquery';

import Select from 'common/form/Select';
import Table from 'common/table/Table';
import { InfoButton } from 'common/Modal';
import InfoTimeModal from '../common/InfoTimeModal';
import InfoSalaryModal from '../common/InfoSalaryModal';
import styles from './TimeAndSalaryBoard.module.css';
import commonStyles from '../views/view.module.css';
import fetchingStatus from '../../../constants/status';
import InjectedCallToAction from './InjectedCallToAction';

const pathnameMapping = {
  'work-time-dashboard': {
    title: '工時排行榜',
    label: '一週平均總工時（高到低）',
    sortBy: 'week_work_time',
    order: 'descending',
  },
  'sort/work-time-asc': {
    title: '工時排行榜（由低到高）',
    label: '一週平均總工時（低到高）',
    sortBy: 'week_work_time',
    order: 'ascending',
  },
  'salary-dashboard': {
    title: '估算時薪排行榜',
    label: '估算時薪（高到低）',
    sortBy: 'estimated_hourly_wage',
    order: 'descending',
  },
  'sort/salary-asc': {
    title: '估算時薪排行榜（由低到高）',
    label: '估算時薪（低到高）',
    sortBy: 'estimated_hourly_wage',
    order: 'ascending',
  },
  latest: {
    title: '最新薪時資訊',
    label: '資料時間（新到舊）',
    sortBy: 'created_at',
    order: 'descending',
  },
  'sort/time-asc': {
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

const getName = val => (
  <div>
    {val.name}
  </div>
);
const getTitle = (val, row) => (
  <div>
    {val}
    {' '}
    <span className={`pM ${commonStyles.sector}`}>
      {row.sector}
    </span>
  </div>
);
const getWorkingTime = val => (
  <div
    className={commonStyles.bar}
    style={{ width: `${val >= 100 ? 100 : val}%` }}
  >
    {val}
  </div>
);
const getFrequency = val => {
  let text;
  let style;
  switch (val) {
    case 0:
      text = '幾乎不';
      style = commonStyles.hardly;
      break;
    case 1:
      text = '偶爾';
      style = commonStyles.sometimes;
      break;
    case 2:
      text = '經常';
      style = commonStyles.usually;
      break;
    case 3:
      text = '幾乎每天';
      style = commonStyles.always;
      break;
    default:
      text = '幾乎不';
      style = commonStyles.hardly;
  }
  return (
    <div>
      <div className={`${commonStyles.dot} ${style}`} />
      {text}
    </div>
  );
};
const getSalary = val => {
  if (!val) {
    return '-';
  }
  const amount = val.amount.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let type;
  switch (val.type) {
    case 'year':
      type = '年';
      break;
    case 'month':
      type = '月';
      break;
    case 'hour':
      type = '小時';
      break;
    default:
      type = '月';
  }
  return [amount, type].join(' / ');
};
const getWage = val => {
  if (typeof val === 'number') {
    if (!val) return '-';
    return `${Math.round(val)} 元`;
  }
  return '';
};
const getDate = val => {
  const month = (val.month >= 10 ? '' : '0') + val.month;
  return [val.year, month].join('.');
};

export default class TimeAndSalaryBoard extends Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    status: PropTypes.string,
    route: PropTypes.object.isRequired,
    queryTimeAndSalary: PropTypes.func,
    switchPath: PropTypes.func,
  }

  static injectCallToActions(rows) {
    const interval = 10;

    const nRows = rows.length;
    const nChunks = Math.ceil(nRows / interval);
    const interstitialPos =
      R.range(1, nChunks).map(R.multiply(interval));

    interstitialPos.reverse();

    interstitialPos.forEach(i => {
      rows.splice(i, 0, <InjectedCallToAction key={`injected-${i}`} />);
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
  }

  componentDidMount() {
    const { path } = this.props.route;
    const { sortBy, order } = pathnameMapping[path];

    this.props.queryTimeAndSalary({ sortBy, order });

    $(window).on('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route.path !== nextProps.route.path) {
      const { path } = nextProps.route;
      const { sortBy, order } = pathnameMapping[path];
      this.props.queryTimeAndSalary({ sortBy, order });
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
    const view = $(window).scrollTop() + window.innerHeight;
    const threshold = $(document).height() - 100;
    if (view < threshold) return;

    const { path } = this.props.route;
    const { sortBy, order } = pathnameMapping[path];
    this.props.queryTimeAndSalary({ sortBy, order });
  }

  render() {
    const { path } = this.props.route;
    const { title } = pathnameMapping[path];
    const raw = this.props.data.toJS();
    const { status, switchPath } = this.props;

    return (
      <section className={commonStyles.searchResult}>
        <h2 className={commonStyles.heading}>{title}</h2>
        <div className={commonStyles.result}>
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
          <Table
            className={styles.latestTable}
            data={raw}
            primaryKey="_id"
            postProcRows={TimeAndSalaryBoard.injectCallToActions}
          >
            <Table.Column
              className={styles.colCompany}
              title="公司名稱"
              dataField="company"
              dataFormatter={getName}
            >
              公司名稱
            </Table.Column>
            <Table.Column
              className={styles.colCompany}
              title="職稱"
              dataField="job_title"
              dataFormatter={getTitle}
            >
              職稱
              <span className="table-sector">廠區/門市/分公司</span>
            </Table.Column>
            <Table.Column
              className={styles.colWeekTime}
              title="一週總工時"
              dataField="week_work_time"
              dataFormatter={getWorkingTime}
            >
              一週總工時
            </Table.Column>
            <Table.Column
              className={styles.colFrequency}
              title="加班頻率"
              dataField="overtime_frequency"
              dataFormatter={getFrequency}
            >
              加班頻率
            </Table.Column>
            <Table.Column
              className={styles.colSalary}
              title="薪資"
              dataField="salary"
              dataFormatter={getSalary}
              alignRight
            >
              薪資
            </Table.Column>
            <Table.Column
              className={styles.colHourly}
              title="估計時薪"
              dataField="estimated_hourly_wage"
              dataFormatter={getWage}
              alignRight
            >
              <InfoButton onClick={this.toggleInfoSalaryModal}>
                估計時薪
              </InfoButton>
            </Table.Column>
            <Table.Column
              className={styles.colDataTime}
              title="參考時間"
              dataField="data_time"
              dataFormatter={getDate}
            >
              <InfoButton onClick={this.toggleInfoTimeModal}>
                參考時間
              </InfoButton>
            </Table.Column>
          </Table>
          <div className={styles.status}>
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
