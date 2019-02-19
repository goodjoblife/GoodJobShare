import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalarySearch from '../../components/TimeAndSalary/TimeAndSalarySearch';
import { queryKeyword } from '../../actions/timeAndSalarySearch';

const mapStateToProps = state => ({
  data: state.timeAndSalarySearch.get('data'),
  status: state.timeAndSalarySearch.get('status'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryKeyword }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalarySearch);
