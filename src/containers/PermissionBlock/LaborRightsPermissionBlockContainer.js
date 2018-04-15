import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LaborRightsPermissionBlock from '../../components/common/PermissionBlock/LaborRightsPermissionBlock';
import { queryTimeAndSalaryCount } from '../../actions/timeAndSalary';
import { queryExperienceCount } from '../../actions/experiences';
import { queryMenu } from '../../actions/laborRights';
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
  bindActionCreators({
    queryExperienceCount,
    queryTimeAndSalaryCount,
    queryLaborRightsCount: queryMenu,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LaborRightsPermissionBlock);
