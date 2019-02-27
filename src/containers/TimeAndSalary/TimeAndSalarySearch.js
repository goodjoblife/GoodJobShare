import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalarySearch from '../../components/TimeAndSalary/TimeAndSalarySearch';
import { queryKeyword } from '../../actions/timeAndSalarySearch';

const mapStateToProps = state => ({
  data: state.timeAndSalarySearch.get('data'),
  status: state.timeAndSalarySearch.get('status'),
  searchBy: state.timeAndSalarySearch.get('searchBy'),
  page: state.timeAndSalarySearch.get('page'),
  pageSize: state.timeAndSalarySearch.get('pageSize'),
  totalNum: state.timeAndSalarySearch.get('totalNum'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryKeyword }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalarySearch);
