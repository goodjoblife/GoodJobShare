import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CallToLoginShareButton from 'common/PermissionBlock/CallToLoginShareButton';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallToLoginShareButton);
