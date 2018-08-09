import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from '../../components/CampaignTimeAndSalary/NotFound';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryCampaignInfoList: queryCampaignInfoListIfNeeded,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
