import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

class ProgressBarWithDataCount extends Component {
  static fetchData() {
    return this.props.dispatchGetDataCount;
  }

  componentDidMount() {
    if (this.props.hasFetched === false) {
      this.props.dispatchGetDataCount();
    }
  }

  render() {
    return (<ProgressBar totalData={this.props.dataCount} {...this.props} />);
  }
}

ProgressBarWithDataCount.propTypes = {
  dataCount: PropTypes.number,
  hasFetched: PropTypes.bool,
  dispatchGetDataCount: PropTypes.func.isRequired,
};

ProgressBarWithDataCount.defaultProps = {
  hasFetched: false,
};

export default ProgressBarWithDataCount;
