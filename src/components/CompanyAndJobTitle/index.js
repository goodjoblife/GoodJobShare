import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';

const CompanyAndJobTitlePageContainer = ({ routes }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};

CompanyAndJobTitlePageContainer.propTypes = {
  routes: PropTypes.array,
};

export default CompanyAndJobTitlePageContainer;
