import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BasicPermissionBlock from '../../components/common/PermissionBlock/BasicPermissionBlock';
import { queryTimeAndSalaryCount, queryLaborRightsCount } from '../../actions/dataCount';
import { queryExperienceCount } from '../../actions/experiences';
import {
  experienceCountSelector,
  hasFetchedexperienceCountSelector,
} from './selectors';

const mapStateToProps = state => ({
  experienceCount: experienceCountSelector(state),
  timeAndSalaryCount: state.dataCount.get('timeAndSalaryCount'),
  laborRightsCount: state.dataCount.get('laborRightsCount'),
  hasFetchedExperienceCount: hasFetchedexperienceCountSelector(state),
  hasFetchedTimeAndSalaryCount: state.dataCount.get('hasFetchedTimeAndSalaryCount'),
  hasFetchedLaborRightsCount: state.dataCount.get('hasFetchedLaborRightsCount'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryExperienceCount,
    queryTimeAndSalaryCount,
    queryLaborRightsCount,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BasicPermissionBlock);
