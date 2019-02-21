import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSalaryWorkTime } from '../../actions/timeAndSalary';
import TimeSalaryForm from '../../components/ShareExperience/TimeSalaryForm';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createSalaryWorkTime }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeSalaryForm);
