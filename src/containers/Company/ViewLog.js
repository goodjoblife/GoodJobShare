import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewLog from '../../components/Company/ViewLog';
import { viewSalaryWorkTimes } from '../../actions/viewLog';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewSalaryWorkTimes }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLog);
