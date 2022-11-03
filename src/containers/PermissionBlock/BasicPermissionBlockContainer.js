import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BasicPermissionBlock from '../../components/common/PermissionBlock/BasicPermissionBlock';
import { queryTimeAndSalaryCountIfUnfetched } from '../../actions/timeAndSalary';
import { queryExperienceCountIfUnfetched } from '../../actions/experiences';
import {
  experienceCountSelector,
  hasFetchedexperienceCountSelector,
  timeAndSalaryCountSelector,
  hasFetchedTimeAndSalaryCountSelector,
} from './selectors';

const mapStateToProps = state => ({
  experienceCount: experienceCountSelector(state),
  timeAndSalaryCount: timeAndSalaryCountSelector(state),
  hasFetchedExperienceCount: hasFetchedexperienceCountSelector(state),
  hasFetchedTimeAndSalaryCount: hasFetchedTimeAndSalaryCountSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryExperienceCount: queryExperienceCountIfUnfetched,
      queryTimeAndSalaryCount: queryTimeAndSalaryCountIfUnfetched,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicPermissionBlock);
