import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch } from 'react-router';

import Wrapper from 'common/base/Wrapper';
import RouteWithSubRoutes from '../route';
import timeAndSalaryStyles from '../TimeAndSalary/styles.module.css';
import CallToShareData from '../TimeAndSalary/CallToShareData';
import Banner from './Banner';
import MobileInfoButtons from '../TimeAndSalary/MobileInfoButtons';
import InfoTimeModal from '../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../TimeAndSalary/common/InfoSalaryModal';
import styles from './CampaignTimeAndSalary.module.css';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';

const pathnameMapping = {
  'work-time-dashboard': '工時排行榜（由高到低）',
  'sort/work-time-asc': '工時排行榜（由低到高）',
  'salary-dashboard': '估算時薪排行榜（由高到低）',
  'sort/salary-asc': '估算時薪排行榜（由低到高）',
  latest: '最新薪資、工時資訊',
  'sort/time-asc': '最舊薪資、工時資訊',
};

export default class TimeAndSalary extends Component {
  static propTypes = {
    routes: PropTypes.array,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
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
    campaigns: [
      { name: 'npo_worker', title: 'NPO工作者' },
      { name: 'software_engineer', title: '軟體工程師' },
    ],
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
    const description = '馬上查看薪資、工時資訊以及加班狀況，協助您找到更好的工作！';

    // 根據 route 去更新 title  e.g. 工時排行榜（由高到低）
    let name = '';
    Object.keys(pathnameMapping).forEach(key => {
      if (path.indexOf(key) >= 0) {
        name = pathnameMapping[key];
      }
    });
    if (name) { title = name; }

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
    const { routes } = this.props;
    const { campaigns } = this.state;
    return (
      <div className={timeAndSalaryStyles.container}>
        {this.renderHelmet()}
        <Banner campaigns={campaigns} />
        <Wrapper size="m" className={timeAndSalaryStyles.showSearchbarWrapper}>
          <CallToShareData />
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
        <Wrapper size="l" className={styles.wrapper}>
          <Switch>
            { routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />)) }
          </Switch>
        </Wrapper>
      </div>
    );
  }
}
