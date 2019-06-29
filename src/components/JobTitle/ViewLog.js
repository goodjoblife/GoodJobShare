import { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

const contentIdsSelector = R.compose(
  R.map(x => x.id),
  R.prop('salaryWorkTimes'),
);

class ViewLog extends Component {
  componentDidMount() {
    const contentIds = contentIdsSelector(this.props);
    const referrer = window.location.href;

    this.props.viewSalaryWorkTimes({ contentIds, referrer });
  }

  componentDidUpdate(prevProps) {
    const prevJobTitle = prevProps.jobTitle;
    const prevPage = prevProps.page;
    const jobTitle = this.props.jobTitle;
    const page = this.props.page;

    if (prevJobTitle !== jobTitle || prevPage !== page) {
      const contentIds = contentIdsSelector(this.props);
      const referrer = window.location.href;

      this.props.viewSalaryWorkTimes({ contentIds, referrer });
    }
  }

  render() {
    return null;
  }
}

ViewLog.propTypes = {
  // key
  jobTitle: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,

  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,

  // method
  viewSalaryWorkTimes: PropTypes.func.isRequired,
};

export default ViewLog;
