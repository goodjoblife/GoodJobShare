import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import Wrapper from 'common/base/Wrapper';
import styles from './styles.module.css';
import SearchBar from './SearchBar';
import CallToShareData from './CallToShareData';
import Banner from './Banner';
import MobileInfoButtons from './MobileInfoButtons';
import InfoTimeModal from './common/InfoTimeModal';
import InfoSalaryModal from './common/InfoSalaryModal';

import { formatTitle, formatCanonicalPath } from '../../utils/helmetHelper';
import { imgHost, SITE_NAME } from '../../constants/helmetData';

const pathnameMapping = [
  ['work-time-dashboard', '工時排行榜（由高到低）'],
  ['sort/work-time-asc', '工時排行榜（由低到高）'],
  ['salary-dashboard', '估算時薪排行榜（由高到低）'],
  ['sort/salary-asc', '估算時薪排行榜（由低到高）'],
  ['latest', '最新薪資、工時資訊'],
  ['sort/time-asc', '最舊薪資、工時資訊'],
];

export default class TimeAndSalary extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    params: PropTypes.shape({
      keyword: PropTypes.string,
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
    let title = '';
    for (let i = 0; i < pathnameMapping.length; i += 1) {
      if (path.indexOf(pathnameMapping[i][0]) >= 0) {
        title = pathnameMapping[i][1];
        break;
      }
    }
    const keyword = this.props.params.keyword;
    if (keyword) {
      title = `${keyword}的${title}`;
    }
    const description = `馬上查看${keyword}的薪資、工時資訊以及加班狀況，協助您找到更好的工作！`;
    const url = formatCanonicalPath(path);
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
    const { children } = this.props;
    return (
      <div className={styles.container}>
        {this.renderHelmet()}
        <Banner />
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
          { children }
        </Wrapper>
      </div>
    );
  }
}
