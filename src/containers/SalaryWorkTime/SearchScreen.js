import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchScreen from '../../components/TimeAndSalary/SearchScreen';
import { queryKeyword } from '../../actions/timeAndSalarySearch';

const mapStateToProps = state => ({
  data: state.timeAndSalarySearch.get('data'),
  status: state.timeAndSalarySearch.get('status'),
  searchBy: state.timeAndSalarySearch.get('searchBy'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryKeyword }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
