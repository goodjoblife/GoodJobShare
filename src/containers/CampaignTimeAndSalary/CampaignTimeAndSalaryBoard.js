import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';
import { queryCampaignTimeAndSalary, switchPath, resetBoardExtremeData, queryExtremeCampaignTimeAndSalary } from '../../actions/campaignTimeAndSalaryBoard';
import { fetchMyPermission } from '../../actions/me';
import {
  canViewTimeAndSalarySelector,
} from '../../selectors/meSelector';


const mapStateToProps = state => ({
  data: state.campaignTimeAndSalaryBoard.get('data'),
  status: state.campaignTimeAndSalaryBoard.get('status'),
  extremeStatus: state.campaignTimeAndSalaryBoard.get('extremeStatus'),
  extremeData: state.campaignTimeAndSalaryBoard.get('extremeData'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryCampaignTimeAndSalary,
    switchPath,
    resetBoardExtremeData,
    queryExtremeCampaignTimeAndSalary,
    fetchMyPermission,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTimeAndSalaryBoard);
