import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withFB } from 'common/facebook';
import SubmitArea from '../../components/ShareExperience/common/SubmitArea';
import { loginWithFB } from '../../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login: loginWithFB }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFB(SubmitArea));
