import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceSearch from '../components/ExperienceSearch';
import * as ExperienceSearchActions from '../actions/experienceSearch';

const mapStateToProps = state => ({
  experienceSearch: state.get('experienceSearch'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceSearch);
