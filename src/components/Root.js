import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { compose, lifecycle } from 'recompose';
import App from '../components/App';
import { GA_ID, PIXEL_ID } from '../config';

const logPageView = location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
};

const Record = compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      // initialize google analytics
      ReactGA.initialize(GA_ID);

      // initialize facebook pixel
      ReactPixel.init(PIXEL_ID);
      ReactPixel.pageView();

      const { location } = this.props;

      logPageView(location);
    },
    componentDidUpdate(prevProps) {
      const { location } = this.props;
      const { location: prevLocation } = prevProps;

      if (location !== prevLocation) {
        logPageView(location);
      }
    },
  })
)(() => null);

const Root = () => (
  <Fragment>
    <App />
    <Record />
  </Fragment>
);

export default Root;
