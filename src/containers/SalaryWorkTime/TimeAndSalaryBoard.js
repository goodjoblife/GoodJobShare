import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryBoard from '../../components/TimeAndSalary/TimeAndSalaryBoard';
import {
  queryTimeAndSalary,
  resetBoardExtremeData,
  queryExtremeTimeAndSalary,
} from 'actions/timeAndSalaryBoard';

const mapStateToProps = state => ({
  data: state.timeAndSalaryBoard.data,
  totalCount: state.timeAndSalaryBoard.total,
  currentPage: state.timeAndSalaryBoard.currentPage,
  status: state.timeAndSalaryBoard.status,
  extremeStatus: state.timeAndSalaryBoard.extremeStatus,
  extremeData: state.timeAndSalaryBoard.extremeData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryTimeAndSalary,
      resetBoardExtremeData,
      queryExtremeTimeAndSalary,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeAndSalaryBoard);
