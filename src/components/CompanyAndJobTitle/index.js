import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { useWindowSize } from 'react-use';
import Wrapper from 'common/base/Wrapper';
import GoogleAdUnit, { Manager as GoogleAdManager } from 'common/GoogleAdUnit';
import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';
import breakpoints from '../../constants/breakpoints';

const CompanyAndJobTitlePageContainer = ({ routes, location }) => {
  const { width } = useWindowSize();
  useEffect(() => {
    GoogleAdManager.reload();
  }, [location.pathname, location.search]);
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
            <GoogleAdUnit
              sizes={[[160, 600]]}
              adUnit="goodjob_pc_list_sidebar"
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
