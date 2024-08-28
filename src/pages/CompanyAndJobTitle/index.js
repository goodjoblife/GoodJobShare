import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import Wrapper from 'common/base/Wrapper';
import RouteWithSubRoutes from 'components/route';
import styles from './styles.module.css';

const CompanyAndJobTitlePageContainer = ({ routes }) => {
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
      </Wrapper>
    </div>
  );
};

CompanyAndJobTitlePageContainer.propTypes = {
  routes: PropTypes.array,
};

export default CompanyAndJobTitlePageContainer;
