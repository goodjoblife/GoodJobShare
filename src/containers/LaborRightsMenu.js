import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LaborRightsMenu from '../components/LaborRightsMenu';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaborRightsMenu);
