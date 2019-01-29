import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LaborRightsPermissionBlock from '../../components/common/PermissionBlock/LaborRightsPermissionBlock';
import { queryTimeAndSalaryCountIfUnfetched } from '../../actions/timeAndSalary';
import { queryExperienceCountIfUnfetched } from '../../actions/experiences';
import { queryMenuIfUnfetched } from '../../actions/laborRights';
import {
  experienceCountSelector,
  hasFetchedexperienceCountSelector,
  timeAndSalaryCountSelector,
  hasFetchedTimeAndSalaryCountSelector,
  laborRightsCountSelector,
  hasFetchedLaborRightsCountSelector,
} from './selectors';

const mapStateToProps = state => ({
  experienceCount: experienceCountSelector(state),
  timeAndSalaryCount: timeAndSalaryCountSelector(state),
  laborRightsCount: laborRightsCountSelector(state),
  hasFetchedExperienceCount: hasFetchedexperienceCountSelector(state),
  hasFetchedTimeAndSalaryCount: hasFetchedTimeAndSalaryCountSelector(state),
  hasFetchedLaborRightsCount: hasFetchedLaborRightsCountSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryExperienceCount: queryExperienceCountIfUnfetched,
      queryTimeAndSalaryCount: queryTimeAndSalaryCountIfUnfetched,
      queryLaborRightsCount: queryMenuIfUnfetched,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaborRightsPermissionBlock);
