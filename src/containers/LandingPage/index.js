import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import * as ExperienceSearchActions from '../../actions/experienceSearch';

const mapStateToProps = state => ({
  experienceSearch: state.experienceSearch,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
