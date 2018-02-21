import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import { queryExperienceCount } from '../../../actions/experiences';

class ProgressBarWithExperienceCount extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(queryExperienceCount());
  }

  componentDidMount() {
    if (this.props.hasFetched === false) {
      this.props.queryExperienceCount();
    }
  }

  render() {
    return (<ProgressBar totalData={this.props.experienceCount} {...this.props} />);
  }
}

ProgressBarWithExperienceCount.propTypes = {
  experienceCount: PropTypes.number,
  // 是否已經 fetch 過 experienceCount
  hasFetched: PropTypes.bool,
  queryExperienceCount: PropTypes.func.isRequired,
};

ProgressBarWithExperienceCount.defaultProps = {
  hasFetched: false,
};

export default ProgressBarWithExperienceCount;
