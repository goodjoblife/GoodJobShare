import React from 'react';
import PropTypes from 'prop-types';

import { GOOGLE_AD_CLIENT_ID } from '../../../config';

/**
 * Google Adsense 廣告的 component
 */
export default class GoogleAdsense extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-client={GOOGLE_AD_CLIENT_ID}
        data-ad-slot={this.props.slot}
        data-ad-layout={this.props.layout}
        data-ad-layout-key={this.props.layoutKey}
        data-ad-format={this.props.format}
        data-full-width-responsive={this.props.responsive}
      ></ins>
    );
  }
}

GoogleAdsense.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  layout: PropTypes.string,
  layoutKey: PropTypes.string,
  format: PropTypes.string,
  responsive: PropTypes.string,
};

GoogleAdsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'auto',
  layout: '',
  layoutKey: '',
  responsive: 'false',
};
