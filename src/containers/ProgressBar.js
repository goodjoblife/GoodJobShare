import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isFetched } from '../constants/status';

import { ProgressBarWithDataCount } from '../components/common/ProgressBar';
import { queryExperienceCountIfUnfetched } from '../actions/experiences';
import { experienceCountSelector } from './PermissionBlock/selectors';

const mapStateToProps = state => ({
  dataNum: experienceCountSelector(state),
  hasFetched: isFetched(state.experiences.get('countStatus')),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { dispatchGetDataCount: queryExperienceCountIfUnfetched },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBarWithDataCount);
