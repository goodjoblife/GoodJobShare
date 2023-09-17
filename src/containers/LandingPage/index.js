import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
