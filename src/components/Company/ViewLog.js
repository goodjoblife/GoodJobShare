import { Component } from 'react';
import PropTypes from 'prop-types';

class ViewLog extends Component {
  componentDidMount() {
    console.log('DidMount', this.props, window.location.href);
  }

  componentDidUpdate(prevProps) {
    console.log('DidUpdate', this.props, window.location.href);
  }

  render() {
    return null;
  }
}

ViewLog.propTypes = {
  // key
  companyName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,

  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,

  // method
};

export default ViewLog;
