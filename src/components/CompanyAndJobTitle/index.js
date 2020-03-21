import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { useWindowSize } from 'react-use';
import Wrapper from 'common/base/Wrapper';
import GoogleAdsense from 'common/GoogleAdsense';
import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';
import breakpoints from '../../constants/breakpoints';

const CompanyAndJobTitlePageContainer = ({ routes }) => {
  const { width } = useWindowSize();
  return (
    <div>
      <Wrapper size="l" className={styles.container}>
        <div className={styles.leftContainer}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
        {width > breakpoints.md ? (
          <div className={styles.sideAds}>
            <GoogleAdsense
              style={{ display: 'block' }}
              slot="6339096692"
              format="auto"
              responsive="true"
            />
          </div>
        ) : null}
      </Wrapper>
    </div>
  );
};

CompanyAndJobTitlePageContainer.propTypes = {
  routes: PropTypes.array,
};

export default CompanyAndJobTitlePageContainer;
