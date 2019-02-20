import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryCompany from '../../components/TimeAndSalary/TimeAndSalaryCompany';
import { queryCompany } from '../../actions/timeAndSalaryCompany';

const mapStateToProps = state => ({
  data: state.timeAndSalaryCompany.get('data'),
  status: state.timeAndSalaryCompany.get('status'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryCompany }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalaryCompany);
