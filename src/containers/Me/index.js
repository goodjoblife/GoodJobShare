import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withFB } from 'common/facebook';
import Me from '../../components/Me';
import { loginWithFB } from '../../actions/auth';
import * as MyActions from '../../actions/me';

const mapStateToProps = state => ({
  me: state.me,
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login: loginWithFB, ...MyActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFB(Me));
