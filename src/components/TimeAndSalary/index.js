import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import { Redirect, Switch } from 'react-router';

import Wrapper from 'common/base/Wrapper';
import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';
import SearchBar from './SearchBar';
import CallToShareData from './CallToShareData';
import Banner from '../CampaignTimeAndSalary/Banner';
import MobileInfoButtons from './MobileInfoButtons';
import InfoTimeModal from './common/InfoTimeModal';
import InfoSalaryModal from './common/InfoSalaryModal';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';
import { queryCampaignInfoList } from '../../actions/campaignTimeAndSalaryBoard';

const pathnameMapping = {
  'work-time-dashboard': '工時排行榜（由高到低）',
  'sort/work-time-asc': '工時排行榜（由低到高）',
  'salary-dashboard': '估算時薪排行榜（由高到低）',
  'sort/salary-asc': '估算時薪排行榜（由低到高）',
  latest: '最新薪資、工時資訊',
  'sort/time-asc': '最舊薪資、工時資訊',
};

const campaignListFromEntries = campaignEntries =>
  campaignEntries.valueSeq().map(info => ({
    name: info.get('name'),
    title: info.get('title'),
  })).toJS();

export default class TimeAndSalary extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(queryCampaignInfoList());
  }

  static propTypes = {
    campaignEntries: ImmutablePropTypes.map.isRequired,
    queryCampaignInfoListIfNeeded: PropTypes.func.isRequired,
    routes: PropTypes.array,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        keyword: PropTypes.string,
      }),
    }),
    staticContext: PropTypes.object,
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
  }

  componentDidMount() {
    this.props.queryCampaignInfoListIfNeeded();
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

  renderHelmet = () => {
    const path = this.props.location.pathname;
    const url = formatCanonicalPath(path);

    // default title and description
    let title = '查看薪資、工時資訊';
    let description = '馬上查看薪資、工時資訊以及加班狀況，協助您找到更好的工作！';

    // 根據 route 去更新 title  e.g. 工時排行榜（由高到低）
    let name = '';
    Object.keys(pathnameMapping).forEach(key => {
      if (path.indexOf(key) >= 0) {
        name = pathnameMapping[key];
      }
    });
    if (name) { title = name; }

    // 假如 keyword 不是 null, undefined 或 ''。則把 keywords 更新到 title & description
    const keyword = this.props.match.params.keyword;
    if (keyword) {
      if (name) {
        title = `${keyword}的${name}`;
      } else {
        title = `${keyword}的薪資、工時資訊`;
      }
      description = `馬上查看${keyword}的薪資、工時資訊以及加班狀況，協助您找到更好的工作！`;
    }

    return (
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:title', content: formatTitle(title, SITE_NAME) },
          { property: 'og:description', content: description },
          { property: 'og:url', content: url },
          { property: 'og:image', content: `${imgHost}/og/time-and-salary.jpg` },
        ]}
        link={[
          { rel: 'canonical', href: url },
        ]}
      />
    );
  }

  render() {
    const { routes, location, staticContext } = this.props;
    if (!staticContext) {
      if (location.pathname === '/time-and-salary') {
        if (location.hash) {
          const targets = location.hash.split('#');
          if (targets.length >= 2) {
            return (
              <Redirect to={`/time-and-salary${targets[1]}`} />
            );
          }
        }
        return (<Redirect to="/time-and-salary/latest" />);
      }
    }

    const campaigns = campaignListFromEntries(this.props.campaignEntries);

    return (
      <div className={styles.container}>
        {this.renderHelmet()}
        <Banner campaigns={campaigns} />
        <Wrapper size="m" className={styles.showSearchbarWrapper}>
          <CallToShareData />
          <SearchBar />
          <MobileInfoButtons
            toggleInfoSalaryModal={this.toggleInfoSalaryModal}
            toggleInfoTimeModal={this.toggleInfoTimeModal}
          />
        </Wrapper>
        <InfoSalaryModal
          isOpen={this.state.infoSalaryModal.isOpen}
          close={this.toggleInfoSalaryModal}
        />
        <InfoTimeModal
          isOpen={this.state.infoTimeModal.isOpen}
          close={this.toggleInfoTimeModal}
        />
        <Wrapper size="l">
          <Switch>
            { routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />)) }
          </Switch>
        </Wrapper>
      </div>
    );
  }
}
