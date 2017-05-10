import React, { Component, PropTypes } from 'react';
import FacebookProvider from './FacebookProvider';

export default class FacebookWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleContainer = this.handleContainer.bind(this);
    this.handleFacebookReady = this.handleFacebookReady.bind(this);
  }

  // 讓 FB 重新 parse children
  componentDidUpdate() {
    if (this.FB) {
      this.FB.XFBML.parse(this.container);
    }
  }

  handleContainer(container) {
    this.container = container;
  }

  handleFacebookReady(FB) {
    this.FB = FB;
    this.FB.XFBML.parse(this.container);
  }

  render() {
    const { appId, children } = this.props;

    return (
      <FacebookProvider appId={appId} onReady={this.handleFacebookReady}>
        <div ref={this.handleContainer}>
          {children}
        </div>
      </FacebookProvider>
    );
  }
}

FacebookWrapper.propTypes = {
  appId: PropTypes.string.isRequired,
  children: PropTypes.node,
};
