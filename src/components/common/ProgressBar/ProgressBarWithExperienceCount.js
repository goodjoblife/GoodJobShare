import React, { Component, PropTypes } from 'react';

import ProgressBar from './ProgressBar';
import { queryExperienceCount } from '../../../actions/progressBar';

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
  hasFetched: PropTypes.bool,
  queryExperienceCount: PropTypes.func.isRequired,
};

ProgressBarWithExperienceCount.defaultProps = {
  hasFetched: false,
};

export default ProgressBarWithExperienceCount;
