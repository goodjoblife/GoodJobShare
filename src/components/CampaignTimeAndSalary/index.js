import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch } from 'react-router';

import Wrapper from 'common/base/Wrapper';
import FanPageBlock from 'common/FanPageBlock';
import RouteWithSubRoutes from '../route';
import timeAndSalaryStyles from '../TimeAndSalary/styles.module.css';
import CallToShareData from '../TimeAndSalary/CallToShareData';
import Banner from './Banner';
import MobileInfoButtons from '../TimeAndSalary/MobileInfoButtons';
import InfoTimeModal from '../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../TimeAndSalary/common/InfoSalaryModal';
import styles from './CampaignTimeAndSalary.module.css';

import { queryCampaignInfoList } from '../../actions/campaignInfo';

const campaignListFromEntries = campaignEntries =>
  campaignEntries
    .valueSeq()
    .map(info => ({
      name: info.get('name'),
      title: info.get('title'),
    }))
    .toJS();

export default class TimeAndSalary extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(queryCampaignInfoList());
  }

  static propTypes = {
    campaignName: PropTypes.string.isRequired,
    campaignEntries: ImmutablePropTypes.map.isRequired,
    queryCampaignInfoListIfNeeded: PropTypes.func.isRequired,
    routes: PropTypes.array,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };

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
  };

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

  render() {
    const { routes } = this.props;
    const { campaignEntries } = this.props;
    const campaigns = campaignListFromEntries(campaignEntries);

    return (
      <div className={timeAndSalaryStyles.container}>
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
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Wrapper>
        <FanPageBlock className={styles.fanPageBlock} />
      </div>
    );
  }
}
