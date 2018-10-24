import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryJobTitle from '../../components/TimeAndSalary/TimeAndSalaryJobTitle';
import { queryJobTitle, switchPath } from '../../actions/timeAndSalaryJobTitle';

const mapStateToProps = state => ({
  data: state.timeAndSalaryJobTitle.get('data'),
  status: state.timeAndSalaryJobTitle.get('status'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryJobTitle, switchPath }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndSalaryJobTitle);
