import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { viewSalaryWorkTimes } from '../../../actions/viewLog';

class ViewLog extends Component {
  componentDidMount() {
    const { contentIds } = this.props;
    const referrer = window.location.href;

    this.props.viewSalaryWorkTimes({ contentIds, referrer });
  }

  componentDidUpdate(prevProps) {
    const prevPageName = prevProps.pageName;
    const prevPage = prevProps.page;
    const pageName = this.props.pageName;
    const page = this.props.page;

    if (prevPageName !== pageName || prevPage !== page) {
      const { contentIds } = this.props;
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
  pageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,

  contentIds: PropTypes.arrayOf(PropTypes.string).isRequired,

  // method
  viewSalaryWorkTimes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewSalaryWorkTimes }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLog);
