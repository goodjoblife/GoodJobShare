import React, { Component, PropTypes } from 'react';
import withFB from './withFB';

class FacebookWrapper extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.handleContainer = this.handleContainer.bind(this);
  }

  // 讓 FB 重新 parse children
  componentDidUpdate() {
    // if FB instance
    if (this.props.FB && this.container) {
      this.props.FB.XFBML.parse(this.container);
    }
  }

  handleContainer(container) {
    this.container = container;
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={this.handleContainer}>
        {children}
      </div>
    );
  }
}

FacebookWrapper.propTypes = {
  children: PropTypes.node,
  FB: React.PropTypes.object,
};

export default withFB(FacebookWrapper);
