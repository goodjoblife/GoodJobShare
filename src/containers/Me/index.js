import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Me from '../../components/Me';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me);
