import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch } from 'react-router';
import { compose, setStatic } from 'recompose';

import Wrapper from 'common/base/Wrapper';
import FanPageBlock from 'common/FanPageBlock';
import RouteWithSubRoutes from '../route';
import timeAndSalaryStyles from '../TimeAndSalary/styles.module.css';
import CallToShareData from '../TimeAndSalary/CallToShareData';
import Banner from './Banner';
import MobileInfoButtons from '../TimeAndSalary/MobileInfoButtons';
import InfoTimeModal from '../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../TimeAndSalary/common/InfoSalaryModal';
import withModal from '../TimeAndSalary/common/withModal';
import styles from './CampaignTimeAndSalary.module.css';

import { queryCampaignInfoList } from 'actions/campaignInfo';

const campaignListFromEntries = campaignEntries =>
  campaignEntries
    .valueSeq()
    .map(info => ({
      name: info.get('name'),
      title: info.get('title'),
    }))
    .toJS();

class TimeAndSalary extends Component {
  static propTypes = {
    campaignName: PropTypes.string.isRequired,
    campaignEntries: ImmutablePropTypes.map.isRequired,
    queryCampaignInfoListIfNeeded: PropTypes.func.isRequired,
    routes: PropTypes.array,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    infoSalaryModal: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      setIsOpen: PropTypes.func.isRequired,
    }).isRequired,
    infoTimeModal: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      setIsOpen: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.queryCampaignInfoListIfNeeded();
  }

  toggleInfoSalaryModal = () => {
    const { infoSalaryModal } = this.props;
    infoSalaryModal.setIsOpen(!infoSalaryModal.isOpen);
  };

  toggleInfoTimeModal = () => {
    const { infoTimeModal } = this.props;
    infoTimeModal.setIsOpen(!infoTimeModal.isOpen);
  };

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
          isOpen={this.props.infoSalaryModal.isOpen}
          close={this.toggleInfoSalaryModal}
        />
        <InfoTimeModal
          isOpen={this.props.infoTimeModal.isOpen}
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

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return dispatch(queryCampaignInfoList());
});

const hoc = compose(
  ssr,
  withModal('infoSalaryModal'),
  withModal('infoTimeModal'),
);

export default hoc(TimeAndSalary);
