import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryCompany from '../../components/TimeAndSalary/TimeAndSalaryCompany';
import { queryCompany, switchPath } from '../../actions/timeAndSalaryCompany';
import { fetchMyPermission } from '../../actions/me';
import { canViewTimeAndSalarySelector } from '../../selectors/meSelector';

const mapStateToProps = state => ({
  data: state.timeAndSalaryCompany.get('data'),
  status: state.timeAndSalaryCompany.get('status'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryCompany, switchPath, fetchMyPermission }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndSalaryCompany);
