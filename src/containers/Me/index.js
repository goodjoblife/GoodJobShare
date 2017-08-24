import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withFB from 'common/withFB';
import Me from '../../components/Me';
import { login, getLoginStatus, getMe } from '../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, getLoginStatus, getMe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withFB(Me));
