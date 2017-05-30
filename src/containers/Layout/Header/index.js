import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../../components/Layout/Header';
import { setLogin } from '../../../actions/auth';


const mapStateToProps = state => ({
  auth: state.auth,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLogin }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Header);
