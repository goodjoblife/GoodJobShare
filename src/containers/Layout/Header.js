import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Layout/Header';
import * as HeaderActions from '../../actions/header';

const mapStateToProps = state => ({
  isNavOpen: state.header.get('isNavOpen'),
});

const mapDispatchToProps = dispatch => bindActionCreators(HeaderActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
