import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LaborRightsPermissionBlock from '../../components/common/PermissionBlock/LaborRightsPermissionBlock';
import { queryExperienceCount, queryTimeAndSalaryCount, queryLaborRightsCount } from '../../actions/dataCount';

const mapStateToProps = state => ({
  experienceCount: state.dataCount.get('experienceCount'),
  timeAndSalaryCount: state.dataCount.get('timeAndSalaryCount'),
  laborRightsCount: state.dataCount.get('laborRightsCount'),
  hasFetchedExperienceCount: state.dataCount.get('hasFetchedExperienceCount'),
  hasFetchedTimeAndSalaryCount: state.dataCount.get('hasFetchedTimeAndSalaryCount'),
  hasFetchedLaborRightsCount: state.dataCount.get('hasFetchedLaborRightsCount'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryExperienceCount,
    queryTimeAndSalaryCount,
    queryLaborRightsCount,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LaborRightsPermissionBlock);
