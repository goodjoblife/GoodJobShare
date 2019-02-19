import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withFB } from 'common/facebook';
import ReportForm from '../../components/ExperienceDetail/ReportForm/ReportForm';
import { loginWithFB } from '../../actions/auth';
import { createReport } from '../../actions/reports';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login: loginWithFB, createReport }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFB(ReportForm));
