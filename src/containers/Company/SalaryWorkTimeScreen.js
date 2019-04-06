import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SalaryWorkTimeScreen from '../../components/Company/SalaryWorkTimeScreen';
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
)(SalaryWorkTimeScreen);
