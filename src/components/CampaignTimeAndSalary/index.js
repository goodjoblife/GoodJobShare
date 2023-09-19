import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import R from 'ramda';
import Wrapper from 'common/base/Wrapper';
import FanPageBlock from 'common/FanPageBlock';
import useModal from 'hooks/useModal';
import RouteWithSubRoutes from '../route';
import timeAndSalaryStyles from '../TimeAndSalary/styles.module.css';
import CallToShareData from '../TimeAndSalary/CallToShareData';
import Banner from './Banner';
import MobileInfoButtons from '../TimeAndSalary/MobileInfoButtons';
import InfoTimeModal from '../TimeAndSalary/common/InfoTimeModal';
import InfoSalaryModal from '../TimeAndSalary/common/InfoSalaryModal';
import styles from './CampaignTimeAndSalary.module.css';
import {
  queryCampaignInfoList,
  queryCampaignInfoListIfNeeded,
} from 'actions/campaignInfo';
import useCampaignInfoBox from './hooks/useCampaignInfoBox';
import { useDispatch } from 'react-redux';

const campaignsSelector = R.compose(
  R.map(({ name, title }) => ({ name, title })),
  R.values(),
  R.propOr({}, 'data'),
);

const CampaignTimeAndSalary = ({ routes }) => {
  const dispatch = useDispatch();

  const campaignInfoBox = useCampaignInfoBox();
  const campaigns = campaignsSelector(campaignInfoBox);

  useEffect(() => {
    dispatch(queryCampaignInfoListIfNeeded());
  }, [dispatch]);

  const {
    isOpen: infoSalaryModalIsOpen,
    close: closeInfoSalaryModal,
    toggle: toggleInfoSalaryModal,
  } = useModal();

  const {
    isOpen: infoTimeModalIsOpen,
    close: closeInfoTimeModal,
    toggle: toggleInfoTimeModal,
  } = useModal();

  return (
    <div className={timeAndSalaryStyles.container}>
      <Banner campaigns={campaigns} />
      <Wrapper size="m" className={timeAndSalaryStyles.showSearchbarWrapper}>
        <CallToShareData />
        <MobileInfoButtons
          toggleInfoSalaryModal={toggleInfoSalaryModal}
          toggleInfoTimeModal={toggleInfoTimeModal}
        />
      </Wrapper>
      <InfoSalaryModal
        isOpen={infoSalaryModalIsOpen}
        close={closeInfoSalaryModal}
      />
      <InfoTimeModal isOpen={infoTimeModalIsOpen} close={closeInfoTimeModal} />
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
};

CampaignTimeAndSalary.propTypes = {
  routes: PropTypes.array,
};

CampaignTimeAndSalary.fetchData = ({ store: { dispatch } }) => {
  return dispatch(queryCampaignInfoList());
};

export default CampaignTimeAndSalary;
