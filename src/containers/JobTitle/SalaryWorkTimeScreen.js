import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SalaryWorkTimeScreen from '../../components/JobTitle/SalaryWorkTimeScreen';
import { queryJobTitle } from '../../actions/timeAndSalaryJobTitle';

const mapStateToProps = state => ({
  data: state.timeAndSalaryJobTitle.get('data'),
  status: state.timeAndSalaryJobTitle.get('status'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryJobTitle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalaryWorkTimeScreen);
