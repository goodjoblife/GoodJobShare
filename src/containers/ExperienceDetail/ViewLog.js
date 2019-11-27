import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewLog from '../../components/ExperienceDetail/ViewLog';
import { viewExperiences } from '../../actions/viewLog';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewExperiences }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLog);
