import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { ScrollContext } from 'react-router-scroll-4';
import App from '../components/Layout';

const logPageView = location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  componentDidMount() {
    const {
      location,
    } = this.props;

    logPageView(location);
  }

  componentDidUpdate(prevProps) {
    const {
      location,
    } = this.props;

    const {
      location: prevLocation,
    } = prevProps;

    if (location !== prevLocation) {
      logPageView(location);
    }
  }

  init = () => {
    // initialize google analytics
    ReactGA.initialize(process.env.GA_ID);

    // initialize facebook pixel
    ReactPixel.init(process.env.PIXEL_ID);
    ReactPixel.pageView();
  }

  render() {
    return (
      <ScrollContext>
        <App />
      </ScrollContext>
    );
  }
}

Root.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};


export default withRouter(Root);
