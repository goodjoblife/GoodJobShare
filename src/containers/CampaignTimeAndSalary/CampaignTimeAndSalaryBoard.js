import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';
import {
  queryCampaignTimeAndSalary,
  switchPath,
} from '../../actions/campaignTimeAndSalaryBoard';
import { fetchMyPermission } from '../../actions/me';
import { canViewTimeAndSalarySelector } from '../../selectors/meSelector';
import {
  campaignNameSelector,
  campaignEntriesSelector,
  campaignEntriesStatusSelector,
  campaignEntriesErrorSelector,
} from '../../selectors/campaignSelector';

const mapStateToProps = (state, { match }) => ({
  campaignName: campaignNameSelector(match),
  campaignEntries: campaignEntriesSelector(state),
  campaignEntriesStatus: campaignEntriesStatusSelector(state),
  campaignEntriesError: campaignEntriesErrorSelector(state),
  data: state.campaignTimeAndSalaryBoard.get('data'),
  totalCount: state.campaignTimeAndSalaryBoard.get('total'),
  currentPage: state.campaignTimeAndSalaryBoard.get('currentPage'),
  status: state.campaignTimeAndSalaryBoard.get('status'),
  canViewTimeAndSalary: canViewTimeAndSalarySelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryCampaignInfoListIfNeeded,
      queryCampaignTimeAndSalary,
      switchPath,
      fetchMyPermission,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignTimeAndSalaryBoard);
