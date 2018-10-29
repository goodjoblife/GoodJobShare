import React from 'react';
import Helmet from 'react-helmet';
import { Switch } from 'react-router-dom';

import RouteWithSubRoutes from '../route';
import styles from './App.module.css';
import Header from '../../containers/App/Header';
import Footer from './Footer';
import { HELMET_DATA } from '../../constants/helmetData';

import routes from '../../routes';

const App = () => (
  <div className={styles.App}>
    <Header />
    <Helmet {...HELMET_DATA.DEFAULT} />
    <div className={styles.content}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
