import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryCompany from '../../components/TimeAndSalary/TimeAndSalaryCompany';
import { queryCompany, setPage } from '../../actions/timeAndSalaryCompany';

const mapStateToProps = state => ({
  data: state.timeAndSalaryCompany.get('data'),
  status: state.timeAndSalaryCompany.get('status'),
  page: state.timeAndSalaryCompany.get('page'),
  pageSize: state.timeAndSalaryCompany.get('pageSize'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryCompany, setPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalaryCompany);
