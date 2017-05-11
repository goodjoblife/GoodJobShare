import { Component, PropTypes } from 'react';
import Facebook from '../../utils/facebook';

// 一個 utils/facebook 的 instance，FacebookProvider 共用同一個
let facebookInstance;

export default class FacebookProvider extends Component {
  componentDidMount() {
    if (!this.facebook) {
      if (!facebookInstance) {
        facebookInstance = new Facebook(this.props.appId);
      }

      this.facebook = facebookInstance;
    }

    this.facebook.init()
      .then(FB => {
        if (this.props.onReady) {
          this.props.onReady(FB);
        }
      });
  }

  render() {
    return this.props.children || null;
  }
}

FacebookProvider.propTypes = {
  appId: PropTypes.string.isRequired,
  onReady: PropTypes.func,
  children: PropTypes.node,
};
