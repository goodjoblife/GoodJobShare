import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LaborRightsPermissionBlock from '../../components/common/PermissionBlock/LaborRightsPermissionBlock';
import { queryTimeAndSalaryCount } from '../../actions/dataCount';
import { queryExperienceCount } from '../../actions/experiences';
import { queryMenu } from '../../actions/laborRights';
import {
  experienceCountSelector,
  hasFetchedexperienceCountSelector,
  laborRightsCountSelector,
  hasFetchedLaborRightsCountSelector,
} from './selectors';

const mapStateToProps = state => ({
  experienceCount: experienceCountSelector(state),
  timeAndSalaryCount: state.dataCount.get('timeAndSalaryCount'),
  laborRightsCount: laborRightsCountSelector(state),
  hasFetchedExperienceCount: hasFetchedexperienceCountSelector(state),
  hasFetchedTimeAndSalaryCount: state.dataCount.get('hasFetchedTimeAndSalaryCount'),
  hasFetchedLaborRightsCount: hasFetchedLaborRightsCountSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryExperienceCount,
    queryTimeAndSalaryCount,
    queryLaborRightsCount: queryMenu,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LaborRightsPermissionBlock);
