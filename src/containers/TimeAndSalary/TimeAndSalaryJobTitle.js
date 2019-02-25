import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryJobTitle from '../../components/TimeAndSalary/TimeAndSalaryJobTitle';
import { queryJobTitle, setPage } from '../../actions/timeAndSalaryJobTitle';

const mapStateToProps = state => ({
  data: state.timeAndSalaryJobTitle.get('data'),
  status: state.timeAndSalaryJobTitle.get('status'),
  page: state.timeAndSalaryJobTitle.get('page'),
  pageSize: state.timeAndSalaryJobTitle.get('pageSize'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryJobTitle, setPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalaryJobTitle);
