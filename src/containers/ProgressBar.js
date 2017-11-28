import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ProgressBarWithExperienceCount } from '../components/common/ProgressBar';
import { queryExperienceCount } from '../actions/progressBar';

const mapStateToProps = state => ({
  experienceCount: state.progressBarState.get('experienceCount'),
  hasFetched: state.progressBarState.get('hasFetched'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryExperienceCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarWithExperienceCount);
