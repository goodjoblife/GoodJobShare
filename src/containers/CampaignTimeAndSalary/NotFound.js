import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from '../../components/CampaignTimeAndSalary/NotFound';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';

const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
  campaignEntriesStatus: state.campaignInfo.get('entriesStatus'),
  campaignEntriesError: state.campaignInfo.get('entriesError'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryCampaignInfoList: queryCampaignInfoListIfNeeded,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
