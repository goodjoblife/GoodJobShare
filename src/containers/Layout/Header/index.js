import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withFB from 'common/withFB';
import Header from '../../../components/Layout/Header';
import { login, getLoginStatus } from '../../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, getLoginStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withFB(Header));
