import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withFB from 'common/withFB';
import Header from '../../../components/Layout/Header';
import { login, logout, getLoginStatus, getMe } from '../../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, logout, getLoginStatus, getMe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withFB(Header));
