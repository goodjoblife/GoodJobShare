import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';
import { queryCampaignTimeAndSalary, switchPath } from '../../actions/campaignTimeAndSalaryBoard';
import { fetchMyPermission } from '../../actions/me';
import {
  canViewTimeAndSalarySelector,
} from '../../selectors/meSelector';


const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
  campaignEntriesStatus: state.campaignInfo.get('entriesStatus'),
  campaignEntriesError: state.campaignInfo.get('entriesError'),
  data: state.campaignTimeAndSalaryBoard.get('data'),
  totalCount: state.campaignTimeAndSalaryBoard.get('total'),
  status: state.campaignTimeAndSalaryBoard.get('status'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryCampaignInfoListIfNeeded,
    queryCampaignTimeAndSalary,
    switchPath,
    fetchMyPermission,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTimeAndSalaryBoard);
