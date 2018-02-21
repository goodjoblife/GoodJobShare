import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';

import { ProgressBarWithExperienceCount } from '../components/common/ProgressBar';
import { queryExperienceCount } from '../actions/experiences';
import fetchingStatus from '../constants/status';

const experienceCountSelector = state => state.experiences.get('count');
const countStatusSelector = state => state.experiences.get('countStatus');
const hasFetchedSelector = R.compose(R.equals(fetchingStatus.FETCHED), countStatusSelector);

const mapStateToProps = state => ({
  experienceCount: experienceCountSelector(state),
  hasFetched: hasFetchedSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryExperienceCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarWithExperienceCount);
