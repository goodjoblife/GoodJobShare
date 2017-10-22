import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryBoard from '../../components/TimeAndSalary/TimeAndSalaryBoard';
import { queryTimeAndSalary, switchPath } from '../../actions/timeAndSalaryBoard';

const mapStateToProps = state => ({
  data: state.timeAndSalaryBoard.get('data'),
  status: state.timeAndSalaryBoard.get('status'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryTimeAndSalary, switchPath }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimeAndSalaryBoard);
