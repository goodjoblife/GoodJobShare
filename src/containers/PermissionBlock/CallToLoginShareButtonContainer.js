import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withFB } from 'common/facebook';
import { withGoogle } from 'common/google';
import CallToLoginShareButton from 'common/PermissionBlock/CallToLoginShareButton';
import { loginWithFB } from '../../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginWithFB }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withGoogle(withFB(CallToLoginShareButton)));
