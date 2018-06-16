import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalaryBoard from '../../components/TimeAndSalary/TimeAndSalaryBoard';
import { queryTimeAndSalary, switchPath, resetBoardExtremeData, queryExtremeTimeAndSalary } from '../../actions/timeAndSalaryBoard';
import { fetchMyPermission } from '../../actions/me';
import {
  canViewTimeAndSalarySelector,
} from '../../selectors/meSelector';


const mapStateToProps = state => ({
  data: state.timeAndSalaryBoard.get('data'),
  totalCount: state.timeAndSalaryBoard.get('total'),
  currentPage: state.timeAndSalaryBoard.get('currentPage'),
  status: state.timeAndSalaryBoard.get('status'),
  extremeStatus: state.timeAndSalaryBoard.get('extremeStatus'),
  extremeData: state.timeAndSalaryBoard.get('extremeData'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryTimeAndSalary,
    switchPath,
    resetBoardExtremeData,
    queryExtremeTimeAndSalary,
    fetchMyPermission,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimeAndSalaryBoard);
