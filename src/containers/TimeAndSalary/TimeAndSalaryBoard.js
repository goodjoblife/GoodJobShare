import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryBoard from '../../components/TimeAndSalary/TimeAndSalaryBoard';
import {
  queryTimeAndSalary,
  resetBoardExtremeData,
  queryExtremeTimeAndSalary,
} from '../../actions/timeAndSalaryBoard';

const mapStateToProps = state => ({
  data: state.timeAndSalaryBoard.get('data'),
  totalCount: state.timeAndSalaryBoard.get('total'),
  currentPage: state.timeAndSalaryBoard.get('currentPage'),
  status: state.timeAndSalaryBoard.get('status'),
  extremeStatus: state.timeAndSalaryBoard.get('extremeStatus'),
  extremeData: state.timeAndSalaryBoard.get('extremeData'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryTimeAndSalary,
      resetBoardExtremeData,
      queryExtremeTimeAndSalary,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndSalaryBoard);
