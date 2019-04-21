import React from 'react';
import { Switch } from 'react-router-dom';

import { AppRouteWithSubRoutes } from '../route';
import styles from './App.module.css';
import Header from '../../containers/App/Header';
import Footer from './Footer';
import SyncAuth from '../../containers/App/SyncAuth';
import StaticHelmet from 'common/StaticHelmet';

import routes from '../../routes';

const App = () => (
  <Switch>
    {routes.map((route, i) => (
      <AppRouteWithSubRoutes key={i} {...route}>
        {({ hasHeader, hasFooter, children }) => (
          <div className={styles.App}>
            {hasHeader ? <Header /> : null}
            <SyncAuth />
            <StaticHelmet.Default />
            <div className={styles.content}>{children}</div>
            {hasFooter ? <Footer /> : null}
          </div>
        )}
      </AppRouteWithSubRoutes>
    ))}
  </Switch>
);

export default App;
