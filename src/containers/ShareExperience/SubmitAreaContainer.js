import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withFB from 'common/withFB';
import SubmitArea from '../../components/ShareExperience/common/SubmitArea';
import { login } from '../../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFB(SubmitArea));
