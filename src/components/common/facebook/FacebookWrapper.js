import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withFB from './withFB';

class FacebookWrapper extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.handleContainer = this.handleContainer.bind(this);
  }

  componentDidMount() {
    if (this.props.FB && this.container) {
      this.props.FB.XFBML.parse(this.container);
    }
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

    return <div ref={this.handleContainer}>{children}</div>;
  }
}

FacebookWrapper.propTypes = {
  children: PropTypes.node,
  FB: PropTypes.object,
};

export default withFB(FacebookWrapper);
