import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Layout/Header';
import * as HeaderButtonActions from '../../actions/headerButton';

const mapStateToProps = state => ({
  isNavOpen: state.headerButton.get('isOpen'),
});

const mapDispatchToProps = dispatch => bindActionCreators(HeaderButtonActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
