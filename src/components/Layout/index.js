import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';

import RouteWithSubRoutes from '../route';
import styles from './App.module.css';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import { HELMET_DATA } from '../../constants/helmetData';

import routes from '../../routes';

const logPageView = location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
};

class App extends React.Component {
  componentDidMount() {
    const {
      location,
    } = this.props;
    logPageView(location);
  }

  componentDidUpdate() {
    const {
      location,
    } = this.props;

    logPageView(location);
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <Helmet {...HELMET_DATA.DEFAULT} />
        <div className={styles.content}>
          <Switch>
            {routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />))}
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};

export default withRouter(App);
