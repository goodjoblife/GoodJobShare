import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import { goalNum } from '../../../constants/dataProgress';

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
    return (
      <ProgressBar
        dataNum={this.props.dataNum}
        goalNum={goalNum}
        {...this.props}
      />
    );
  }
}

ProgressBarWithDataCount.propTypes = {
  dataNum: PropTypes.number,
  hasFetched: PropTypes.bool,
  dispatchGetDataCount: PropTypes.func.isRequired,
};

ProgressBarWithDataCount.defaultProps = {
  dataNum: 0,
  hasFetched: false,
};

export default ProgressBarWithDataCount;
