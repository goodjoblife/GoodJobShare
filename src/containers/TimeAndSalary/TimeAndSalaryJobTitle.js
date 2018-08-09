import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryJobTitle from '../../components/TimeAndSalary/TimeAndSalaryJobTitle';
import { queryJobTitle, switchPath } from '../../actions/timeAndSalaryJobTitle';
import { fetchMyPermission } from '../../actions/me';
import { canViewTimeAndSalarySelector } from '../../selectors/meSelector';

const mapStateToProps = state => ({
  data: state.timeAndSalaryJobTitle.get('data'),
  status: state.timeAndSalaryJobTitle.get('status'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { queryJobTitle, switchPath, fetchMyPermission },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndSalaryJobTitle);
