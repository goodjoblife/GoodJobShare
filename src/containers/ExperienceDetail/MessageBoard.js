import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withFB } from 'common/facebook';
import MessageBoard from '../../components/ExperienceDetail/MessageBoard';
import { loginWithFB } from '../../actions/auth';

import { statusSelector } from '../../selectors/authSelector';

const mapStateToProps = state => ({
  authStatus: statusSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login: loginWithFB }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withFB(MessageBoard));
