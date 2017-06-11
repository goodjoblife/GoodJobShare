import React, { Component } from 'react';
import Facebook from '../../utils/facebook';
import { FACEBOOK_APP_ID } from '../../config';

// 一個 utils/facebook 的 instance，withFB 共用同一個
let facebookInstance;

// withFB 是一個 HOC，只是要與 Container 小心配合，在 SSR 的時候，static fetchData 可能沒辦法運作

export default WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        FB: null,
      };
    }

    componentDidMount() {
      if (!facebookInstance) {
        facebookInstance = new Facebook(FACEBOOK_APP_ID);
      }

      facebookInstance.init()
        .then(FB => this.setState({ FB }));
    }

    render() {
      return <WrappedComponent FB={this.state.FB} {...this.props} />;
    }
  };
