import React, { Component } from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { ScrollContext } from 'react-router-scroll-4';
import App from '../components/Layout';


class Root extends Component {
  constructor(props) {
    super(props);
    this.init();
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

export default Root;
